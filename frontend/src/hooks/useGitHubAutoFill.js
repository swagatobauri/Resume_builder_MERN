import { useState } from 'react';
import api from '../services/api';

export const useGitHubAutoFill = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchGitHubData = async (githubUsername) => {
        if (!githubUsername || !githubUsername.trim()) {
            setError('Please enter a GitHub username');
            return null;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/profiles/enhance', {
                githubUsername: githubUsername.trim(),
            });

            setSuccess('Successfully fetched data from GitHub!');
            setLoading(false);

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);

            return response.data.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch GitHub data';
            setError(errorMessage);
            setLoading(false);

            // Clear error message after 5 seconds
            setTimeout(() => setError(''), 5000);

            return null;
        }
    };

    return {
        fetchGitHubData,
        loading,
        error,
        success,
    };
};
