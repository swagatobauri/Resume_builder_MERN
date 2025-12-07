import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, FolderGit2, Globe, Github, Code } from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';
import AnimateList from '../animations/AnimateList';

const Projects = () => {
    const { resumeData, updateResumeData } = useResume();
    const [projects, setProjects] = useState(
        resumeData.projects.length > 0
            ? resumeData.projects
            : [{ name: '', description: '', technologies: '', link: '', github: '' }]
    );

    useEffect(() => {
        updateResumeData('projects', projects);
    }, [projects]);

    const addProject = () => {
        setProjects([
            ...projects,
            { name: '', description: '', technologies: '', link: '', github: '' },
        ]);
    };

    const removeProject = (index) => {
        if (projects.length > 1) {
            setProjects(projects.filter((_, i) => i !== index));
        }
    };

    const updateProject = (index, field, value) => {
        const updated = projects.map((proj, i) =>
            i === index ? { ...proj, [field]: value } : proj
        );
        setProjects(updated);
    };

    return (
        <div className="space-y-8">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Projects</h2>
                <p className="text-slate-500">Showcase your best projects and side work</p>
            </FadeIn>

            <AnimateList className="space-y-6">
                {projects.map((project, index) => (
                    <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                                    <FolderGit2 size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Project #{index + 1}</h3>
                            </div>
                            {projects.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeProject(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    icon={Trash2}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <Input
                                label="Project Name"
                                value={project.name}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                placeholder="E-commerce Platform"
                                required
                            />

                            <TextArea
                                label="Description"
                                value={project.description}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                rows={3}
                                placeholder="Built a full-stack e-commerce platform with payment integration..."
                                required
                            />

                            <Input
                                label="Technologies Used"
                                value={project.technologies}
                                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                                placeholder="React, Node.js, Stripe, MongoDB"
                                icon={Code}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Live Link"
                                    value={project.link}
                                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                                    placeholder="https://myproject.com"
                                    icon={Globe}
                                />

                                <Input
                                    label="GitHub Repository"
                                    value={project.github}
                                    onChange={(e) => updateProject(index, 'github', e.target.value)}
                                    placeholder="https://github.com/username/project"
                                    icon={Github}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </AnimateList>

            <FadeIn delay={200}>
                <Button
                    onClick={addProject}
                    variant="secondary"
                    className="w-full border-dashed border-2 border-slate-300 hover:border-primary-500 hover:text-primary-600 py-4"
                    icon={Plus}
                >
                    Add Another Project
                </Button>
            </FadeIn>
        </div>
    );
};

export default Projects;
