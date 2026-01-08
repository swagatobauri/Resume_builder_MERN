import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Award, Calendar, Building2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';
import AnimateList from '../animations/AnimateList';

const Certifications = () => {
    const { resumeData, updateResumeData } = useResume();
    const [certifications, setCertifications] = useState(
        resumeData.certifications.length > 0
            ? resumeData.certifications
            : [{ name: '', issuer: '', date: '' }]
    );

    useEffect(() => {
        updateResumeData('certifications', certifications);
    }, [certifications]);

    const addCertification = () => {
        setCertifications([...certifications, { name: '', issuer: '', date: '' }]);
    };

    const removeCertification = (index) => {
        if (certifications.length > 1) {
            setCertifications(certifications.filter((_, i) => i !== index));
        }
    };

    const updateCertification = (index, field, value) => {
        const updated = certifications.map((cert, i) =>
            i === index ? { ...cert, [field]: value } : cert
        );
        setCertifications(updated);
    };

    return (
        <div className="space-y-8">
            <FadeIn className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Certifications</h2>
                <p className="text-slate-500">Add your professional certifications (optional)</p>
            </FadeIn>

            <FadeIn delay={100}>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
                    <span className="text-xl">ℹ️</span>
                    <p className="text-sm text-amber-800 pt-0.5">
                        This step is optional. You can skip it if you don't have any certifications to add.
                    </p>
                </div>
            </FadeIn>

            <AnimateList className="space-y-6">
                {certifications.map((cert, index) => (
                    <Card key={index} className="border border-slate-200 shadow-sm transition-all duration-300">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                                    <Award size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800">Certification #{index + 1}</h3>
                            </div>
                            {certifications.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCertification(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    icon={Trash2}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Certification Name"
                                value={cert.name}
                                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                placeholder="AWS Certified Solutions Architect"
                                className="md:col-span-2"
                            />

                            <Input
                                label="Issuing Organization"
                                value={cert.issuer}
                                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                placeholder="Amazon Web Services"
                                icon={Building2}
                            />

                            <Input
                                label="Date Obtained"
                                value={cert.date}
                                onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                placeholder="January 2023"
                                icon={Calendar}
                            />
                        </div>
                    </Card>
                ))}
            </AnimateList>

            <FadeIn delay={200}>
                <Button
                    onClick={addCertification}
                    variant="secondary"
                    className="w-full border-dashed border-2 border-slate-300 py-4"
                    icon={Plus}
                >
                    Add Another Certification
                </Button>
            </FadeIn>
        </div>
    );
};

export default Certifications;
