const axios = require('axios');

const GITHUB_API_BASE = 'https://api.github.com';

// Fetch GitHub user profile
const fetchGitHubProfile = async (username) => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error('GitHub user not found');
        }
        if (error.response?.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch GitHub profile');
    }
};

// Fetch GitHub user repositories
const fetchGitHubRepos = async (username) => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
            params: {
                sort: 'updated',
                per_page: 10,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch GitHub repositories');
    }
};

// Extract languages from repositories
const extractLanguages = (repos) => {
    const languages = new Set();
    repos.forEach((repo) => {
        if (repo.language) {
            languages.add(repo.language);
        }
    });
    return Array.from(languages);
};

// Parse GitHub data into resume format
const parseGitHubData = (profile, repos) => {
    // Extract top repositories (exclude forks, sort by stars)
    const topRepos = repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map((repo) => ({
            name: repo.name,
            description: repo.description || 'No description provided',
            technologies: repo.language ? [repo.language] : [],
            link: repo.html_url,
            github: repo.html_url,
        }));

    // Extract languages/skills
    const languages = extractLanguages(repos);

    // Build resume data
    return {
        personalInfo: {
            fullName: profile.name || profile.login,
            location: profile.location || '',
            portfolio: profile.blog || '',
            github: profile.html_url,
        },
        summary: profile.bio || '',
        projects: topRepos,
        skills: {
            technical: languages,
        },
        githubStats: {
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
        },
    };
};

// Main function to enhance profile with GitHub data
const enhanceWithGitHub = async (username) => {
    try {
        const profile = await fetchGitHubProfile(username);
        const repos = await fetchGitHubRepos(username);
        const parsedData = parseGitHubData(profile, repos);
        return parsedData;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    enhanceWithGitHub,
    fetchGitHubProfile,
    fetchGitHubRepos,
    parseGitHubData,
};
