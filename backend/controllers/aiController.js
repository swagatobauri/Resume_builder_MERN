const openaiService = require('../services/geminiService');

const analyzeResume = async (req, res) => {
    try {
        const { resumeContent } = req.body;

        if (!resumeContent) {
            return res.status(400).json({
                success: false,
                message: 'Resume content is required',
            });
        }

        const analysis = await openaiService.analyzeResume(resumeContent);

        res.status(200).json({
            success: true,
            analysis,
        });
    } catch (error) {
        console.error('Controller Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to analyze resume',
            error: error.message,
        });
    }
};

module.exports = {
    analyzeResume,
};
