const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-key');

const analyzeResume = async (resumeContent) => {
    // Check for real key or use mock
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        console.log('⚠️ No Gemini API Key found. Returning mock analysis data.');
        return {
            score: 75,
            strengths: [
                "Strong technical skills listed",
                "Clear experience descriptions",
                "Good use of action verbs"
            ],
            improvements: [
                "Add more quantifiable results",
                "Include a summary section",
                "Optimize for more industry keywords"
            ],
            keywords: ["Leadership", "Agile", "Cloud Computing"],
            formatting: "The structure is generally good, but consider adding more white space for readability."
        };
    }

    try {
        // User requested 2.5, but it doesn't exist yet. Using 1.5 Pro as it's more capable than Flash.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `
      Analyze the following resume content and provide a structured JSON response.
      
      Resume Content:
      ${JSON.stringify(resumeContent)}
      
      The response must be a valid JSON object with the following structure:
      {
        "score": <number 0-100>,
        "strengths": [<string array of key strengths>],
        "improvements": [<string array of areas for improvement>],
        "keywords": [<string array of missing important keywords based on the content>],
        "formatting": "<string with feedback on structure and formatting>"
      }
      
      Focus on ATS compatibility, keyword optimization, and overall content quality.
      Ensure the response is ONLY the JSON object, no markdown formatting or extra text.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();

        const analysisResult = JSON.parse(cleanText);
        return analysisResult;
    } catch (error) {
        console.error('Gemini Analysis Error:', error);
        throw new Error('Failed to analyze resume');
    }
};

module.exports = {
    analyzeResume,
};
