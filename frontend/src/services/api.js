import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getResumeById = (id) => {
    return api.get(`/resumes/single/${id}`);
};

export const getUserResumes = (userId) => {
    return api.get(`/resumes/${userId}`);
};

export const updateResume = (id, data) => {
    return api.put(`/resumes/${id}`, data);
};

export const deleteResume = (id) => {
    return api.delete(`/resumes/${id}`);
};

export const downloadPDF = (data) => {
    return api.post('/resumes/generate-pdf', data, {
        responseType: 'blob', // Important for handling binary data
    });
};

export default api;
