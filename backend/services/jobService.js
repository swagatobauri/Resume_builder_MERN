const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-key');

const searchJobs = async (resumeData) => {
    try {
        // 1. Extract keywords using Gemini
        let searchParams = {
            what: 'Software Engineer',
            where: 'Remote'
        };

        if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
                const prompt = `
          Extract job search parameters from this resume data.
          Return ONLY a JSON object with 'what' (job titles/keywords) and 'where' (location preference, default to 'Remote' if unclear).
          Resume: ${JSON.stringify(resumeData).substring(0, 1000)}...
        `;
                const result = await model.generateContent(prompt);
                const text = result.response.text().replace(/```json\n?|\n?```/g, '').trim();
                searchParams = JSON.parse(text);
            } catch (e) {
                console.warn('Gemini extraction failed, using defaults', e);
            }
        }

        // 2. Fetch from Adzuna (or Mock)
        const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
        const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;

        if (!ADZUNA_APP_ID || !ADZUNA_API_KEY || ADZUNA_APP_ID === 'your_adzuna_app_id') {
            console.log('⚠️ No Adzuna credentials. Returning mock jobs.');
            return getMockJobs();
        }

        const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1`, {
            params: {
                app_id: ADZUNA_APP_ID,
                app_key: ADZUNA_API_KEY,
                what: searchParams.what,
                where: searchParams.where,
                'content-type': 'application/json',
            }
        });

        const jobs = response.data.results.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company.display_name,
            location: job.location.display_name,
            description: job.description,
            url: job.redirect_url,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            match_score: Math.floor(Math.random() * 20) + 80, // Mock score for now
            match_reason: "Matches your skills in " + searchParams.what
        }));

        return jobs;

    } catch (error) {
        console.error('Job Search Error:', error);
        throw new Error('Failed to fetch jobs');
    }
};

const getMockJobs = () => [
    {
        id: '1',
        title: 'Senior React Developer',
        company: 'TechFlow Solutions',
        location: 'Remote',
        description: 'We are looking for an experienced React developer to join our team...',
        url: '#',
        salary_min: 120000,
        salary_max: 150000,
        match_score: 95,
        match_reason: "Strong match with your React and Frontend experience."
    },
    {
        id: '2',
        title: 'Full Stack Engineer',
        company: 'InnovateCorp',
        location: 'New York, NY (Hybrid)',
        description: 'Join our fast-paced team building the next generation of fintech...',
        url: '#',
        salary_min: 130000,
        salary_max: 160000,
        match_score: 88,
        match_reason: "Good overlap with your Node.js and database skills."
    },
    {
        id: '3',
        title: 'Frontend Engineer',
        company: 'Creative Digital',
        location: 'Remote',
        description: 'Looking for a creative frontend engineer with an eye for design...',
        url: '#',
        salary_min: 100000,
        salary_max: 130000,
        match_score: 82,
        match_reason: "Matches your desire for creative UI work."
    }
];

module.exports = {
    searchJobs,
};
