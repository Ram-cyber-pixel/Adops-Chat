const generalResponses = {
  "greeting": {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hello! How can I assist you today?",
      "Hi there! What can I help you with?",
      "Hey! I'm here to help. What would you like to know?",
      "Greetings! How may I be of service today?"
    ]
  },"sups":{
    "keywords":["sups", "best sups", "supervisor",],
    "responses":["Guess What? We will never know!"]
  },"pooja":{
    "keywords":["pooja", "bookie", "nithiyamenon",],
    "responses":["Pooja is bookie, nithiyamenon, ukeybi"]
  },"kirthika":{
    "keywords":["kirthika", "james", "kirthika j",],
    "responses":["Kirthika is an adept Engineering Level 2 (ENG 2) professional, showcasing her skills and expertise in operations and growth within her field, while delivering innovative solutions on a low budget Jessi"]
  },"sneha":{
    "keywords":["sneha", "snake", "k sneha","kishore","paambu"],
    "responses":["sneha is a sootai mandai and she loves kishore, knjam maanam ketavan"]
  },"pradeep joel":{
    "keywords":["pradeep", "joel", "physc","joker","tharkuri","red flag"],
    "responses":["Pradeep is a red flag","pradeep is also know as manja pai", "pradeep"
    ]
  },
  "farewell": {
    keywords: ["bye", "goodbye", "see you", "talk to you later", "farewell"],
    responses: [
      "Goodbye! Feel free to return if you have more questions.",
      "See you later! Have a great day!",
      "Farewell! I'll be here if you need any more assistance.",
      "Bye for now! Come back anytime you need help."
    ]
  },
  "thanks": {
    "keywords": ["thanks", "thank you", "appreciate", "grateful"],
    "responses": [
      "You're welcome! Is there anything else I can help with?",
      "Happy to help! Let me know if you need anything else.",
      "My pleasure! Do you have any other questions?",
      "Anytime! I'm here if you need further assistance."
    ]
  },
  "identity": {
    "keywords": ["who are you", "what are you", "your name", "chatbot", "ai", "assistant"],
    "responses": [
      "I'm an AI assistant designed to help with various queries, including information about organization processes.",
      "I'm your virtual assistant, ready to help with questions and provide information on a wide range of topics.",
      "I'm an AI chatbot created to assist you with information and answer your questions.",
      "I'm a virtual assistant here to provide helpful responses to your queries."
    ]
  },
  "capabilities": {
    "keywords": ["what can you do", "help me with", "your abilities", "can you", "features"],
    "responses": [
      "I can answer questions about various topics, provide information about organization processes, and assist with general inquiries. How can I help you today?",
      "I'm designed to provide helpful responses, answer questions, and assist with information needs. What would you like to know?",
      "I can help with information, answer questions, and provide assistance on various topics. Feel free to ask me anything!",
      "My capabilities include answering questions, providing information, and assisting with various topics. What can I help you with?"
    ]
  },
  "weather": {
    "keywords": ["weather", "forecast", "temperature", "rain", "sunny", "cloudy"],
    "responses": [
      "I don't have access to real-time weather data, but I'd be happy to discuss other topics I can help with.",
      "While I can't check the current weather for you, I can help with many other questions you might have.",
      "I don't have weather forecasting capabilities, but I'm here to assist with other information you might need.",
      "I'm unable to provide weather updates, but I can help with many other topics. What else would you like to know?"
    ]
  },
  "time": {
    "keywords": ["time", "date", "day", "today", "current time"],
    "responses": [
      "I don't have access to the current time or date, but I can help with other information you might need.",
      "While I can't tell you the exact time right now, I'm here to assist with other questions you might have.",
      "I don't have the ability to check the current time or date, but I can help with many other topics.",
      "I'm unable to provide the current time, but I'm ready to assist with other information needs."
    ]
  },
  "personal": {
    "keywords": ["how are you", "feeling", "your day", "doing well"],
    "responses": [
      "I'm functioning well, thank you for asking! How can I assist you today?",
      "I'm operating as designed and ready to help. What can I do for you?",
      "I'm here and ready to assist with whatever you need. What can I help with?",
      "All systems operational and ready to help! What would you like to know?"
    ]
  },
  "joke": {
    "keywords": ["joke", "funny", "humor", "laugh", "tell me a joke"],
    "responses": [
      "Why don't scientists trust atoms? Because they make up everything!",
      "What did the ocean say to the beach? Nothing, it just waved!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "How does a penguin build its house? Igloos it together!",
      "What do you call a fake noodle? An impasta!"
    ]
  },
  "default": {
    "responses": [
      "I'm not sure I understand. Could you please rephrase your question?",
      "I'd like to help with that. Could you provide more details about what you're looking for?",
      "I'm still learning, but I'll do my best to assist. Could you clarify what you need?",
      "I'm here to help, but I'm not sure I understand your request. Could you try asking in a different way?"
    ]
  },
  "motivation": {
    "keywords": ["motivation", "inspire", "encourage"],
    "responses": [
      "You're doing great! Keep pushing forward.",
      "Believe in yourself, and anything is possible!",
      "Every day is a new opportunity to grow and succeed."
    ]
  },
    "bad words": {
      "keywords": [
        "stupid", "idiot", "dumb", "hate", "useless", "nonsense",
        "shut up", "fool", "crap", "sucks", "annoying", "trash",
        "damn", "hell", "bloody", "garbage"
      ],
      "responses": [
        "Let's keep the conversation respectful, please.",
        "I'm here to help, but let's maintain a positive tone.",
        "I understand you're frustrated. How can I assist you better?",
        "Let's avoid using offensive language. I'm here to help!"
      ]
    },
};

export default generalResponses;
