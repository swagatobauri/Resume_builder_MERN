import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { LayoutTemplate, CheckCircle2 } from 'lucide-react';
import LayoutPreview from '../LayoutPreview';
import FadeIn from '../animations/FadeIn';

const LayoutSelection = () => {
    const { resumeData, updateResumeData } = useResume();
    const [selectedLayout, setSelectedLayout] = useState(resumeData.layoutType || 'modern');

    useEffect(() => {
        updateResumeData('layoutType', selectedLayout);
    }, [selectedLayout]);

    const handleSelectLayout = (layoutId) => {
        setSelectedLayout(layoutId);
    };

    return (
        <div className="space-y-8">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Layout</h2>
                <p className="text-slate-500">Select a design that best represents your professional style</p>
            </FadeIn>

            <FadeIn delay={100}>
                <LayoutPreview selectedLayout={selectedLayout} onSelectLayout={handleSelectLayout} />
            </FadeIn>

            <FadeIn delay={200}>
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mt-8">
                    <div className="flex items-center gap-2 mb-3">
                        <LayoutTemplate className="text-primary-600" size={20} />
                        <h3 className="font-semibold text-primary-900">Layout Guide</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary-500 mt-0.5" size={16} />
                            <div>
                                <strong className="text-primary-800 text-sm">Modern</strong>
                                <p className="text-xs text-primary-600">Clean and contemporary. Great for tech and startups.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary-500 mt-0.5" size={16} />
                            <div>
                                <strong className="text-primary-800 text-sm">Classic</strong>
                                <p className="text-xs text-primary-600">Traditional and professional. Perfect for corporate roles.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="text-primary-500 mt-0.5" size={16} />
                            <div>
                                <strong className="text-primary-800 text-sm">Minimal</strong>
                                <p className="text-xs text-primary-600">Simple and elegant. Ideal for design and UX roles.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </FadeIn>
        </div>
    );
};

export default LayoutSelection;
