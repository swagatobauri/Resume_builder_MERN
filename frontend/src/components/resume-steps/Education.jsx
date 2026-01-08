import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';
import AnimateList from '../animations/AnimateList';

const Education = () => {
    const { resumeData, updateResumeData } = useResume();
    const [educationList, setEducationList] = useState(
        resumeData.education.length > 0
            ? resumeData.education
            : [{ institution: '', degree: '', field: '', graduationYear: '' }]
    );

    useEffect(() => {
        updateResumeData('education', educationList);
    }, [educationList]);

    const addEducation = () => {
        setEducationList([
            ...educationList,
            { institution: '', degree: '', field: '', graduationYear: '' },
        ]);
    };

    const removeEducation = (index) => {
        if (educationList.length > 1) {
            setEducationList(educationList.filter((_, i) => i !== index));
        }
    };

    const updateEducation = (index, field, value) => {
        const updated = educationList.map((edu, i) =>
            i === index ? { ...edu, [field]: value } : edu
        );
        setEducationList(updated);
    };

    return (
        <div className="space-y-8">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Education</h2>
                <p className="text-slate-500">Add your educational background</p>
            </FadeIn>

            <AnimateList className="space-y-6">
                {educationList.map((edu, index) => (
                    <Card key={index} className="border border-slate-200 shadow-sm transition-all duration-300">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                                    <GraduationCap size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Education #{index + 1}</h3>
                            </div>
                            {educationList.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    icon={Trash2}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Institution"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                placeholder="Newton School of Technology"
                                required
                                className="md:col-span-2"
                            />

                            <Input
                                label="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                placeholder="Bachelor of Science"
                                icon={GraduationCap}
                                required
                            />

                            <Input
                                label="Field of Study"
                                value={edu.field}
                                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                placeholder="Computer Science"
                                icon={BookOpen}
                                required
                            />

                            <Input
                                label="Graduation Year"
                                value={edu.graduationYear}
                                onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                                placeholder="2020"
                                icon={Calendar}
                                required
                                className="md:col-span-2"
                            />
                        </div>
                    </Card>
                ))}
            </AnimateList>

            <FadeIn delay={200}>
                <Button
                    onClick={addEducation}
                    variant="secondary"
                    className="w-full border-dashed border-2 border-slate-300 py-4"
                    icon={Plus}
                >
                    Add Another Education
                </Button>
            </FadeIn>
        </div>
    );
};

export default Education;
