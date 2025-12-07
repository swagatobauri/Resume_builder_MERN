const { enhanceWithGitHub } = require('../services/githubService');

// @desc    Enhance profile with GitHub data
// @route   POST /api/profiles/enhance
// @access  Private
const enhanceProfile = async (req, res) => {
    try {
        const { githubUsername, linkedinUrl } = req.body;

        if (!githubUsername) {
            return res.status(400).json({ message: 'GitHub username is required' });
        }

        // Fetch and parse GitHub data
        const githubData = await enhanceWithGitHub(githubUsername);

        // Note about LinkedIn
        const linkedinNote = linkedinUrl
            ? 'LinkedIn URL saved. Please manually input LinkedIn data as direct API access is limited.'
            : 'No LinkedIn URL provided.';

        res.json({
            success: true,
            data: githubData,
            linkedinNote,
            linkedinUrl: linkedinUrl || null,
        });
    } catch (error) {
        console.error('Profile enhancement error:', error);

        // Handle specific error messages
        if (error.message.includes('rate limit')) {
            return res.status(429).json({ message: error.message });
        }
        if (error.message.includes('not found')) {
            return res.status(404).json({ message: error.message });
        }

        res.status(500).json({
            message: error.message || 'Failed to enhance profile',
        });
    }
};

module.exports = {
    enhanceProfile,
};
