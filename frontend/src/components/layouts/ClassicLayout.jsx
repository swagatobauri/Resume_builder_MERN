const ClassicLayout = ({ resumeData }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

    return (
        <div className="bg-white w-full max-w-[8.5in] mx-auto shadow-2xl p-12 print:shadow-none font-serif">
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div className="text-sm space-x-3">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
                {(personalInfo.portfolio || personalInfo.linkedin || personalInfo.github) && (
                    <div className="text-sm mt-1 space-x-3">
                        {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                        {personalInfo.linkedin && <span>• LinkedIn</span>}
                        {personalInfo.github && <span>• GitHub</span>}
                    </div>
                )}
            </div>

            {/* Summary */}
            {summary && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold uppercase mb-2 border-b border-gray-400">
                        Professional Summary
                    </h2>
                    <p className="text-gray-800 leading-relaxed text-justify">{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold uppercase mb-2 border-b border-gray-400">
                        Work Experience
                    </h2>
                    {experience.map((exp, idx) => (
                        <div key={idx} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold">{exp.position}</h3>
                                <span className="text-sm italic">{exp.duration}</span>
                            </div>
                            <p className="italic mb-1">{exp.company}</p>
                            <p className="text-gray-800">{exp.description}</p>
                            {exp.technologies && (
                                <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-semibold">Technologies:</span> {exp.technologies}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold uppercase mb-2 border-b border-gray-400">
                        Education
                    </h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold">
                                    {edu.degree} in {edu.field}
                                </h3>
                                <span className="text-sm italic">{edu.graduationYear}</span>
                            </div>
                            <p className="italic">{edu.institution}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {(skills.technical.length > 0 || skills.soft.length > 0) && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold uppercase mb-2 border-b border-gray-400">
                        Skills
                    </h2>
                    {skills.technical.length > 0 && (
                        <p className="mb-2">
                            <span className="font-bold">Technical:</span> {skills.technical.join(', ')}
                        </p>
                    )}
                    {skills.soft.length > 0 && (
                        <p>
                            <span className="font-bold">Soft Skills:</span> {skills.soft.join(', ')}
                        </p>
                    )}
                </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold uppercase mb-2 border-b border-gray-400">
                        Projects
                    </h2>
                    {projects.map((proj, idx) => (
                        <div key={idx} className="mb-3">
                            <h3 className="text-lg font-bold">{proj.name}</h3>
                            <p className="text-gray-800">{proj.description}</p>
                            {proj.technologies && (
                                <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-semibold">Technologies:</span> {proj.technologies}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold uppercase mb-2 border-b border-gray-400">
                        Certifications
                    </h2>
                    {certifications.map((cert, idx) => (
                        <p key={idx} className="mb-1">
                            {cert.name} - {cert.issuer} ({cert.date})
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClassicLayout;
