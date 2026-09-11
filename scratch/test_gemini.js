const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("GEMINI_API_KEY is not set.");
    return;
  }

  console.log(`Key found. Length: ${apiKey.length}`);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const result = await model.generateContent("Responda apenas: TESTE GEMINI OK");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.log("Error:", error.message);
  }
}

run();
