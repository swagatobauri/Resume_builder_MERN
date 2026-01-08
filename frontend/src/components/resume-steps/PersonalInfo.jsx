import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useGitHubAutoFill } from '../../hooks/useGitHubAutoFill';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Wand2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';

const PersonalInfo = () => {
    const { resumeData, updateResumeData } = useResume();
    const [formData, setFormData] = useState(resumeData.personalInfo);
    const [errors, setErrors] = useState({});
    const [githubUsername, setGithubUsername] = useState('');
    const { fetchGitHubData, loading, error, success } = useGitHubAutoFill();

    useEffect(() => {
        updateResumeData('personalInfo', formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleGitHubAutoFill = async () => {
        const data = await fetchGitHubData(githubUsername);
        if (data) {
            setFormData((prev) => ({
                ...prev,
                fullName: data.personalInfo.fullName || prev.fullName,
                location: data.personalInfo.location || prev.location,
                portfolio: data.personalInfo.portfolio || prev.portfolio,
                github: data.personalInfo.github || prev.github,
            }));

            if (data.summary) updateResumeData('summary', data.summary);
            if (data.projects?.length > 0) updateResumeData('projects', data.projects);
            if (data.skills?.technical?.length > 0) {
                updateResumeData('skills', {
                    technical: data.skills.technical,
                    soft: resumeData.skills.soft,
                });
            }
        }
    };

    return (
        <div className="space-y-8">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Information</h2>
                <p className="text-slate-500">Let's start with your basic contact details</p>
            </FadeIn>

            {/* GitHub Auto-fill Section */}
            <FadeIn delay={100}>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <Wand2 className="text-primary-600" size={20} />
                        <h3 className="text-lg font-semibold text-slate-900">Quick Fill from GitHub</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        Enter your GitHub username to automatically populate your profile, projects, and skills
                    </p>
                    <div className="flex gap-3 items-start">
                        <Input
                            placeholder="GitHub username (e.g., rahul)"
                            value={githubUsername}
                            onChange={(e) => setGithubUsername(e.target.value)}
                            disabled={loading}
                            className="flex-1"
                            icon={Github}
                        />
                        <Button
                            onClick={handleGitHubAutoFill}
                            disabled={loading || !githubUsername.trim()}
                            loading={loading}
                            variant="primary"
                        >
                            Auto-fill
                        </Button>
                    </div>
                    {error && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-fade-in">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 text-sm animate-fade-in">
                            {success}
                        </div>
                    )}
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Rahul"
                    error={errors.fullName}
                    icon={User}
                    required
                    className="md:col-span-2"
                />

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@newtonschool.com"
                    error={errors.email}
                    icon={Mail}
                    required
                />

                <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    error={errors.phone}
                    icon={Phone}
                    required
                />

                <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Bangalore, Karnataka"
                    error={errors.location}
                    icon={MapPin}
                    required
                    className="md:col-span-2"
                />

                <Input
                    label="Portfolio Website"
                    name="portfolio"
                    type="url"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    icon={Globe}
                />

                <Input
                    label="LinkedIn Profile"
                    name="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/rahul"
                    icon={Linkedin}
                />

                <Input
                    label="GitHub Profile"
                    name="github"
                    type="url"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/rahul"
                    icon={Github}
                    className="md:col-span-2"
                />
            </div>
        </div>
    );
};

export default PersonalInfo;
