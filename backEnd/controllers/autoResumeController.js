const { getGitHubData } = require('../utils/scrapeGithub');
const { scrapePortfolio } = require('../utils/scrapePortfolio');
const { generateResumeContent } = require('../utils/aiGenerator');

const autoResumeController = {
  generateResume: async (req, res) => {
    try {
      const { githubUrl, portfolioUrl } = req.body;

      if (!githubUrl) {
        return res.status(400).json({ 
          success: false, 
          message: 'GitHub URL is required' 
        });
      }

      // Fetch data from GitHub
      const githubData = await getGitHubData(githubUrl);
      
      // Scrape portfolio if URL is provided
      const portfolioData = portfolioUrl 
        ? await scrapePortfolio(portfolioUrl) 
        : { projects: [] };

      // Generate resume content using AI
      const resumeContent = await generateResumeContent(githubData, portfolioData);

      res.json({
        success: true,
        data: {
          ...resumeContent,
          source: {
            github: githubUrl,
            portfolio: portfolioUrl || null
          },
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Error in generateResume:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate resume',
        ...(process.env.NODE_ENV === 'development' && { error: error.stack })
      });
    }
  }
};

module.exports = autoResumeController;