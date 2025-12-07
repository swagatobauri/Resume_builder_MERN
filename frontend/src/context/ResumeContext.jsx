import { createContext, useState, useContext } from 'react';
import api from '../services/api';
import { updateResume } from '../services/api';

const ResumeContext = createContext();

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within ResumeProvider');
    }
    return context;
};

export const ResumeProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            portfolio: '',
            linkedin: '',
            github: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: {
            technical: [],
            soft: [],
        },
        projects: [],
        certifications: [],
        layoutType: 'modern',
    });

    const updateResumeData = (section, data) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: data,
        }));
    };

    const saveDraft = async () => {
        try {
            let response;
            if (resumeData._id) {
                // Update existing resume
                response = await updateResume(resumeData._id, resumeData);
            } else {
                // Create new resume
                response = await api.post('/resumes', resumeData);
                // Update the resumeData with the new _id
                setResumeData(response.data);
            }
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Failed to save draft:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to save draft',
            };
        }
    };

    const saveResume = async () => {
        try {
            let response;
            if (resumeData._id) {
                // Update existing resume
                response = await updateResume(resumeData._id, resumeData);
            } else {
                // Create new resume
                response = await api.post('/resumes', resumeData);
                // Update the resumeData with the new _id
                setResumeData(response.data);
            }
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Failed to save resume:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to save resume',
            };
        }
    };

    const nextStep = () => {
        if (currentStep < 7) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const goToStep = (step) => {
        if (step >= 0 && step <= 7) {
            setCurrentStep(step);
        }
    };

    const value = {
        currentStep,
        resumeData,
        setResumeData,
        updateResumeData,
        saveDraft,
        saveResume,
        nextStep,
        prevStep,
        goToStep,
    };

    return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};
