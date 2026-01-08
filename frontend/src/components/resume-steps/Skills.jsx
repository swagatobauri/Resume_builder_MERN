import { useState, useEffect, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X, Plus, Lightbulb, Code2, Users } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Input from '../ui/Input';
import FadeIn from '../animations/FadeIn';

const Skills = () => {
    const { resumeData, updateResumeData } = useResume();
    const [skills, setSkills] = useState(resumeData.skills);
    const [technicalInput, setTechnicalInput] = useState('');
    const [softInput, setSoftInput] = useState('');
    const [techParent] = useAutoAnimate();
    const [softParent] = useAutoAnimate();

    useEffect(() => {
        updateResumeData('skills', skills);
    }, [skills]);

    const addTechnicalSkill = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && technicalInput.trim()) {
            e.preventDefault();
            if (!skills.technical.includes(technicalInput.trim())) {
                setSkills({
                    ...skills,
                    technical: [...skills.technical, technicalInput.trim()],
                });
            }
            setTechnicalInput('');
        }
    };

    const addSoftSkill = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && softInput.trim()) {
            e.preventDefault();
            if (!skills.soft.includes(softInput.trim())) {
                setSkills({
                    ...skills,
                    soft: [...skills.soft, softInput.trim()],
                });
            }
            setSoftInput('');
        }
    };

    const removeTechnicalSkill = (skillToRemove) => {
        setSkills({
            ...skills,
            technical: skills.technical.filter((skill) => skill !== skillToRemove),
        });
    };

    const removeSoftSkill = (skillToRemove) => {
        setSkills({
            ...skills,
            soft: skills.soft.filter((skill) => skill !== skillToRemove),
        });
    };

    return (
        <div className="space-y-8">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Skills</h2>
                <p className="text-slate-500">Add your technical and soft skills</p>
            </FadeIn>

            {/* Technical Skills */}
            <FadeIn delay={100} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                        <Code2 size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Technical Skills</h3>
                </div>

                <div className="relative">
                    <Input
                        value={technicalInput}
                        onChange={(e) => setTechnicalInput(e.target.value)}
                        onKeyDown={addTechnicalSkill}
                        placeholder="Type a skill and press Enter (e.g., React, Python, AWS)"
                        className="pr-12"
                    />
                    <button
                        onClick={addTechnicalSkill}
                        className="absolute right-3 top-[38px] p-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                <div ref={techParent} className="flex flex-wrap gap-2 min-h-[40px]">
                    {skills.technical.map((skill, index) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-medium shadow-sm transition-all duration-200"
                        >
                            {skill}
                            <button
                                onClick={() => removeTechnicalSkill(skill)}
                                className="hover:bg-blue-50 rounded-md p-0.5 text-blue-400 hover:text-blue-600 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                    {skills.technical.length === 0 && (
                        <p className="text-slate-400 text-sm italic py-2">No technical skills added yet</p>
                    )}
                </div>
            </FadeIn>

            <div className="border-t border-slate-100 my-6" />

            {/* Soft Skills */}
            <FadeIn delay={200} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pink-50 p-2 rounded-lg text-pink-600">
                        <Users size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Soft Skills</h3>
                </div>

                <div className="relative">
                    <Input
                        value={softInput}
                        onChange={(e) => setSoftInput(e.target.value)}
                        onKeyDown={addSoftSkill}
                        placeholder="Type a skill and press Enter (e.g., Leadership, Communication)"
                        className="pr-12"
                    />
                    <button
                        onClick={addSoftSkill}
                        className="absolute right-3 top-[38px] p-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                <div ref={softParent} className="flex flex-wrap gap-2 min-h-[40px]">
                    {skills.soft.map((skill, index) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-pink-200 text-pink-700 rounded-lg text-sm font-medium shadow-sm transition-all duration-200"
                        >
                            {skill}
                            <button
                                onClick={() => removeSoftSkill(skill)}
                                className="hover:bg-pink-50 rounded-md p-0.5 text-pink-400 hover:text-pink-600 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                    {skills.soft.length === 0 && (
                        <p className="text-slate-400 text-sm italic py-2">No soft skills added yet</p>
                    )}
                </div>
            </FadeIn>

            <FadeIn delay={300}>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-8">
                    <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="text-amber-500" size={20} />
                        <h3 className="font-semibold text-slate-900">Skill Tips</h3>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-2 pl-1">
                        <li className="flex items-start gap-2">
                            <span className="text-primary-400">•</span>
                            <strong>Technical Skills:</strong> Programming languages, frameworks, tools, technologies
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-400">•</span>
                            <strong>Soft Skills:</strong> Leadership, communication, problem-solving, teamwork
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-400">•</span>
                            Add at least 5-10 technical skills to showcase your expertise
                        </li>
                    </ul>
                </div>
            </FadeIn>
        </div>
    );
};

export default Skills;
