const express = require('express');
const router = express.Router();

// You'll need to install: npm install openai
// Uncomment the line below after installing
// const OpenAI = require('openai');

// Intelligent response generator
function generateIntelligentResponse(message) {
  // TechYatra app-specific questions
  if (message.includes('techyatra') || message.includes('app') || message.includes('website')) {
    if (message.includes('what is') || message.includes('about')) {
      return "TechYatra is your intelligent travel companion! 🌍 I help you plan perfect trips with AI-powered recommendations. You can search destinations, find places to visit, hotels, restaurants, and transport options. I also provide weather updates, travel alerts, and can generate downloadable trip plans. What would you like to explore?";
    }
    if (message.includes('how') && (message.includes('use') || message.includes('work'))) {
      return "Using TechYatra is super easy! 🚀 Just enter your destination in the search box, select your budget, click 'GO AHEAD', then choose places, hotels, and restaurants you like. Click 'Plan My Trip' to see your personalized itinerary, and download it as a PDF! You can also check weather, alerts, and ask me anything. Try it now!";
    }
    if (message.includes('feature') || message.includes('can do')) {
      return "TechYatra offers amazing features! ✨ Trip planning with real data, budget-friendly recommendations, weather updates, travel alerts, emergency contacts, PDF trip downloads, and this AI chat assistant (that's me!). I can help with destinations, packing, local culture, food recommendations, and answer any travel questions!";
    }
  }

  // Travel planning questions
  if (message.includes('plan') && (message.includes('trip') || message.includes('travel'))) {
    return "I'd love to help you plan your trip! 🗺️ Tell me your destination, budget, and interests. I can suggest the best places to visit, where to stay, what to eat, and how to get around. Use the trip planner on the home page to get personalized recommendations with real data from our database!";
  }

  // Budget travel
  if (message.includes('budget') || message.includes('cheap') || message.includes('save money')) {
    return "Great question about budget travel! 💰 Here are my top tips: Stay in hostels or budget hotels, use public transport, eat at local places, travel during off-season, look for free attractions, book in advance, and use our budget filter in TechYatra to find affordable options. You can save 50-70% this way!";
  }

  // Destination-specific
  if (message.includes('india') || message.includes('rajasthan') || message.includes('goa') || message.includes('kerala')) {
    const destinations = {
      'rajasthan': 'Rajasthan is magical! 🏰 Visit Jaipur (Pink City), Udaipur (City of Lakes), Jodhpur (Blue City), and Jaisalmer (Golden City). Don\'t miss the palaces, forts, desert safaris, and authentic Rajasthani cuisine!',
      'goa': 'Goa is perfect for beaches and nightlife! 🏖️ North Goa has party beaches like Baga and Calangute, while South Goa offers peaceful beaches like Palolem. Try seafood, visit spice plantations, and enjoy water sports!',
      'kerala': 'Kerala is God\'s Own Country! 🌴 Experience backwaters in Alleppey, hill stations in Munnar, beaches in Kovalam, and wildlife in Thekkady. Don\'t miss the houseboat experience and authentic Kerala cuisine!',
      'india': 'India is incredibly diverse! 🇮🇳 From Himalayan peaks to tropical beaches, desert palaces to backwaters, bustling cities to serene villages. Each state offers unique culture, food, and experiences. What type of experience are you looking for?'
    };
    
    for (const [place, description] of Object.entries(destinations)) {
      if (message.includes(place)) return description;
    }
  }

  // Food and culture
  if (message.includes('food') || message.includes('eat') || message.includes('cuisine')) {
    return "Indian cuisine is amazing! 🍛 Each region has unique flavors - try butter chicken in North, dosa in South, dhokla in West, and fish curry in East. Street food is a must - chaat, vada pav, momos! Always eat at busy places for freshness, and don't miss local specialties in each city you visit!";
  }

  // Packing and preparation
  if (message.includes('pack') || message.includes('bring') || message.includes('clothes')) {
    return "Smart packing tips! 🎒 Essentials: comfortable walking shoes, weather-appropriate clothes, first aid kit, power bank, universal adapter, copies of documents, sunscreen, and any medications. Pack light, bring layers, and leave space for souvenirs. Check the weather forecast for your destination!";
  }

  // Weather
  if (message.includes('weather') || message.includes('climate') || message.includes('season')) {
    return "Weather planning is crucial! 🌤️ India has three main seasons: Winter (Oct-Feb) is best for most places, Summer (Mar-May) is hot, Monsoon (Jun-Sep) brings rain. Check our weather section for real-time updates! Hill stations are great in summer, beaches in winter. What's your destination?";
  }

  // Transportation
  if (message.includes('transport') || message.includes('travel') || message.includes('train') || message.includes('flight')) {
    return "Getting around India! 🚂 Trains are economical and scenic, flights save time for long distances, buses connect smaller towns, and auto-rickshaws/taxis for local travel. Book trains in advance, use apps like IRCTC, and always negotiate taxi fares. Our transport section has real options for your route!";
  }

  // Safety and tips
  if (message.includes('safe') || message.includes('tip') || message.includes('advice')) {
    return "Travel safety tips! 🛡️ Keep copies of documents, inform someone about your itinerary, use registered taxis, drink bottled water, be cautious with street food initially, respect local customs, dress modestly at religious places, and trust your instincts. India is generally safe for tourists with basic precautions!";
  }

  // Emergency or help
  if (message.includes('emergency') || message.includes('help') || message.includes('problem')) {
    return "I'm here to help! 🆘 For emergencies, check our Emergency Contacts section with police (100), ambulance (108), and fire (101) numbers. For travel issues, I can suggest solutions. For app problems, try refreshing or let me know what's not working. What specific help do you need?";
  }

  // General greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! 👋 I'm your TechYatra AI assistant. I'm here to help with all your travel questions - trip planning, destinations, budget tips, local culture, food recommendations, and anything about using our app. What would you like to know?";
  }

  if (message.includes('thank') || message.includes('thanks')) {
    return "You're very welcome! 😊 I'm always here to help make your travel planning easier. Feel free to ask me anything about destinations, our app features, or travel tips anytime. Happy travels with TechYatra! 🌟";
  }

  // Default intelligent response
  const defaultResponses = [
    "That's an interesting question! 🤔 I'm here to help with travel planning, destination advice, budget tips, and TechYatra app features. Could you tell me more about what you're looking for? I can suggest places to visit, help plan your itinerary, or explain how to use our trip planner!",
    "I'd love to help you with that! ✈️ As your TechYatra AI assistant, I can provide information about destinations, travel tips, app features, and trip planning. What specific aspect of travel or our app would you like to know about?",
    "Great question! 🌍 I specialize in travel assistance and TechYatra features. Whether you need destination recommendations, budget advice, packing tips, or help using our trip planner, I'm here for you. What's your travel goal?",
    "I'm here to make your travel planning amazing! 🎯 I can help with destinations, itineraries, budget planning, local tips, and show you how to get the most out of TechYatra. What would you like to explore or plan?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Initialize OpenAI client (you'll need to add your API key to .env)
/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
*/

// POST /api/chat - Handle chat messages
router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    // Enhanced AI-like responses based on user input
    const response = generateIntelligentResponse(message.toLowerCase());

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    res.json({
      success: true,
      response: response
    });

    /* 
    // Uncomment this section after setting up OpenAI API key
    const systemPrompt = `You are a helpful travel assistant for TechYatra, a travel planning app. 
    You help users with travel questions, destination recommendations, budget planning, packing tips, 
    local culture information, and trip planning. Keep responses helpful, concise, and travel-focused.
    If asked about non-travel topics, politely redirect to travel-related assistance.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    res.json({
      success: true,
      response: response
    });
    */

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat message'
    });
  }
});

module.exports = router;
