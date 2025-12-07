import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import axios from 'axios';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';
import { Brain, CheckCircle2, AlertTriangle, Key, FileText, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import FadeIn from '../components/animations/FadeIn';
import AnimateList from '../components/animations/AnimateList';
import Navbar from '../components/Navbar';

const ResumeAnalysis = () => {
    const { user } = useAuth();
    const { resumeData } = useResume();
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5001/api/ai/analyze-resume',
                { resumeContent: resumeData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                setAnalysis(response.data.analysis);
            }
        } catch (err) {
            console.error('Analysis failed:', err);
            setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#4F46E5', '#E2E8F0']; // Primary-600, Slate-200

    const scoreData = analysis ? [
        { name: 'Score', value: analysis.score },
        { name: 'Remaining', value: 100 - analysis.score }
    ] : [];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <FadeIn className="text-center">
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-3">
                            AI Resume Analysis
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600">
                            Get instant feedback on your resume's ATS compatibility and content quality.
                        </p>
                    </FadeIn>

                    {!analysis && !loading && (
                        <FadeIn delay={100} className="flex justify-center">
                            <Button
                                onClick={handleAnalyze}
                                size="lg"
                                className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                icon={Brain}
                            >
                                Analyze My Resume
                            </Button>
                        </FadeIn>
                    )}

                    {loading && (
                        <FadeIn className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-6"></div>
                            <p className="text-lg text-slate-600 animate-pulse font-medium">Analyzing your resume with AI...</p>
                        </FadeIn>
                    )}

                    {error && (
                        <FadeIn className="rounded-xl bg-red-50 p-4 mx-auto max-w-2xl border border-red-100">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertTriangle className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Analysis Error</h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {analysis && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Score Card */}
                            <FadeIn delay={200} className="lg:col-span-1">
                                <Card className="h-full flex flex-col items-center justify-center p-8 border-slate-200 shadow-lg">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">ATS Score</h2>
                                    <div className="h-64 w-full relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={scoreData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    startAngle={90}
                                                    endAngle={-270}
                                                >
                                                    {scoreData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="text-5xl font-bold text-primary-600">{analysis.score}</span>
                                            <span className="text-sm text-slate-400 font-medium">/ 100</span>
                                        </div>
                                    </div>
                                    <p className="text-center text-slate-600 mt-6 font-medium px-4">
                                        {analysis.score >= 80 ? 'Excellent! Your resume is well-optimized.' :
                                            analysis.score >= 60 ? 'Good start, but needs some improvements.' :
                                                'Needs significant optimization.'}
                                    </p>
                                </Card>
                            </FadeIn>

                            {/* Details Grid */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Strengths */}
                                <FadeIn delay={300}>
                                    <Card className="border-l-4 border-l-green-500 shadow-md">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                            <div className="bg-green-100 p-2 rounded-lg mr-3 text-green-600">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            Key Strengths
                                        </h3>
                                        <AnimateList className="space-y-3">
                                            {analysis.strengths.map((item, index) => (
                                                <li key={index} className="flex items-start bg-green-50/50 p-3 rounded-lg">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{item}</span>
                                                </li>
                                            ))}
                                        </AnimateList>
                                    </Card>
                                </FadeIn>

                                {/* Improvements */}
                                <FadeIn delay={400}>
                                    <Card className="border-l-4 border-l-amber-500 shadow-md">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                            <div className="bg-amber-100 p-2 rounded-lg mr-3 text-amber-600">
                                                <AlertTriangle size={20} />
                                            </div>
                                            Areas for Improvement
                                        </h3>
                                        <AnimateList className="space-y-3">
                                            {analysis.improvements.map((item, index) => (
                                                <li key={index} className="flex items-start bg-amber-50/50 p-3 rounded-lg">
                                                    <ArrowRight className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{item}</span>
                                                </li>
                                            ))}
                                        </AnimateList>
                                    </Card>
                                </FadeIn>

                                {/* Missing Keywords */}
                                <FadeIn delay={500}>
                                    <Card className="border-l-4 border-l-primary-500 shadow-md">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                            <div className="bg-primary-100 p-2 rounded-lg mr-3 text-primary-600">
                                                <Key size={20} />
                                            </div>
                                            Missing Keywords
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.keywords.map((keyword, index) => (
                                                <Badge key={index} variant="primary" className="px-3 py-1.5 text-sm">
                                                    {keyword}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>
                                </FadeIn>

                                {/* Formatting Feedback */}
                                <FadeIn delay={600}>
                                    <Card className="border-l-4 border-l-purple-500 shadow-md">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                            <div className="bg-purple-100 p-2 rounded-lg mr-3 text-purple-600">
                                                <FileText size={20} />
                                            </div>
                                            Formatting Feedback
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed bg-purple-50/30 p-4 rounded-xl">
                                            {analysis.formatting}
                                        </p>
                                    </Card>
                                </FadeIn>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalysis;
