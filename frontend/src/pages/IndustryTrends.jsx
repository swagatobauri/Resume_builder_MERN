import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import { TrendingUp, Users, Briefcase, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import FadeIn from '../components/animations/FadeIn';
import SlideUp from '../components/animations/SlideUp';
import Navbar from '../components/Navbar';

const IndustryTrends = () => {
    // Mock Data
    const salaryData = [
        { year: '2020', software: 95000, marketing: 65000, design: 70000 },
        { year: '2021', software: 105000, marketing: 68000, design: 75000 },
        { year: '2022', software: 115000, marketing: 72000, design: 82000 },
        { year: '2023', software: 120000, marketing: 75000, design: 85000 },
        { year: '2024', software: 125000, marketing: 78000, design: 88000 },
    ];

    const demandData = [
        { role: 'Full Stack Dev', demand: 85 },
        { role: 'Data Scientist', demand: 92 },
        { role: 'Product Manager', demand: 78 },
        { role: 'UX Designer', demand: 75 },
        { role: 'DevOps', demand: 88 },
    ];

    const trendingSkills = [
        { name: 'React', growth: '+15%', type: 'up' },
        { name: 'TypeScript', growth: '+22%', type: 'up' },
        { name: 'AI/ML', growth: '+45%', type: 'up' },
        { name: 'Kubernetes', growth: '+12%', type: 'up' },
        { name: 'jQuery', growth: '-10%', type: 'down' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <FadeIn className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-3">
                            Industry Trends
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600">
                            Stay ahead of the curve with real-time insights into the job market.
                        </p>
                    </FadeIn>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SlideUp delay={100}>
                            <Card className="border-l-4 border-l-primary-500">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                        <Briefcase size={24} />
                                    </div>
                                    <Badge variant="success" className="flex items-center gap-1">
                                        <ArrowUpRight size={14} /> +12%
                                    </Badge>
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Tech Job Openings</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-1">142,050</h3>
                            </Card>
                        </SlideUp>

                        <SlideUp delay={200}>
                            <Card className="border-l-4 border-l-emerald-500">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                                        <TrendingUp size={24} />
                                    </div>
                                    <Badge variant="success" className="flex items-center gap-1">
                                        <ArrowUpRight size={14} /> +5.2%
                                    </Badge>
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Avg. Salary Growth</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-1">$125k</h3>
                            </Card>
                        </SlideUp>

                        <SlideUp delay={300}>
                            <Card className="border-l-4 border-l-purple-500">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                                        <Users size={24} />
                                    </div>
                                    <Badge variant="warning" className="flex items-center gap-1">
                                        <ArrowDownRight size={14} /> -2%
                                    </Badge>
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Remote Roles</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-1">45%</h3>
                            </Card>
                        </SlideUp>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Salary Trends */}
                        <FadeIn delay={400}>
                            <Card className="h-full">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Salary Trends (Last 5 Years)</h3>
                                <div className="h-80 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={salaryData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value) => [`$${value.toLocaleString()}`, '']}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="software" name="Software Eng." stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }} />
                                            <Line type="monotone" dataKey="marketing" name="Marketing" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} />
                                            <Line type="monotone" dataKey="design" name="Design" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </FadeIn>

                        {/* High Demand Roles */}
                        <FadeIn delay={500}>
                            <Card className="h-full">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">High Demand Roles</h3>
                                <div className="h-80 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={demandData} layout="vertical" margin={{ left: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="role" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={100} />
                                            <Tooltip
                                                cursor={{ fill: '#F1F5F9' }}
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Bar dataKey="demand" name="Demand Score" fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </FadeIn>
                    </div>

                    {/* Trending Skills */}
                    <FadeIn delay={600}>
                        <Card>
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Trending Skills</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {trendingSkills.map((skill, index) => (
                                    <div key={index} className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                                        <span className="font-medium text-slate-700">{skill.name}</span>
                                        <Badge variant={skill.type === 'up' ? 'success' : 'danger'} className="text-xs">
                                            {skill.growth}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default IndustryTrends;
