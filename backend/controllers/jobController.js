const jobService = require('../services/jobService');

const getRecommendations = async (req, res) => {
    try {
        const { resumeData } = req.body;

        // Allow fetching without resume data (use defaults) if user just wants to browse
        const jobs = await jobService.searchJobs(resumeData || {});

        res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        console.error('Job Controller Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job recommendations',
            error: error.message,
        });
    }
};

module.exports = {
    getRecommendations,
};
