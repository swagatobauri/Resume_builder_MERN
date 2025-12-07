import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ChevronRight, ChevronLeft, Save, Eye, Check, User, Briefcase, GraduationCap, Code, FolderGit2, Award, LayoutTemplate, FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { getResumeById } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import FadeIn from '../components/animations/FadeIn';
import SlideUp from '../components/animations/SlideUp';
import Navbar from '../components/Navbar';

// Step Components
import PersonalInfo from '../components/resume-steps/PersonalInfo';
import ProfessionalSummary from '../components/resume-steps/ProfessionalSummary';
import WorkExperience from '../components/resume-steps/WorkExperience';
import Education from '../components/resume-steps/Education';
import Skills from '../components/resume-steps/Skills';
import Projects from '../components/resume-steps/Projects';
import Certifications from '../components/resume-steps/Certifications';
import LayoutSelection from '../components/resume-steps/LayoutSelection';

const ResumeBuilder = () => {
    const { currentStep, nextStep, prevStep, saveDraft, saveResume, resumeData, setResumeData } = useResume();
    const navigate = useNavigate();
    const { id } = useParams();
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const fetchResume = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const response = await getResumeById(id);
                    setResumeData(response.data);
                } catch (error) {
                    console.error('Error fetching resume:', error);
                    toast.error('Failed to load resume');
                    navigate('/dashboard');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchResume();
    }, [id, setResumeData, navigate]);

    const steps = [
        { id: 'personal', name: 'Personal Info', icon: <User size={18} /> },
        { id: 'summary', name: 'Summary', icon: <FileText size={18} /> },
        { id: 'experience', name: 'Experience', icon: <Briefcase size={18} /> },
        { id: 'education', name: 'Education', icon: <GraduationCap size={18} /> },
        { id: 'skills', name: 'Skills', icon: <Code size={18} /> },
        { id: 'projects', name: 'Projects', icon: <FolderGit2 size={18} /> },
        { id: 'certifications', name: 'Certifications', icon: <Award size={18} /> },
        { id: 'layout', name: 'Select Layout', icon: <LayoutTemplate size={18} /> },
    ];

    const handleSaveDraft = async () => {
        setSaving(true);
        const result = await saveDraft();
        setSaving(false);
        if (result.success) {
            toast.success('Draft saved successfully');
        } else {
            toast.error(result.message);
        }
    };

    const handleSubmit = async () => {
        setSaving(true);
        const result = await saveResume();
        setSaving(false);
        if (result.success) {
            toast.success('Resume saved successfully!');
            navigate(`/preview/${result.data._id}`);
        } else {
            toast.error(result.message);
        }
    };

    const handlePreview = async () => {
        // Save first then preview
        setSaving(true);
        const result = await saveDraft();
        setSaving(false);
        if (result.success) {
            navigate(`/preview`);
        } else {
            toast.error('Please save your progress before previewing');
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <PersonalInfo />;
            case 1:
                return <ProfessionalSummary />;
            case 2:
                return <WorkExperience />;
            case 3:
                return <Education />;
            case 4:
                return <Skills />;
            case 5:
                return <Projects />;
            case 6:
                return <Certifications />;
            case 7:
                return <LayoutSelection />;
            default:
                return <PersonalInfo />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <FadeIn className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Build Your Resume</h1>
                        <p className="text-slate-500">Create a professional resume in minutes</p>
                    </FadeIn>

                    {/* Stepper */}
                    <SlideUp delay={100} className="mb-8">
                        <Card className="p-6">
                            <div className="flex items-center justify-between relative">
                                {/* Progress Bar Background */}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-100 -z-10" />

                                {/* Active Progress Bar */}
                                <div
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary-500 transition-all duration-500 -z-10"
                                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                                />

                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex flex-col items-center bg-white px-2">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${currentStep === index
                                                ? 'bg-primary-500 border-primary-500 text-white scale-110 shadow-lg'
                                                : currentStep > index
                                                    ? 'bg-success border-success text-white'
                                                    : 'bg-white border-slate-200 text-slate-400'
                                                }`}
                                        >
                                            {currentStep > index ? <Check size={18} /> : step.icon}
                                        </div>
                                        <span
                                            className={`text-xs mt-2 font-medium transition-colors duration-300 ${currentStep === index ? 'text-primary-600' : 'text-slate-400'
                                                }`}
                                        >
                                            {step.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </SlideUp>

                    {/* Form Content */}
                    <SlideUp delay={200} className="mb-8">
                        <Card className="p-8 min-h-[400px]">
                            {renderStep()}
                        </Card>
                    </SlideUp>

                    {/* Navigation */}
                    <SlideUp delay={300} className="flex justify-between items-center sticky bottom-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200/50 z-40">
                        <Button
                            variant="secondary"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            icon={ChevronLeft}
                        >
                            Previous
                        </Button>

                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                onClick={handleSaveDraft}
                                loading={saving}
                                icon={Save}
                            >
                                Save Draft
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={handlePreview}
                                icon={Eye}
                            >
                                Preview
                            </Button>

                            {currentStep < steps.length - 1 ? (
                                <Button
                                    variant="primary"
                                    onClick={nextStep}
                                    icon={ChevronRight}
                                >
                                    Next Step
                                </Button>
                            ) : (
                                <Button
                                    variant="success"
                                    onClick={handleSubmit}
                                    loading={saving}
                                    icon={Check}
                                >
                                    Submit Resume
                                </Button>
                            )}
                        </div>
                    </SlideUp>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
