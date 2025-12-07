import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { deleteResume, getUserResumes } from '../services/api';
import { toast } from 'react-hot-toast';
import { FileText, Plus, Trash2, Edit, Eye, BarChart2, Briefcase, Search, User } from 'lucide-react';

// UI Components
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import Navbar from '../components/Navbar';

// Animations
import FadeIn from '../components/animations/FadeIn';
import CountUp from '../components/animations/CountUp';
import SlideUp from '../components/animations/SlideUp';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { setResumeData } = useResume();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalResumes: 0,
        avgScore: 0,
        applications: 0
    });
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (user?._id && !hasFetchedRef.current) {
            hasFetchedRef.current = true;
            fetchResumes();
        }
    }, [user?._id]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchResumes = async () => {
        if (!user?._id) {
            console.log('No user ID available');
            setLoading(false);
            return;
        }

        try {
            console.log('Fetching resumes for user:', user._id);
            const response = await getUserResumes(user._id);
            console.log('Fetched resumes:', response.data.length);
            setResumes(response.data);

            setStats({
                totalResumes: response.data.length,
                avgScore: 78,
                applications: 12
            });
        } catch (error) {
            console.error('Error fetching resumes:', error);
            toast.error('Failed to load resumes');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        console.log('Delete clicked for ID:', id);
        setDeleteConfirm({ show: true, id });
    };

    const confirmDelete = async () => {
        const id = deleteConfirm.id;
        setDeleteConfirm({ show: false, id: null });

        try {
            console.log('Calling deleteResume API with ID:', id);
            const response = await deleteResume(id);
            console.log('Delete response:', response);
            setResumes(resumes.filter(r => r._id !== id));
            setStats(prev => ({ ...prev, totalResumes: prev.totalResumes - 1 }));
            toast.success('Resume deleted successfully');
        } catch (error) {
            console.error('Error deleting resume:', error);
            console.error('Error response:', error.response);
            toast.error('Failed to delete resume');
        }
    };

    const cancelDelete = () => {
        setDeleteConfirm({ show: false, id: null });
    };

    const handleEdit = (resume) => {
        setResumeData(resume);
        navigate(`/builder/${resume._id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Welcome & Stats Section */}
                <div className="mb-10">
                    <FadeIn>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
                        <p className="text-slate-500 mb-8">Welcome back! Here's what's happening with your job search.</p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stat Card 1 */}
                        <SlideUp delay={100}>
                            <Card className="flex items-center space-x-4 border-l-4 border-l-primary-500">
                                <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Total Resumes</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        <CountUp n={stats.totalResumes} />
                                    </p>
                                </div>
                            </Card>
                        </SlideUp>

                        {/* Stat Card 2 */}
                        <SlideUp delay={200}>
                            <Card className="flex items-center space-x-4 border-l-4 border-l-success">
                                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                                    <BarChart2 size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Avg. ATS Score</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        <CountUp n={stats.avgScore} />
                                    </p>
                                </div>
                            </Card>
                        </SlideUp>

                        {/* Stat Card 3 */}
                        <SlideUp delay={300}>
                            <Card className="flex items-center space-x-4 border-l-4 border-l-secondary-500">
                                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Job Matches</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        <CountUp n={15} />+
                                    </p>
                                </div>
                            </Card>
                        </SlideUp>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Resumes */}
                    <div className="lg:col-span-2 space-y-6">
                        <FadeIn delay={400} className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">My Resumes</h2>
                            <Link to="/builder">
                                <Button icon={Plus}>Create New</Button>
                            </Link>
                        </FadeIn>

                        {loading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-32 w-full rounded-xl" count={3} />
                            </div>
                        ) : resumes.length === 0 ? (
                            <FadeIn delay={500}>
                                <Card className="p-10 text-center border-dashed border-2 border-slate-200 bg-slate-50/50">
                                    <div className="mx-auto h-12 w-12 text-slate-400 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900">No resumes yet</h3>
                                    <p className="mt-1 text-slate-500 mb-6">Get started by creating your first professional resume.</p>
                                    <Link to="/builder">
                                        <Button variant="primary">Create Resume</Button>
                                    </Link>
                                </Card>
                            </FadeIn>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {resumes.map((resume, index) => (
                                    <SlideUp key={resume._id} delay={index * 100}>
                                        <Card className="group hover:border-primary-200 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-start space-x-4">
                                                    <div className="h-16 w-12 bg-slate-100 rounded border border-slate-200 flex-shrink-0 flex items-center justify-center text-xs text-slate-400 group-hover:bg-white group-hover:shadow-md transition-all">
                                                        PDF
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                                                            {resume.personalInfo?.fullName || 'Untitled Resume'}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                                            Last modified: {new Date(resume.updatedAt).toLocaleDateString()}
                                                        </p>
                                                        <div className="mt-2">
                                                            <Badge variant="success">
                                                                {resume.layoutType || 'Modern'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(resume)}
                                                        className="text-slate-400 hover:text-primary-600"
                                                    >
                                                        <Edit size={18} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(resume._id)}
                                                        className="text-slate-400 hover:text-red-600"
                                                    >
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex space-x-4">
                                                    <Link to="/analysis" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                                                        <BarChart2 size={16} /> Analyze
                                                    </Link>
                                                    <Link to={`/preview/${resume._id}`} className="text-sm font-medium text-slate-600 hover:text-slate-800 flex items-center gap-1">
                                                        <Eye size={16} /> Preview
                                                    </Link>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(resume)}
                                                    className="text-slate-900 hover:text-primary-600"
                                                >
                                                    Continue Editing &rarr;
                                                </Button>
                                            </div>
                                        </Card>
                                    </SlideUp>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Quick Actions & Tips */}
                    <div className="space-y-6">
                        <SlideUp delay={600}>
                            <Card>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link to="/jobs">
                                        <div className="block w-full p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 hover:shadow-md transition-all group cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-teal-600 mr-3 group-hover:scale-110 transition-transform">
                                                        <Briefcase size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">Job Recommendations</p>
                                                        <p className="text-xs text-slate-500">Find matching jobs</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/analysis">
                                        <div className="block w-full p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md transition-all group cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600 mr-3 group-hover:scale-110 transition-transform">
                                                        <Search size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">AI Analysis</p>
                                                        <p className="text-xs text-slate-500">Check ATS score</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Card>
                        </SlideUp>

                        <SlideUp delay={700}>
                            <Card>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Resume Tips</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 h-5 w-5 text-success mr-2">✓</span>
                                        <span className="text-sm text-slate-600">Keep your summary concise (3-4 sentences max).</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 h-5 w-5 text-success mr-2">✓</span>
                                        <span className="text-sm text-slate-600">Use action verbs to describe your experience.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 h-5 w-5 text-success mr-2">✓</span>
                                        <span className="text-sm text-slate-600">Tailor your skills section to the job description.</span>
                                    </li>
                                </ul>
                            </Card>
                        </SlideUp>
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {deleteConfirm.show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <FadeIn>
                        <Card className="max-w-md w-full p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Resume</h3>
                            <p className="text-slate-600 mb-6">Are you sure you want to delete this resume? This action cannot be undone.</p>
                            <div className="flex gap-3 justify-end">
                                <Button variant="ghost" onClick={cancelDelete}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
