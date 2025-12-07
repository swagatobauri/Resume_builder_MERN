const MinimalLayout = ({ resumeData }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

    return (
        <div className="bg-white w-full max-w-[8.5in] mx-auto shadow-2xl p-16 print:shadow-none">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-5xl font-light tracking-wide mb-4">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
                {(personalInfo.portfolio || personalInfo.linkedin || personalInfo.github) && (
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-2">
                        {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                        {personalInfo.linkedin && <span>LinkedIn</span>}
                        {personalInfo.github && <span>GitHub</span>}
                    </div>
                )}
            </div>

            {/* Summary */}
            {summary && (
                <div className="mb-12">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                        About
                    </h2>
                    <p className="text-gray-700 leading-loose">{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
                        Experience
                    </h2>
                    {experience.map((exp, idx) => (
                        <div key={idx} className="mb-8">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-xl font-light">{exp.position}</h3>
                                <span className="text-sm text-gray-500">{exp.duration}</span>
                            </div>
                            <p className="text-gray-600 mb-3">{exp.company}</p>
                            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                            {exp.technologies && (
                                <p className="text-sm text-gray-500 mt-2">{exp.technologies}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
                        Education
                    </h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-6">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xl font-light">
                                    {edu.degree} in {edu.field}
                                </h3>
                                <span className="text-sm text-gray-500">{edu.graduationYear}</span>
                            </div>
                            <p className="text-gray-600">{edu.institution}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {(skills.technical.length > 0 || skills.soft.length > 0) && (
                <div className="mb-12">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
                        Skills
                    </h2>
                    {skills.technical.length > 0 && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">Technical</p>
                            <p className="text-gray-700">{skills.technical.join(' • ')}</p>
                        </div>
                    )}
                    {skills.soft.length > 0 && (
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Soft Skills</p>
                            <p className="text-gray-700">{skills.soft.join(' • ')}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
                        Projects
                    </h2>
                    {projects.map((proj, idx) => (
                        <div key={idx} className="mb-6">
                            <h3 className="text-xl font-light mb-2">{proj.name}</h3>
                            <p className="text-gray-700 leading-relaxed">{proj.description}</p>
                            {proj.technologies && (
                                <p className="text-sm text-gray-500 mt-2">{proj.technologies}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
                        Certifications
                    </h2>
                    {certifications.map((cert, idx) => (
                        <div key={idx} className="mb-3">
                            <p className="text-gray-700">{cert.name}</p>
                            <p className="text-sm text-gray-500">
                                {cert.issuer} • {cert.date}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MinimalLayout;
