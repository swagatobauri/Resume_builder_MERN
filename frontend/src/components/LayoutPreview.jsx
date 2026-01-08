import ModernLayout from './layouts/ModernLayout';
import ClassicLayout from './layouts/ClassicLayout';
import MinimalLayout from './layouts/MinimalLayout';

import { Check } from 'lucide-react';

const sampleData = {
    personalInfo: {
        fullName: 'Rahul',
        email: 'rahul@newtonschool.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
        portfolio: 'johndoe.com',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
    },
    summary: 'Experienced software engineer with 5+ years building scalable web applications.',
    experience: [
        {
            position: 'Senior Software Engineer',
            company: 'Tech Corp',
            duration: '2020 - Present',
            description: 'Led development of cloud-based solutions serving 1M+ users.',
            technologies: 'React, Node.js, AWS',
        },
    ],
    education: [
        {
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            institution: 'Newton School of Technology',
            graduationYear: '2019',
        },
    ],
    skills: {
        technical: ['React', 'Node.js', 'Python', 'AWS'],
        soft: ['Leadership', 'Communication'],
    },
    projects: [
        {
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce solution with payment integration.',
            technologies: 'React, MongoDB, Stripe',
        },
    ],
    certifications: [
        {
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2023',
        },
    ],
};

const layouts = [
    { id: 'modern', name: 'Modern', component: ModernLayout, description: 'Two-column with sidebar' },
    { id: 'classic', name: 'Classic', component: ClassicLayout, description: 'Traditional format' },
    { id: 'minimal', name: 'Minimal', component: MinimalLayout, description: 'Clean & spacious' },

];

const LayoutPreview = ({ selectedLayout, onSelectLayout }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {layouts.map((layout) => {
                const LayoutComponent = layout.component;
                const isSelected = selectedLayout === layout.id;

                return (
                    <div
                        key={layout.id}
                        onClick={() => onSelectLayout(layout.id)}
                        className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${isSelected
                            ? 'ring-4 ring-primary-500 shadow-2xl scale-[1.02]'
                            : 'ring-1 ring-slate-200'
                            }`}
                    >
                        <div className="bg-white p-5 border-b border-slate-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className={`text-lg font-bold ${isSelected ? 'text-primary-700' : 'text-slate-800'}`}>
                                        {layout.name}
                                    </h3>
                                    <p className="text-sm text-slate-500">{layout.description}</p>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-primary-600 text-white scale-100' : 'bg-slate-100 text-slate-300 scale-90'
                                    }`}>
                                    <Check size={16} strokeWidth={3} />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="bg-slate-100 p-4 h-96 overflow-hidden relative">
                            <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300" />
                            <div className="transform scale-[0.25] origin-top-left w-[400%] h-[400%] shadow-sm bg-white">
                                <LayoutComponent resumeData={sampleData} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LayoutPreview;
