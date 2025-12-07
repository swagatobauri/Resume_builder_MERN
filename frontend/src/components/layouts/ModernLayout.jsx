const ModernLayout = ({ resumeData }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

    return (
        <div className="bg-white w-full max-w-[8.5in] mx-auto shadow-2xl print:shadow-none">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 print:bg-indigo-700">
                <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap gap-4 text-sm">
                    {personalInfo.email && <span>📧 {personalInfo.email}</span>}
                    {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
                    {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                </div>
                {(personalInfo.portfolio || personalInfo.linkedin || personalInfo.github) && (
                    <div className="flex flex-wrap gap-4 text-sm mt-2">
                        {personalInfo.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
                        {personalInfo.linkedin && <span>💼 LinkedIn</span>}
                        {personalInfo.github && <span>💻 GitHub</span>}
                    </div>
                )}
            </div>

            <div className="flex print:flex-row">
                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 bg-gray-50 p-6 print:bg-gray-100">
                    {/* Skills */}
                    {(skills.technical.length > 0 || skills.soft.length > 0) && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">
                                SKILLS
                            </h2>
                            {skills.technical.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-700 mb-2">Technical</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.technical.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {skills.soft.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Soft Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.soft.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">
                                CERTIFICATIONS
                            </h2>
                            {certifications.map((cert, idx) => (
                                <div key={idx} className="mb-3">
                                    <p className="font-semibold text-gray-800">{cert.name}</p>
                                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                                    <p className="text-xs text-gray-500">{cert.date}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Content */}
                <div className="w-full md:w-2/3 p-6">
                    {/* Summary */}
                    {summary && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">
                                PROFESSIONAL SUMMARY
                            </h2>
                            <p className="text-gray-700 leading-relaxed">{summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">
                                WORK EXPERIENCE
                            </h2>
                            {experience.map((exp, idx) => (
                                <div key={idx} className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                                    <p className="text-indigo-600 font-semibold">
                                        {exp.company} | {exp.duration}
                                    </p>
                                    <p className="text-gray-700 mt-2">{exp.description}</p>
                                    {exp.technologies && (
                                        <p className="text-sm text-gray-600 mt-1">
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
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">
                                EDUCATION
                            </h2>
                            {education.map((edu, idx) => (
                                <div key={idx} className="mb-3">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {edu.degree} in {edu.field}
                                    </h3>
                                    <p className="text-indigo-600 font-semibold">
                                        {edu.institution} | {edu.graduationYear}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Projects */}
                    {projects && projects.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-600 pb-1">
                                PROJECTS
                            </h2>
                            {projects.map((proj, idx) => (
                                <div key={idx} className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">{proj.name}</h3>
                                    <p className="text-gray-700 mt-1">{proj.description}</p>
                                    {proj.technologies && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            <span className="font-semibold">Technologies:</span> {proj.technologies}
                                        </p>
                                    )}
                                    {(proj.link || proj.github) && (
                                        <p className="text-sm text-indigo-600 mt-1">
                                            {proj.link && <span>🔗 Live Demo</span>}
                                            {proj.github && <span className="ml-3">💻 GitHub</span>}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernLayout;
