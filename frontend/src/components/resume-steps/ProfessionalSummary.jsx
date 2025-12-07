import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Lightbulb } from 'lucide-react';
import TextArea from '../ui/TextArea';
import FadeIn from '../animations/FadeIn';

const ProfessionalSummary = () => {
    const { resumeData, updateResumeData } = useResume();
    const [summary, setSummary] = useState(resumeData.summary);
    const maxLength = 500;

    useEffect(() => {
        updateResumeData('summary', summary);
    }, [summary]);

    return (
        <div className="space-y-6">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Professional Summary</h2>
                <p className="text-slate-500">Write a brief summary about yourself and your career goals</p>
            </FadeIn>

            <FadeIn delay={100}>
                <div className="relative">
                    <TextArea
                        label={<span>Summary <span className="text-red-500">*</span></span>}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={8}
                        maxLength={maxLength}
                        placeholder="Experienced software engineer with 5+ years of expertise in full-stack development..."
                        required
                    />
                    <div className="flex justify-between text-sm mt-2 px-1">
                        <p className="text-slate-500">
                            Write a compelling summary that highlights your key strengths
                        </p>
                        <p className={`${summary.length > maxLength * 0.9 ? 'text-amber-500' : 'text-slate-400'}`}>
                            {summary.length}/{maxLength}
                        </p>
                    </div>
                </div>
            </FadeIn>

            <FadeIn delay={200}>
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="text-primary-600" size={20} />
                        <h3 className="font-semibold text-slate-900">Tips for a great summary</h3>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-2 pl-1">
                        <li className="flex items-start gap-2">
                            <span className="text-primary-400">•</span>
                            Keep it concise and focused (2-4 sentences)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-400">•</span>
                            Highlight your most relevant skills and experience
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-400">•</span>
                            Mention your career goals or what you're looking for
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-400">•</span>
                            Use action words and quantify achievements when possible
                        </li>
                    </ul>
                </div>
            </FadeIn>
        </div>
    );
};

export default ProfessionalSummary;
