const axios = require('axios');
const cheerio = require('cheerio');

const scrapePortfolio = async (url) => {
  if (!url) return { projects: [] };

  try {
    // Fetch the portfolio website
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'ResumeBuilder/1.0 (https://your-resume-builder.com; contact@example.com)'
      }
    });

    const $ = cheerio.load(response.data);
    const projects = [];

    // Common selectors for portfolio projects
    // This is a best-effort approach as portfolio sites vary widely
    $('article, .project, .portfolio-item, [class*="project"], [id*="project"]').each((i, el) => {
      const $el = $(el);
      
      // Try to extract project information
      const title = $el.find('h2, h3, .project-title, .portfolio-title, [class*="title"]').first().text().trim();
      const description = $el.find('p, .project-desc, .portfolio-desc, [class*="description"]').first().text().trim();
      
      // Extract technologies - look for tags, badges, or tech lists
      const technologies = [];
      $el.find('.tech, .technologies, .tags, .badge, [class*="tech"], [class*="tag"]').each((i, techEl) => {
        const tech = $(techEl).text().trim();
        if (tech && !technologies.includes(tech)) {
          technologies.push(tech);
        }
      });

      // Extract URL if available
      let projectUrl = $el.find('a').attr('href');
      if (projectUrl && !projectUrl.startsWith('http')) {
        try {
          projectUrl = new URL(projectUrl, url).toString();
        } catch (e) {
          projectUrl = null;
        }
      }

      if (title || description || technologies.length > 0) {
        projects.push({
          title: title || 'Untitled Project',
          description: description || 'No description available',
          technologies,
          url: projectUrl || ''
        });
      }
    });

    return { projects: projects.slice(0, 5) }; // Return top 5 projects max
  } catch (error) {
    console.error('Error scraping portfolio:', error.message);
    // Return empty projects array if scraping fails
    return { projects: [] };
  }
};

module.exports = { scrapePortfolio };