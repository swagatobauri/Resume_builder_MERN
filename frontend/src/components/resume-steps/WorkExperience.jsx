import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Briefcase, Calendar, MapPin } from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';
import AnimateList from '../animations/AnimateList';

const WorkExperience = () => {
    const { resumeData, updateResumeData } = useResume();
    const [experiences, setExperiences] = useState(
        resumeData.experience.length > 0
            ? resumeData.experience
            : [{ company: '', position: '', duration: '', description: '', technologies: '' }]
    );

    useEffect(() => {
        updateResumeData('experience', experiences);
    }, [experiences]);

    const addExperience = () => {
        setExperiences([
            ...experiences,
            { company: '', position: '', duration: '', description: '', technologies: '' },
        ]);
    };

    const removeExperience = (index) => {
        if (experiences.length > 1) {
            setExperiences(experiences.filter((_, i) => i !== index));
        }
    };

    const updateExperience = (index, field, value) => {
        const updated = experiences.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        );
        setExperiences(updated);
    };

    return (
        <div className="space-y-8">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Work Experience</h2>
                <p className="text-slate-500">Add your professional work history</p>
            </FadeIn>

            <AnimateList className="space-y-6">
                {experiences.map((exp, index) => (
                    <Card key={index} className="border border-slate-200 shadow-sm transition-all duration-300">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                                    <Briefcase size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Experience #{index + 1}</h3>
                            </div>
                            {experiences.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    icon={Trash2}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Company Name"
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                placeholder="Newton School"
                                required
                            />

                            <Input
                                label="Position / Title"
                                value={exp.position}
                                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                placeholder="Software Developer"
                                required
                            />

                            <Input
                                label="Duration"
                                value={exp.duration}
                                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                placeholder="Jan 2020 - Present"
                                icon={Calendar}
                                required
                                className="md:col-span-2"
                            />

                            <TextArea
                                label="Description"
                                value={exp.description}
                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                rows={4}
                                placeholder="• Led a team of 5 engineers to develop...&#10;• Improved system performance by 20%...&#10;• Collaborated with product managers..."
                                required
                                className="md:col-span-2"
                            />

                            <Input
                                label="Technologies Used"
                                value={exp.technologies}
                                onChange={(e) => updateExperience(index, 'technologies', e.target.value)}
                                placeholder="React, Node.js, MongoDB, AWS"
                                className="md:col-span-2"
                            />
                        </div>
                    </Card>
                ))}
            </AnimateList>

            <FadeIn delay={200}>
                <Button
                    onClick={addExperience}
                    variant="secondary"
                    className="w-full border-dashed border-2 border-slate-300 py-4"
                    icon={Plus}
                >
                    Add Another Experience
                </Button>
            </FadeIn>
        </div>
    );
};

export default WorkExperience;
