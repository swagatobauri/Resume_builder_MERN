const axios = require('axios');

const GITHUB_API = 'https://api.github.com';

const extractUsernameFromUrl = (url) => {
  if (!url) return null;
  try {
    // Handle different GitHub URL formats
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(part => part);
    return pathParts[0];
  } catch (error) {
    // If URL parsing fails, try to extract username directly
    const match = url.match(/github\.com\/([^/]+)/i);
    return match ? match[1] : null;
  }
};

const fetchUserRepos = async (username) => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error.message);
    if (error.response?.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
      throw new Error('GitHub API rate limit exceeded. Please add a GITHUB_TOKEN to your environment variables.');
    }
    throw new Error('Failed to fetch GitHub repositories');
  }
};

const processRepos = (repos) => {
  // Filter out forks and sort by star count
  const processed = repos
    .filter(repo => !repo.fork) // Exclude forked repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
    .slice(0, 5) // Take top 5
    .map(repo => ({
      name: repo.name,
      description: repo.description || 'No description',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || 'Unknown',
      url: repo.html_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      topics: repo.topics || []
    }));

  // Extract unique languages and topics
  const languages = [...new Set(
    repos
      .map(repo => repo.language)
      .filter(Boolean)
      .concat(
        ...repos
          .map(repo => repo.topics || [])
          .flat()
      )
  )];

  return {
    username: repos[0]?.owner?.login,
    userProfile: repos[0]?.owner?.html_url,
    topRepos: processed,
    languages,
    totalRepos: repos.length,
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  };
};

const getGitHubData = async (githubUrl) => {
  try {
    const username = extractUsernameFromUrl(githubUrl);
    if (!username) {
      throw new Error('Invalid GitHub URL');
    }
    
    const repos = await fetchUserRepos(username);
    if (!repos || repos.length === 0) {
      throw new Error('No repositories found for this user');
    }
    
    return processRepos(repos);
  } catch (error) {
    console.error('Error in getGitHubData:', error.message);
    throw error;
  }
};

module.exports = { getGitHubData };