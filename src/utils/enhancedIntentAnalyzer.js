/**
 * Enhanced Intent Analyzer
 * 
 * This utility provides advanced intent analysis capabilities to better understand
 * user queries, especially full sentences and disambiguate overlapping keywords.
 */

import stringSimilarity from 'string-similarity';

/**
 * Analyzes a full sentence to extract intent, context, and key components
 * @param {string} sentence - The complete user sentence
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @returns {Object} - Detailed intent analysis
 */
export const analyzeSentenceIntent = (sentence, conversationHistory = []) => {
  if (!sentence || typeof sentence !== 'string') {
    return {
      intent: 'unknown',
      confidence: 0,
      keywords: [],
      actionable: false,
      modifiers: [],
      isQuestion: false,
      isCommand: false,
      isSuggestion: false
    };
  }

  // Normalize input
  const normalizedSentence = sentence.trim().toLowerCase();
  
  // Detect sentence type
  const isQuestion = /\?$|\b(what|who|when|where|why|how|can|could|would|is|are|will|do|does|did)\b/i.test(normalizedSentence);
  const isCommand = /\b(show|tell|give|find|search|get|list|display|provide|help)\b/i.test(normalizedSentence) && !isQuestion;
  const isSuggestion = /\b(maybe|perhaps|possibly|suggest|recommendation|might|may)\b/i.test(normalizedSentence);
  
  // Extract keywords (important nouns, verbs, adjectives)
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 
    'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'to', 'from', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
    'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
    'than', 'too', 'very', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours'
  ]);
  
  // Extract words, filtering out stop words and short words
  const words = normalizedSentence
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => !stopWords.has(word) && word.length > 2);
  
  // Identify important keywords
  const keywords = [...new Set(words)];
  
  // Identify modifiers (adjectives, adverbs, quantities)
  const modifierPatterns = [
    /\b(very|really|extremely|slightly|somewhat|quite|rather)\b/i,
    /\b(all|many|several|few|some|any|most|each|every|no)\b/i,
    /\b(quickly|slowly|carefully|easily|hard|well|badly|fast)\b/i,
    /\b(more|less|better|worse|best|worst|least|most)\b/i,
    /\b(first|second|third|fourth|fifth|last|next|previous)\b/i
  ];
  
  const modifiers = [];
  modifierPatterns.forEach(pattern => {
    const match = normalizedSentence.match(pattern);
    if (match) {
      modifiers.push(match[0]);
    }
  });
  
  // Determine primary intent
  let intent = 'information';
  let confidence = 0.5;
  
  // Check for specific intent patterns
  if (/\b(how to|steps|process|procedure|guide|tutorial)\b/i.test(normalizedSentence)) {
    intent = 'instruction';
    confidence = 0.8;
  } else if (/\b(what is|what are|definition|meaning|explain|describe)\b/i.test(normalizedSentence)) {
    intent = 'definition';
    confidence = 0.8;
  } else if (/\b(compare|difference|versus|vs|similarities|better)\b/i.test(normalizedSentence)) {
    intent = 'comparison';
    confidence = 0.8;
  } else if (/\b(example|sample|instance|case|illustration)\b/i.test(normalizedSentence)) {
    intent = 'example';
    confidence = 0.8;
  } else if (/\b(help|assist|support|guidance|advice)\b/i.test(normalizedSentence)) {
    intent = 'help';
    confidence = 0.9;
  } else if (/\b(problem|issue|error|trouble|not working|fix|solve|resolution)\b/i.test(normalizedSentence)) {
    intent = 'troubleshooting';
    confidence = 0.9;
  } else if (/\b(ticket|client|upload|process|deadline|time|schedule)\b/i.test(normalizedSentence)) {
    intent = 'workflow';
    confidence = 0.8;
  }
  
  // Determine if the intent is actionable
  const actionable = isCommand || 
                    /\b(show|find|get|give|tell|help|need)\b/i.test(normalizedSentence) ||
                    intent === 'help' || 
                    intent === 'troubleshooting';
  
  // Consider conversation context to refine intent
  if (conversationHistory.length > 0) {
    // Get the last few messages for context
    const recentMessages = conversationHistory.slice(-3);
    
    // Check if this is a follow-up question
    const isFollowUp = recentMessages.some(msg => 
      msg.sender === 'bot' && 
      (msg.text.includes('?') || msg.text.includes('Would you like to know more'))
    );
    
    if (isFollowUp && normalizedSentence.length < 15) {
      // Short response to a bot question is likely a follow-up
      intent = 'follow-up';
      confidence = 0.7;
    }
    
    // Check if this is a clarification of a previous question
    const userAskedBefore = recentMessages.some(msg => 
      msg.sender === 'user' && 
      stringSimilarity.compareTwoStrings(msg.text.toLowerCase(), normalizedSentence) > 0.5
    );
    
    if (userAskedBefore) {
      intent = 'clarification';
      confidence = 0.7;
    }
  }
  
  return {
    intent,
    confidence,
    keywords,
    actionable,
    modifiers,
    isQuestion,
    isCommand,
    isSuggestion,
    originalSentence: sentence
  };
};

/**
 * Resolves ambiguity when multiple keywords match in the dataset
 * @param {string} userInput - The user's input text
 * @param {Array} matchedKeywords - Array of matched keywords with similarity scores
 * @param {Object} dataCategories - Available data categories
 * @returns {Object} - Resolved keyword and category
 */
export const resolveKeywordAmbiguity = (userInput, matchedKeywords, dataCategories) => {
  if (!userInput || !Array.isArray(matchedKeywords) || matchedKeywords.length === 0) {
    return { keyword: null, category: 'default', confidence: 0 };
  }
  
  // If only one match, return it directly
  if (matchedKeywords.length === 1) {
    return { 
      keyword: matchedKeywords[0].keyword,
      category: findCategoryForKeyword(matchedKeywords[0].keyword, dataCategories),
      confidence: matchedKeywords[0].similarity
    };
  }
  
  // 1. Implement keyword hierarchy/priority
  const keywordPriorities = {
    // High priority keywords (specific terms)
    'upload retail': 10,
    'retail coding': 9,
    'retail uploads': 9,
    'bookend pairing': 8,
    'market deadline': 8,
    'process details': 8,
    'qc rotation': 7,
    'special instructions': 7,
    
    // Medium priority keywords (general terms)
    'upload': 5,
    'retail': 5,
    'process': 5,
    'deadline': 5,
    'ticket': 5,
    'client': 5,
    
    // Low priority keywords (very general terms)
    'help': 3,
    'show': 3,
    'list': 3,
    'information': 2,
    'details': 2
  };
  
  // 2. Evaluate context to disambiguate
  // First, check for exact phrase matches (highest priority)
  const exactMatches = matchedKeywords.filter(match => 
    userInput.toLowerCase().includes(match.keyword.toLowerCase())
  );
  
  if (exactMatches.length === 1) {
    return {
      keyword: exactMatches[0].keyword,
      category: findCategoryForKeyword(exactMatches[0].keyword, dataCategories),
      confidence: exactMatches[0].similarity + 0.2 // Boost confidence for exact matches
    };
  }
  
  // 3. Apply priority system
  const prioritizedMatches = matchedKeywords.map(match => {
    // Find the highest priority that applies to this keyword
    let priority = 1; // Default priority
    
    Object.keys(keywordPriorities).forEach(priorityKey => {
      if (match.keyword.toLowerCase().includes(priorityKey.toLowerCase()) ||
          priorityKey.toLowerCase().includes(match.keyword.toLowerCase())) {
        priority = Math.max(priority, keywordPriorities[priorityKey]);
      }
    });
    
    return {
      ...match,
      priority
    };
  });
  
  // Sort by priority first, then by similarity
  prioritizedMatches.sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    return b.similarity - a.similarity;
  });
  
  // Return the highest priority match
  return {
    keyword: prioritizedMatches[0].keyword,
    category: findCategoryForKeyword(prioritizedMatches[0].keyword, dataCategories),
    confidence: prioritizedMatches[0].similarity,
    allMatches: prioritizedMatches // Include all matches for reference
  };
};

/**
 * Finds the category that contains a specific keyword
 * @param {string} keyword - The keyword to search for
 * @param {Object} dataCategories - Available data categories
 * @returns {string} - The category name
 */
const findCategoryForKeyword = (keyword, dataCategories) => {
  if (!keyword || !dataCategories) return 'default';
  
  for (const category in dataCategories) {
    if (category === 'default') continue;
    
    const keywords = dataCategories[category].keywords || [];
    if (keywords.includes(keyword)) {
      return category;
    }
  }
  
  return 'default';
};

/**
 * Groups related keywords to reduce confusion
 * @param {Array} keywords - List of keywords
 * @returns {Object} - Grouped keywords by category
 */
export const groupRelatedKeywords = (keywords) => {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return {};
  }
  
  // Define keyword categories
  const categories = {
    process: ['process', 'workflow', 'procedure', 'steps', 'details'],
    upload: ['upload', 'retail', 'coding', 'bookend', 'pairing'],
    ticket: ['ticket', 'client', 'number', 'details'],
    deadline: ['deadline', 'timing', 'schedule', 'market', 'time zone'],
    instruction: ['instruction', 'special', 'restricted', 'rules'],
    roe: ['roe', 'order', 'type']
  };
  
  // Group keywords by category
  const groupedKeywords = {};
  
  keywords.forEach(keyword => {
    let assigned = false;
    
    for (const category in categories) {
      const categoryTerms = categories[category];
      
      // Check if keyword contains any category terms
      if (categoryTerms.some(term => 
        keyword.toLowerCase().includes(term.toLowerCase())
      )) {
        if (!groupedKeywords[category]) {
          groupedKeywords[category] = [];
        }
        groupedKeywords[category].push(keyword);
        assigned = true;
        break;
      }
    }
    
    // If not assigned to any category, put in 'other'
    if (!assigned) {
      if (!groupedKeywords.other) {
        groupedKeywords.other = [];
      }
      groupedKeywords.other.push(keyword);
    }
  });
  
  return groupedKeywords;
};

/**
 * Maps synonyms to canonical keywords to reduce redundancy
 * @param {string} input - User input
 * @param {Object} synonymMap - Map of synonyms to canonical keywords
 * @returns {string} - Input with synonyms replaced by canonical keywords
 */
export const mapSynonymsToCanonical = (input, synonymMap = null) => {
  if (!input || typeof input !== 'string') {
    return input;
  }
  
  // Default synonym map if none provided
  const defaultSynonymMap = {
    // Process synonyms
    'procedure': 'process',
    'workflow': 'process',
    'steps': 'process',
    'methodology': 'process',
    
    // Upload synonyms
    'upload retail': 'retail uploads',
    'retail coding': 'retail uploads',
    'retail upload': 'retail uploads',
    
    // Deadline synonyms
    'timing': 'deadline',
    'schedule': 'deadline',
    'due date': 'deadline',
    'time limit': 'deadline',
    
    // Ticket synonyms
    'client number': 'ticket',
    'ticket number': 'ticket',
    'client ticket': 'ticket',
    
    // Instruction synonyms
    'guidelines': 'instructions',
    'rules': 'instructions',
    'requirements': 'instructions',
    'restrictions': 'special instructions'
  };
  
  const synonyms = synonymMap || defaultSynonymMap;
  let processedInput = input.toLowerCase();
  
  // Replace synonyms with canonical terms
  Object.entries(synonyms).forEach(([synonym, canonical]) => {
    const regex = new RegExp(`\\b${synonym}\\b`, 'gi');
    processedInput = processedInput.replace(regex, canonical);
  });
  
  return processedInput;
};
