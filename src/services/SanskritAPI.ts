import { toast } from "sonner";

// Sanskrit data organized by categories
const sanskritData = {
  greetings: [
    { sanskrit: "नमस्ते", english: "Hello / Greetings" },
    { sanskrit: "सुप्रभातम्", english: "Good morning" },
    { sanskrit: "शुभसन्ध्या", english: "Good evening" },
    { sanskrit: "शुभरात्रिः", english: "Good night" },
    { sanskrit: "कथमस्ति भवान्?", english: "How are you? (for male)" },
    { sanskrit: "कथमस्ति भवती?", english: "How are you? (for female)" },
    { sanskrit: "अहं कुशली", english: "I am fine (Male)" },
    { sanskrit: "अहं कुशला", english: "I am fine (Female)" },
    { sanskrit: "धन्यवादः", english: "Thank you" },
    { sanskrit: "स्वागतम्", english: "Welcome" },
    { sanskrit: "क्षम्यताम्", english: "Sorry / Excuse me" },
  ],
  phrases: [
    { sanskrit: "सर्वं कुशलम्?", english: "Is everything fine?" },
    { sanskrit: "कृपया पुनः वदतु।", english: "Please say again." },
    { sanskrit: "समीपं आगच्छ।", english: "Come near." },
    { sanskrit: "त्वं कुत्र गच्छसि?", english: "Where are you going?" },
    { sanskrit: "सः विद्यालयं गच्छति।", english: "He goes to school." },
    { sanskrit: "अहम् भोजनं करिष्यामि।", english: "I will eat food." },
    { sanskrit: "गच्छतु।", english: "Please go." },
    { sanskrit: "स्थितिं कथयतु।", english: "Tell the status." },
    { sanskrit: "समझितम्।", english: "Understood." },
    { sanskrit: "सर्वं ज्ञातम्।", english: "Everything is known." },
  ],
  numbers: [
    { sanskrit: "शून्यः", english: "0" },
    { sanskrit: "एकम्", english: "1" },
    { sanskrit: "द्वे", english: "2" },
    { sanskrit: "त्रीणि", english: "3" },
    { sanskrit: "चत्वारि", english: "4" },
    { sanskrit: "पञ्च", english: "5" },
    { sanskrit: "षट्", english: "6" },
    { sanskrit: "सप्त", english: "7" },
    { sanskrit: "अष्ट", english: "8" },
    { sanskrit: "नव", english: "9" },
    { sanskrit: "दश", english: "10" },
  ],
  days: [
    { sanskrit: "रविवासरः", english: "Sunday" },
    { sanskrit: "सोमवासरः", english: "Monday" },
    { sanskrit: "मङ्गलवासरः", english: "Tuesday" },
    { sanskrit: "बुधवासरः", english: "Wednesday" },
    { sanskrit: "गुरुवासरः", english: "Thursday" },
    { sanskrit: "शुक्रवासरः", english: "Friday" },
    { sanskrit: "शनिवासरः", english: "Saturday" },
  ],
  objects: [
    { sanskrit: "पुस्तकम्", english: "Book" },
    { sanskrit: "लेखनी", english: "Pen" },
    { sanskrit: "फलं", english: "Fruit" },
    { sanskrit: "जलम्", english: "Water" },
    { sanskrit: "गृहम्", english: "House" },
    { sanskrit: "छात्रः", english: "Student (male)" },
    { sanskrit: "छात्रा", english: "Student (female)" },
    { sanskrit: "शिक्षकः", english: "Teacher (male)" },
    { sanskrit: "शिक्षिका", english: "Teacher (female)" },
  ],
  colors: [
    { sanskrit: "श्वेतः", english: "White" },
    { sanskrit: "कृष्णः", english: "Black" },
    { sanskrit: "पीतः", english: "Yellow" },
    { sanskrit: "नीलः", english: "Blue" },
    { sanskrit: "रक्तः", english: "Red" },
    { sanskrit: "हरितः", english: "Green" },
  ],
  family: [
    { sanskrit: "जनकः", english: "Father" },
    { sanskrit: "माता", english: "Mother" },
    { sanskrit: "भ्राता", english: "Brother" },
    { sanskrit: "भगिनी", english: "Sister" },
    { sanskrit: "पुत्रः", english: "Son" },
    { sanskrit: "पुत्री", english: "Daughter" },
    { sanskrit: "पितामहः", english: "Grandfather" },
    { sanskrit: "पितामही", english: "Grandmother" },
  ],
  directions: [
    { sanskrit: "उत्तरः", english: "North" },
    { sanskrit: "दक्षिणः", english: "South" },
    { sanskrit: "पूर्वः", english: "East" },
    { sanskrit: "पश्चिमः", english: "West" },
  ],
  elements: [
    { sanskrit: "भूमिः", english: "Earth" },
    { sanskrit: "अपः / जलम्", english: "Water" },
    { sanskrit: "तेजः / अग्निः", english: "Fire" },
    { sanskrit: "वायुः", english: "Air" },
    { sanskrit: "आकाशः", english: "Sky" },
  ],
  questions: [
    { sanskrit: "किं नाम ते?", english: "What is your name?" },
    { sanskrit: "किं कुर्वन्ति भवान् / भवती?", english: "What do you do?" },
    { sanskrit: "किं आवश्यकं?", english: "What is needed?" },
    { sanskrit: "कस्मिन प्रदेशे गच्छसि?", english: "Where are you going?" },
    { sanskrit: "कियद् मूल्यं?", english: "What is the price?" },
    { sanskrit: "किमर्थं एवं?", english: "Why is it so?" },
  ],
};

// Function to find relevant Sanskrit content based on user query
const findRelevantSanskritContent = (userQuery: string) => {
  userQuery = userQuery.toLowerCase();
  
  // Check for category mentions
  const categoryMatches: Record<string, number> = {};
  
  Object.entries(sanskritData).forEach(([category, items]) => {
    // Match category name
    if (userQuery.includes(category.toLowerCase())) {
      categoryMatches[category] = (categoryMatches[category] || 0) + 5;
    }
    
    // Check for matches within items
    items.forEach(item => {
      const englishLower = item.english.toLowerCase();
      if (englishLower.includes(userQuery) || userQuery.includes(englishLower)) {
        categoryMatches[category] = (categoryMatches[category] || 0) + 3;
      }
      
      // Check for keyword matches
      const keywords = englishLower.split(/[^a-z0-9]/);
      keywords.forEach(keyword => {
        if (keyword.length > 2 && userQuery.includes(keyword)) {
          categoryMatches[category] = (categoryMatches[category] || 0) + 1;
        }
      });
    });
  });
  
  // Find the best matching category
  let bestCategory = '';
  let highestScore = 0;
  
  Object.entries(categoryMatches).forEach(([category, score]) => {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  });
  
  // If we have a good category match, return items from that category
  if (highestScore > 0) {
    return {
      categoryName: bestCategory,
      items: sanskritData[bestCategory as keyof typeof sanskritData]
    };
  }
  
  // Fallback to a random category if no good match
  const categories = Object.keys(sanskritData);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  return {
    categoryName: randomCategory,
    items: sanskritData[randomCategory as keyof typeof sanskritData]
  };
};

// API to get Sanskrit teaching response
export const getSanskritResponse = async (userQuery: string) => {
  try {
    // Find relevant Sanskrit content based on the user query
    const relevantContent = findRelevantSanskritContent(userQuery);
    
    // Prepare system message with relevant content
    const systemMessage = `You are a Sanskrit language teacher. Respond in both Sanskrit and English. 
    Keep responses concise and helpful. Include the Sanskrit script first, followed by the English translation.
    Here are some relevant Sanskrit phrases from the '${relevantContent.categoryName}' category that may help with the response:
    ${relevantContent.items.slice(0, 3).map(item => `${item.sanskrit} (${item.english})`).join('\n')}`;
    
    // Make API call to Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userQuery }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Groq API');
    }
    
    const data = await response.json();
    const messageContent = data.choices[0].message.content;
    
    // Extract Sanskrit part (usually before English)
    let sanskritPart = '';
    let englishPart = messageContent;
    
    // Attempt to separate Sanskrit and English parts
    // Look for patterns like Sanskrit text followed by English translation
    const parts = messageContent.split(/\n\n|\n/);
    
    if (parts.length > 1) {
      // Check if the first part contains Devanagari script
      if (/[\u0900-\u097F]/.test(parts[0])) {
        sanskritPart = parts[0].trim();
        englishPart = parts.slice(1).join('\n').trim();
      }
    }
    
    return {
      sanskrit: sanskritPart,
      english: englishPart
    };
  } catch (error) {
    console.error('Error getting Sanskrit response:', error);
    toast.error('Could not connect to the Sanskrit learning service');
    return {
      sanskrit: '',
      english: 'I apologize, but I could not process your request at this time. Please try again later.'
    };
  }
};

// Enhanced text-to-speech API for Sanskrit with better voice configuration
export const getSpeech = async (text: string) => {
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Use browser's built-in speech synthesis
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7; // Slower rate for Sanskrit
    utterance.pitch = 1.1; // Slightly higher pitch for clarity
    
    // Try to find a good voice for Sanskrit
    const voices = window.speechSynthesis.getVoices();
    const preferredVoiceLangs = ['hi-IN', 'hi', 'sa', 'sa-IN', 'ne-NP'];
    
    // Try to find a Hindi/Sanskrit/Nepali voice
    let selectedVoice = null;
    
    for (const lang of preferredVoiceLangs) {
      selectedVoice = voices.find(voice => voice.lang === lang);
      if (selectedVoice) break;
    }
    
    // If no preferred voice found, try to use a female voice as they often sound better for Sanskrit
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
    }
    
    // Fallback to any available voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Add a small pause at the beginning to make sure speech starts properly
    utterance.text = ", " + text;
    
    // Add event listeners for debugging
    utterance.onstart = () => console.log('Speech started');
    utterance.onend = () => console.log('Speech ended');
    utterance.onerror = (event) => console.error('Speech error:', event);
    
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Text-to-speech error:', error);
    toast.error('Could not generate speech');
    return false;
  }
};

// Get all available categories
export const getCategories = () => {
  return Object.keys(sanskritData);
};

// Get items for a specific category
export const getCategoryItems = (category: string) => {
  if (category in sanskritData) {
    return sanskritData[category as keyof typeof sanskritData];
  }
  return [];
};

// Translate text to Sanskrit (wrapper for API call)
export const translateToSanskrit = async (text: string) => {
  if (!text.trim()) {
    return { sanskrit: '', english: '' };
  }
  
  try {
    // Use the existing Groq API call for translation
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { 
            role: 'system', 
            content: `You are a Sanskrit language translator. Provide accurate translations from English to Sanskrit using Devanagari script. Format response with Sanskrit first, then English explanation.` 
          },
          { role: 'user', content: `Translate this to Sanskrit: ${text}` }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch translation');
    }
    
    const data = await response.json();
    const messageContent = data.choices[0].message.content;
    
    // Extract Sanskrit part
    let sanskritPart = '';
    let englishPart = messageContent;
    
    // Attempt to separate Sanskrit and English parts
    const parts = messageContent.split(/\n\n|\n/);
    
    if (parts.length > 1) {
      // Check if the first part contains Devanagari script
      if (/[\u0900-\u097F]/.test(parts[0])) {
        sanskritPart = parts[0].trim();
        englishPart = parts.slice(1).join('\n').trim();
      }
    }
    
    return {
      sanskrit: sanskritPart,
      english: englishPart
    };
    
  } catch (error) {
    console.error('Translation error:', error);
    toast.error('Could not translate text');
    return { sanskrit: '', english: '' };
  }
};
