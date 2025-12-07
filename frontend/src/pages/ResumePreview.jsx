import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Printer, Download, LayoutTemplate, Loader2 } from 'lucide-react';
import ModernLayout from '../components/layouts/ModernLayout';
import ClassicLayout from '../components/layouts/ClassicLayout';
import MinimalLayout from '../components/layouts/MinimalLayout';

import { downloadPDF, getResumeById } from '../services/api';
import Button from '../components/ui/Button';
import FadeIn from '../components/animations/FadeIn';

const ResumePreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [resumeData, setResumeData] = useState(null);
    const [selectedLayout, setSelectedLayout] = useState('modern');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            if (location.state?.resumeData) {
                setResumeData(location.state.resumeData);
                if (location.state.layoutType) {
                    setSelectedLayout(location.state.layoutType);
                }
            } else if (id) {
                try {
                    setLoading(true);
                    const response = await getResumeById(id);
                    setResumeData(response.data);
                } catch (err) {
                    console.error(err);
                    setError('Failed to load resume data.');
                } finally {
                    setLoading(false);
                }
            } else {
                navigate('/dashboard');
            }
        };

        fetchResume();
    }, [id, location.state, navigate]);

    const handleDownload = async () => {
        try {
            setLoading(true);
            setError(null);

            const payload = id ? { resumeId: id, layoutType: selectedLayout } : { resumeData, layoutType: selectedLayout };
            const response = await downloadPDF(payload);

            // Create a Blob from the response data with the correct MIME type
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume-${selectedLayout}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url); // Clean up the URL object
        } catch (err) {
            console.error(err);
            setError('Failed to generate PDF. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const renderLayout = () => {
        switch (selectedLayout) {
            case 'modern': return <ModernLayout resumeData={resumeData} />;
            case 'classic': return <ClassicLayout resumeData={resumeData} />;
            case 'minimal': return <MinimalLayout resumeData={resumeData} />;

            default: return <ModernLayout resumeData={resumeData} />;
        }
    };

    if (!resumeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-primary-600" size={40} />
                    <p className="text-slate-500 font-medium">Loading preview...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Toolbar - Hidden in Print */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 mb-8 print:hidden sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            icon={ArrowLeft}
                            className="text-slate-600 hover:text-slate-900"
                        >
                            Back to Editor
                        </Button>
                        <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
                        <h1 className="text-xl font-bold text-slate-800 hidden md:block">Resume Preview</h1>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-lg border border-slate-200">
                            <LayoutTemplate size={18} className="text-slate-400 ml-2" />
                            <select
                                value={selectedLayout}
                                onChange={(e) => setSelectedLayout(e.target.value)}
                                className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 cursor-pointer py-1 pr-8"
                            >
                                <option value="modern">Modern Layout</option>
                                <option value="classic">Classic Layout</option>
                                <option value="minimal">Minimal Layout</option>

                            </select>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                onClick={handlePrint}
                                icon={Printer}
                            >
                                Print
                            </Button>

                            <Button
                                variant="primary"
                                onClick={handleDownload}
                                loading={loading}
                                icon={Download}
                            >
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
                {error && (
                    <FadeIn>
                        <div className="max-w-7xl mx-auto mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    </FadeIn>
                )}
            </div>

            {/* Resume Content */}
            <div className="flex justify-center print:block print:w-full px-4 md:px-0">
                <div className="print:w-full w-full max-w-[210mm] bg-white shadow-2xl print:shadow-none">
                    {renderLayout()}
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
