/**
 * URL and resource utilities for enhanced search capabilities
 */
 
import roeData from "../data/roeData";
 
 
/**
 * Resource data with URLs for various categories
 */
export const resourceData = {
  // National upload resources
  nationalUploads: {
    "Daily Tracker": "https://onedrive.live.com/national-upload-templates",
    recentUpdates: [
      {
        Month: "January",
        title: "January National Upload Process",
        url: "https://comcastcorp-my.sharepoint.com/personal/kobili497_apac_comcast_com/_layouts/15/Doc.aspx?sourcedoc=%7B14fe5ed0-0f9b-451d-ab6a-08272320dd70%7D&action=view&wd=target%28January.one%7C82a90435-250f-4328-a02f-4e09ede84696%2F%29&wdorigin=717"
      },
      {
        Month: "february",
        title: "February Updated National Uploads",
        url: "https://comcastcorp-my.sharepoint.com/personal/kobili497_apac_comcast_com/_layouts/15/Doc.aspx?sourcedoc=%7B14fe5ed0-0f9b-451d-ab6a-08272320dd70%7D&action=view&wd=target%28February.one%7C9a031161-f5f4-4cae-8d21-6485c9227f5f%2F%29&wdorigin=717"
      },
      {
        Month: "march",
        title: "March Updated National Uploads",
        url: "https://comcastcorp-my.sharepoint.com/personal/kobili497_apac_comcast_com/_layouts/15/Doc.aspx?sourcedoc=%7B14fe5ed0-0f9b-451d-ab6a-08272320dd70%7D&action=view&wd=target%28March.one%7Cbc00e3a6-6d43-4d1e-9a93-7cb07ed89c54%2F%29&wdorigin=717"
      },
      {
        Month: "april",
        title: " April Updated National Uploads",
        url: "https://comcastcorp-my.sharepoint.com/personal/kobili497_apac_comcast_com/_layouts/15/Doc.aspx?sourcedoc=%7B14fe5ed0-0f9b-451d-ab6a-08272320dd70%7D&action=view&wd=target%28April.one%7C95307def-bd53-4e86-9b3e-63a30b7657fa%2F%29&wdorigin=717"
      },
    ]
  },
 
  // Retail upload resources
  retailUploads: {
    "Retail One Note": "https://onedrive.live.com/retail-uploads-main",
    "Retail Coding & Upload Tracker": "https://comcastcorp-my.sharepoint.com/:x:/g/personal/stanwe022_apac_comcast_com/Echt0s0l701Jq_XtLdEyeGgBxzdwxpGYOy43hjgwO5C0Ig?e=CDCCKF&CID=A28C9CBF-4B37-4566-832B-7F94EF8E1422&wdLOR=cD8A5997D-E8A8-4684-A47E-A53F06E6CD7A",
    recentUpdates: [
      {
        title: "Retail Upload onenote",
        url: "https://comcastcorp-my.sharepoint.com/:o:/r/personal/prajen532_apac_comcast_com/_layouts/15/Doc.aspx?sourcedoc=%7Bc64bfe3b-07ec-4ee0-b456-254b62cac535%7D&action=edit&wd=target(General%20Updates.one%7C482fbc44-1883-4270-a08b-ffdfea8af569%2FGeneral%20Updates%7Ccb4e4768-b80c-40f3-8910-f847be8e25f9%2F)&wdorigin=NavigationUrl"
      },
      {
        title: "New Updates in onenote-retail",
        url: "https://comcastcorp-my.sharepoint.com/:o:/g/personal/kg414_apac_comcast_com/EhvgtFX07TdDub9BgXmFzQIBjlnOA8O4A-XRyTAioQ7Ffw?e=2kgrvN"
      },
    ]
  },
  screenshot: {
    "Daily Tracker": "https://comcastcorp-my.sharepoint.com/:x:/r/personal/ssubra578_apac_comcast_com/Documents/Microsoft%20Teams%20Chat%20Files/Screenshot%20Tracker%20-%20Q2%202025%201.xlsx?d=w3fbe79c2d794415ead954db48c9f69e6&csf=1&web=1&e=CyiUOt",
    recentUpdates: [
      {
        title: "Onenote Screenshot",
        url: "https://comcastcorp.sharepoint.com/:w:/r/teams/AudienceDirect/Shared%20Documents/General/CIOC%20Screen%20Shot%20Process%20-%209.5.24.docx?d=w51f4f5e65ccb4e30bb9887f05bf150f0&csf=1&web=1&e=Es0bMh"
      },
    ]
  },
  Makegoods: {
    "Task Force Tracker": "https://comcastcorp-my.sharepoint.com/:x:/g/personal/hnagas328_apac_comcast_com/ESjaM2BrLCVDrLePOP-LN0EBalRqhg63ImgTMXeNwwJCfg?email=Harshaavardhan_Subramani%40comcast.com&e=aZwb8n&isSPOFile=1&xsdata=MDV8MDJ8fGNkM2U0ZDI5MmY2MzRhZTA0ZjI1MDhkZDg3M2NmNTRhfDkwNmFlZmU5NzZhNzRmNjViODJkNWVjMjA3NzVkNWFhfDB8MHw2Mzg4MTU0MTgwMzk1NTM4Mjl8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKV0lqb2lNQzR3TGpBd01EQWlMQ0pRSWpvaVYybHVNeklpTENKQlRpSTZJazkwYUdWeUlpd2lWMVFpT2pFeGZRPT18MXxMMk5vWVhSekx6RTVPakV6WWpkbFpUTmtMVE0xWkRndE5ESm1ZeTA0T1ROaExUaG1aRFUyTTJVeU1XWTVaVjlrTjJJd05ERmhaQzFoWmpVNExUUmhOMkV0T1RnMllTMHpaREJqWmpabU56bGlaRGhBZFc1eExtZGliQzV6Y0dGalpYTXZiV1Z6YzJGblpYTXZNVGMwTlRrME5UQXdNemMwTUE9PXxmMjQ4NmZjYWE1ZWI0ZTQzNGYyNTA4ZGQ4NzNjZjU0YXw2OTVjMTg2MTk4OWU0MGNjOWIzYmI2NGU2YTBhMzA1NQ%3D%3D&sdata=RnVvTGNvb0xHN2luVkFPTTNKTWxCQjdEaE41M09maUhBSjlRNnZPTUtITT0%3D&ovuser=906aefe9-76a7-4f65-b82d-5ec20775d5aa%2Caaiswa544%40apac.comcast.com",
    "Time Tracker":"https://comcastcorp-my.sharepoint.com/:x:/r/personal/kjeyar840_apac_comcast_com/Documents/Automated%20Trackers/MG%20Productivity%20Tracker%20(Main%20Tracker).xlsm?d=wa72a1c694ca24dee8311c39cb1636b70&csf=1&web=1&e=mcfIsP&isSPOFile=1&xsdata=MDV8MDJ8fDc2YjgwNDcwMzkyNzQ2ZTZhOWNkMDhkZDg3M2QyM2E0fDkwNmFlZmU5NzZhNzRmNjViODJkNWVjMjA3NzVkNWFhfDB8MHw2Mzg4MTU0MTg4MTcyMjcyMTN8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKV0lqb2lNQzR3TGpBd01EQWlMQ0pRSWpvaVYybHVNeklpTENKQlRpSTZJazkwYUdWeUlpd2lWMVFpT2pFeGZRPT18MXxMMk5vWVhSekx6RTVPakV6WWpkbFpUTmtMVE0xWkRndE5ESm1ZeTA0T1ROaExUaG1aRFUyTTJVeU1XWTVaVjlrTjJJd05ERmhaQzFoWmpVNExUUmhOMkV0T1RnMllTMHpaREJqWmpabU56bGlaRGhBZFc1eExtZGliQzV6Y0dGalpYTXZiV1Z6YzJGblpYTXZNVGMwTlRrME5UQTRNVE16Tnc9PXwwYTVlNGUxZTYzOTk0MmMyNDc2ODA4ZGQ4NzNkMjNhMnxkNGU1ZmRkNjM3ZjE0OGY3YmU3ZjU3MTI5NmUxMGEyNA%3D%3D&sdata=aGFoWkMzaWZKWVpTV3U2MjRPWmNxODR2MmN2alBsQjVvYlJiMWRabmRudz0%3D&ovuser=906aefe9-76a7-4f65-b82d-5ec20775d5aa%2Caaiswa544%40apac.comcast.com",
    recentUpdates: [
  {
        title: "MG Steps Doc",
        url: "https://comcastcorp-my.sharepoint.com/personal/aaiswa544_apac_comcast_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Faaiswa544%5Fapac%5Fcomcast%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FMG%20Cheat%20sheet%204%201%2Epdf&parent=%2Fpersonal%2Faaiswa544%5Fapac%5Fcomcast%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files&ga=1",
      },
        {
          title: "Scenarios Smartsheet",
        url: "https://comcastcorp-my.sharepoint.com/:w:/g/personal/aaiswa544_apac_comcast_com/EZbdY9j0kKtBgJ595F3ItrkBk5pPhCFGAi6tsV2iBYrRjA?email=Pooja_Raghavendra%40comcast.com&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1745948764956&web=1",
      },
        {
          title: "One Tim link",
        url: "https://onetimprod.cable.comcast.com/OneTimMvc/OrderStatus"},
    ]
  } ,
 
  // QC resources
   qualityControl: {
    "Qc One Note": "https://onedrive.live.com/qc-main",
    recentUpdates: [
      {
        date: "2025-04-05",
        title: "New Quality Control Requirements",
        url: "https://onedrive.live.com/qc-requirements-2025"
      }
    ]
  },
  enterprise: {
    "Enterprise Tracker": "https://onedrive.live.com/qc-main",
    recentUpdates: [
      {
        title: "Onenote Enterprise Uploads",
        url: "https://comcastcorp-my.sharepoint.com/:o:/r/personal/tkumar828_apac_comcast_com/Documents/ENTERPRISE?d=w5cab8b72c8bd496ebe208914d99a83da&csf=1&web=1&e=ir0dCr%22"
      }
    ]
  },fullfillmentDigital: {
    "Fullfillment Tracker": "https://comcastcorp-my.sharepoint.com/:x:/r/personal/mmanso012_apac_comcast_com/Documents/Fulfillment%20Tracker%20Q1%202025.xlsx?d=w7ae2354c01a84578a25772fa089e72b5&csf=1&web=1&e=Jzi8qN%22",
    recentUpdates: [
      {
        title: "Onenote Fullfillment Uploads",
        url: ""
      },
      
    ]
  },
  Qclinks: {
    "Qc Time tracker Tracker": "",
    recentUpdates: [
      {
        title: "One note Qc",
        url: ""
      }
    ]
  },
  commonLinks: {
    Links: [
      {
        title: "Team Support",
        url: "https://app.na3.teamsupport.com/login?ReturnUrl=%2f",
      },
      {title: "xG Linear",
        url: "https://comcastcorp.sharepoint.com/sites/xGLinear",
      },
      {title: "InnCreative",
        url: "https://inncreative.comcast.com/#/acw/dashboard",
      },
      {title: "ACP",
        url: "https://efvcm.cable.comcast.com/acp",
      },
    ]
  },
  
 
 
  // System resources
  system: {
    main: "https://onedrive.live.com/system-main",
    userGuide: "https://onedrive.live.com/system-user-guide",
    troubleshooting: "https://onedrive.live.com/system-troubleshooting",
    updates: "https://onedrive.live.com/system-updates",
    recentUpdates: [
      {
        date: "2025-03-28",
        title: "System Maintenance Notice",
        url: "https://onedrive.live.com/system-maintenance-april"
      }
    ]
  }
};
 
/**
 * Checks if the input is requesting URL or resource information
 * @param {string} input - User input to check
 * @returns {boolean} - True if input is requesting URL information
 */
export const isUrlResourceQuery = (input) => {
  if (!input || typeof input !== 'string') return false;
 
  const lowerInput = input.toLowerCase().trim();
 
  // Check for URL and resource keywords
  const urlKeywords = [
    'url', 'link', 'national onenote', 'sharepoint', 'share point',
    'resource', 'resources', 'document', 'documents', 'file', 'files',
    'guide', 'guidelines', 'template', 'templates', 'training',
    'national daily tracker','daily tracker','national onenote link','retail onenote link','retail onenote','ss onenote','ss daily tracker','screenshot onenote','screenshot daily tracker','screenshot tracker','enterprise', 'fullfillment', "fullfillmentDigital",'mg','general','common'
  ];
 
  // Check for category keywords
  const categoryKeywords = [
    'national', 'retail', 'qc', 'quality control',
    'upload', 'uploads','screenshot', 'ss', 'enterprise', 'fullfillment','mg','common'
  ];
 
  // Check for keyword matches
  const hasUrlKeyword = urlKeywords.some(keyword =>
    lowerInput.includes(keyword)
  );
 
  const hasCategoryKeyword = categoryKeywords.some(keyword =>
    lowerInput.includes(keyword)
  );
 
  return hasUrlKeyword && hasCategoryKeyword;
};
 
/**
 * Extracts category information from user input
 * @param {string} input - User input text
 * @returns {Object} - Extracted category information
 */
export const extractCategoryInfo = (input) => {
  if (!input || typeof input !== 'string') {
    return { hasCategory: false };
  }
 
  const lowerInput = input.toLowerCase().trim();
 
  // Initialize result object
  const result = {
    hasCategory: false,
    category: null,
    resourceType: null,
    wantsRecentUpdates: false
  };
 
  // Check for category matches
  if (lowerInput.includes('national') ||
      (lowerInput.includes('national') && lowerInput.includes('upload'))) {
    result.hasCategory = true;
    result.category = 'nationalUploads';
  } else if (lowerInput.includes('retail') ||
            (lowerInput.includes('retail') && lowerInput.includes('upload'))) {
    result.hasCategory = true;
    result.category = 'retailUploads';
  } else if (lowerInput.includes('qc') || lowerInput.includes('quality control')) {
    result.hasCategory = true;
    result.category = 'Qclinks';
  } else if (lowerInput.includes('ts') || lowerInput.includes('common')) {
    result.hasCategory = true;
    result.category = 'commonLinks';
  }else if (lowerInput.includes('ss') || lowerInput.includes('screenshot')) {
    result.hasCategory = true;
    result.category = 'screenshot';
  }else if (lowerInput.includes('mg') || lowerInput.includes('makegoods')) {
    result.hasCategory = true;
    result.category = 'Makegoods';
  }else if (lowerInput.includes('training') && !lowerInput.includes('upload')) {
    result.hasCategory = true;
    result.category = 'training';
  } else if (lowerInput.includes('enterprise') || !lowerInput.includes('enterprise upload')) {
    result.hasCategory = true;
    result.category = 'enterprise';
  } else if (lowerInput.includes('fulfillment') ||lowerInput.includes('fullfillment')) {
    result.hasCategory = true;
    result.category = 'fullfillmentDigital';
  }else if (lowerInput.includes('system')) {
    result.hasCategory = true;
    result.category = 'system';
  } else if (lowerInput.includes('upload') || lowerInput.includes('uploads')) {
    // Default to national uploads if just "upload" is mentioned
    result.hasCategory = true;
    result.category = 'nationalUploads';
  }
 
  // Check for resource type
  if (lowerInput.includes('template')) {
    result.resourceType = 'templates';
  } else if (lowerInput.includes('guideline') || lowerInput.includes('guide')) {
    result.resourceType = 'guidelines';
  } else if (lowerInput.includes('schedule')) {
    result.resourceType = 'schedules';
  } else if (lowerInput.includes('training') && result.category !== 'training') {
    result.resourceType = 'training';
  } else if (lowerInput.includes('checklist') && result.category === 'qualityControl') {
    result.resourceType = 'checklists';
  } else if (lowerInput.includes('troubleshoot') && result.category === 'system') {
    result.resourceType = 'troubleshooting';
  }
 
  // Check if requesting recent updates
  if (lowerInput.includes('update') || lowerInput.includes('recent')) {
    result.wantsRecentUpdates = true;
  }
 
  return result;
};
 
/**
 * Generates a response for URL and resource queries
 * @param {string} input - User input text
 * @returns {Object} - Response object with text and metadata
 */
export const generateUrlResourceResponse = (input) => {
  if (!input) {
    return {
      text: "I couldn't determine what resource information you're looking for. Please specify a category (like national uploads, retail, QC, etc.) and what type of resource you need.",
      confidence: 0.5
    };
  }
 
  const categoryInfo = extractCategoryInfo(input);
 
  if (!categoryInfo.hasCategory) {
    return {
      text: "I couldn't identify which category of resources you're looking for. We have resources for national uploads, retail uploads, quality control, training, and system information. Please specify which area you need URLs for.",
      confidence: 0.6
    };
  }
 
  const category = categoryInfo.category;
  const categoryData = resourceData[category];
 
  if (!categoryData) {
    return {
      text: "I couldn't find resource information for that category. Please try asking about national uploads, retail uploads, quality control, training, or system resources.",
      confidence: 0.5
    };
  }
 
  // Generate response based on what was requested
  let responseText = "";
  let sidebarContent = null;
 
  // Category title for display
  const categoryTitle = {
    nationalUploads: "National Uploads",
    retailUploads: "Retail Uploads",
    qualityControl: "Quality Control",
    screenshot: "Screenshots",
    enterprise: "Enterprise",
    fullfillmentDigital: "Fullfillment",
    training: "Training",
    system: "System",
    Makegoods: "Makgoods",
    Qclinks:"Qclinks",
    commonLinks:"Common Links"
  }[category];
 
  // If specific resource type was requested
  if (categoryInfo.resourceType && categoryData[categoryInfo.resourceType]) {
    const resourceType = categoryInfo.resourceType;
    const resourceTypeTitle = resourceType.charAt(0).toUpperCase() + resourceType.slice(1);
   
    responseText = `Here is the ${categoryTitle} ${resourceTypeTitle} URL:\n\n`;
    responseText += `${categoryData[resourceType]}\n`;
   
    // Add recent updates if requested
    if (categoryInfo.wantsRecentUpdates && categoryData.recentUpdates) {
      responseText += `\nRecent updates for ${categoryTitle}:\n`;
      categoryData.recentUpdates.forEach((update, index) => {
        responseText += `${index + 1}. ${update.date} - ${update.title}\n`;
        responseText += `   URL: ${update.url}\n`;
      });
    }

    if (categoryInfo.wantsLinks && categoryData.Links) {
      responseText += `\nRecent updates for ${categoryTitle}:\n`;
      categoryData.recentUpdates.forEach((update, index) => {
        responseText += `${index + 1}. ${update.date} - ${update.title}\n`;
        responseText += `   URL: ${update.url}\n`;
      });
    }    
    // Prepare sidebar content
    sidebarContent = {
      title: `${categoryTitle} Resources`,
      content: [
        { type: "heading", text: `${resourceTypeTitle} Resource` },
        { type: "link", text: resourceTypeTitle, url: categoryData[resourceType] }
      ]
    };
    // Add other resources to sidebar
    const otherResources = Object.entries(categoryData)
      .filter(([key, _]) => key !== resourceType && key !== 'recentUpdates' && key == 'Links')
      .map(([key, url]) => ({
        type: "link",
        text: key.charAt(0).toUpperCase() + key.slice(1),
        url: url
      }));
   
    if (otherResources.length > 0) {
      sidebarContent.content.push({ type: "heading", text: "Other Resources" });
      sidebarContent.content.push(...otherResources);
    }
  }
  // If recent updates were specifically requested
  else if (categoryInfo.wantsRecentUpdates && categoryData.recentUpdates) {
    responseText = `Recent updates for ${categoryTitle}:\n\n`;
   
    categoryData.recentUpdates.forEach((update, index) => {
      responseText += `${index + 1}. ${update.date} - ${update.title}\n`;
      responseText += `   URL: ${update.url}\n\n`;
    });
   
    // Prepare sidebar content
    sidebarContent = {
      title: `${categoryTitle} Updates`,
      content: [
        { type: "heading", text: "Recent Updates" },
        ...categoryData.recentUpdates.map(update => ({
          type: "update",
          month: update.month,
          date: update.date,
          title: update.title,
          url: update.url
        }))
      ]
    };
  }
  // Default to providing all URLs for the category
  else {
    responseText = `Here are the ${categoryTitle} resource URLs:\n\n`;
   
    Object.entries(categoryData)
      .filter(([key, _]) => key !== 'recentUpdates')
      .forEach(([key, url], index) => {
        const resourceTitle = key.charAt(0).toUpperCase() + key.slice(1);
        responseText += `${index + 1}. ${resourceTitle}: ${url}\n`;
      });
   
    // Add recent updates if available
    if (categoryData.recentUpdates && categoryData.recentUpdates.length > 0) {
      responseText += `\nRecent updates:\n`;
      categoryData.recentUpdates.forEach((update, index) => {
        responseText += `${index + 1}. ${update.date} - ${update.title}\n`;
        responseText += `   URL: ${update.url}\n`;
      });
    }
   
    // Prepare sidebar content
    sidebarContent = {
      title: `${categoryTitle} Resources`,
      content: [
        { type: "heading", text: "Available Resources" },
        ...Object.entries(categoryData)
          .filter(([key, _]) => key !== 'recentUpdates')
          .map(([key, url]) => ({
            type: "link",
            text: key.charAt(0).toUpperCase() + key.slice(1),
            url: url
          })),
      ]
    };
   
    // Add recent updates to sidebar if available
    if (categoryData.recentUpdates && categoryData.recentUpdates.length > 0) {
      sidebarContent.content.push({ type: "heading", text: "Recent Updates" });
      sidebarContent.content.push(...categoryData.recentUpdates.map(update => ({
        type: "update",
        date: update.date,
        title: update.title,
        url: update.url
      })));
    }
    if (categoryData.Links && categoryData.Links.length > 0) {
      sidebarContent.content.push({ type: "heading", text: "Recent Updates" });
      sidebarContent.content.push(...categoryData.Links.map(update => ({
        type: "update",
        date: update.date,
        title: update.title,
        url: update.url
      })));
    }
  }
 
  return {
    text: responseText,
    confidence: 0.9,
    category: 'urlResource',
    sidebarContent: sidebarContent
  };
};