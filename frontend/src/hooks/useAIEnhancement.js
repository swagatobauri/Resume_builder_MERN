import { useState } from 'react';
import api from '../services/api';

export const useAIEnhancement = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [enhancedContent, setEnhancedContent] = useState('');
    const [tokensUsed, setTokensUsed] = useState(0);

    const enhanceContent = async (section, content, context = {}) => {
        setLoading(true);
        setError('');
        setEnhancedContent('');

        try {
            const response = await api.post('/ai/enhance-resume', {
                section,
                content,
                context,
            });

            setEnhancedContent(response.data.enhancedContent);
            setTokensUsed(response.data.tokensUsed);
            setLoading(false);

            return {
                success: true,
                content: response.data.enhancedContent,
                tokensUsed: response.data.tokensUsed,
            };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to enhance content';
            setError(errorMessage);
            setLoading(false);

            // Clear error after 5 seconds
            setTimeout(() => setError(''), 5000);

            return {
                success: false,
                message: errorMessage,
            };
        }
    };

    const clearEnhanced = () => {
        setEnhancedContent('');
        setError('');
        setTokensUsed(0);
    };

    return {
        enhanceContent,
        clearEnhanced,
        loading,
        error,
        enhancedContent,
        tokensUsed,
    };
};
