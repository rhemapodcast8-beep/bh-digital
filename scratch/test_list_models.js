const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Actually list models requires fetching from the REST API directly or using listModels if available in SDK
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log("Models:", data.models.map(m => m.name));
  } catch (err) {
    console.error(err);
  }
}

run();
