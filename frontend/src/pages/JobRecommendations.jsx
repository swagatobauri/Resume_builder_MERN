import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Briefcase, MapPin, Building2, ExternalLink, DollarSign, Sparkles } from 'lucide-react';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import FadeIn from '../components/animations/FadeIn';
import AnimateList from '../components/animations/AnimateList';
import Navbar from '../components/Navbar';

const JobRecommendations = () => {
    const { user } = useAuth();
    const { resumeData } = useResume();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, remote, onsite

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5001/api/jobs/recommendations',
                { resumeData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.success) {
                setJobs(response.data.jobs);
            }
        } catch (err) {
            console.error('Failed to fetch jobs:', err);
            toast.error('Failed to load job recommendations. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter(job => {
        if (filter === 'all') return true;
        if (filter === 'remote') return job.location.toLowerCase().includes('remote');
        if (filter === 'onsite') return !job.location.toLowerCase().includes('remote');
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <FadeIn className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-3">
                            Recommended Jobs for You
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600">
                            AI-curated opportunities based on your resume profile.
                        </p>
                    </FadeIn>

                    {/* Filters */}
                    <FadeIn delay={100} className="flex justify-center mb-10 space-x-4">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            onClick={() => setFilter('all')}
                            className="rounded-full"
                        >
                            All Jobs
                        </Button>
                        <Button
                            variant={filter === 'remote' ? 'primary' : 'outline'}
                            onClick={() => setFilter('remote')}
                            className="rounded-full"
                        >
                            Remote Only
                        </Button>
                        <Button
                            variant={filter === 'onsite' ? 'primary' : 'outline'}
                            onClick={() => setFilter('onsite')}
                            className="rounded-full"
                        >
                            On-site / Hybrid
                        </Button>
                    </FadeIn>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <Card key={n} className="h-64 flex flex-col justify-between">
                                    <div>
                                        <Skeleton className="h-6 w-3/4 mb-4" />
                                        <Skeleton className="h-4 w-1/2 mb-6" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-3 w-full" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 w-full mt-4 rounded-lg" />
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <AnimateList className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredJobs.map((job) => (
                                <Card key={job.id} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border-slate-200">
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-1">{job.title}</h3>
                                                <div className="flex items-center text-primary-600 font-medium">
                                                    <Building2 size={14} className="mr-1.5" />
                                                    {job.company}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 border-2 border-green-100 text-green-600 font-bold text-sm shadow-sm">
                                                    {job.match_score}%
                                                </div>
                                                <span className="text-[10px] text-green-600 font-medium mt-1">Match</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-slate-500 text-sm mb-4 bg-slate-50 py-2 px-3 rounded-lg">
                                            <MapPin size={14} className="mr-1.5 text-slate-400" />
                                            {job.location}
                                        </div>

                                        <div className="mb-5">
                                            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{job.description}</p>
                                        </div>

                                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 mb-4">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <Sparkles size={14} className="text-indigo-600" />
                                                <p className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">Why it matches</p>
                                            </div>
                                            <p className="text-sm text-indigo-700 leading-snug">{job.match_reason}</p>
                                        </div>

                                        {job.salary_min && (
                                            <div className="flex items-center text-sm text-slate-700 font-medium mb-4">
                                                <DollarSign size={16} className="text-green-600 mr-1" />
                                                ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 mt-auto border-t border-slate-100">
                                        <a
                                            href={job.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full"
                                        >
                                            <Button className="w-full justify-center group" icon={ExternalLink}>
                                                Apply Now
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            ))}
                        </AnimateList>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobRecommendations;
