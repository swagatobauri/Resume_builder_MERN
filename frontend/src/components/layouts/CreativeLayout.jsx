const CreativeLayout = ({ resumeData }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

    return (
        <div className="bg-white w-full max-w-[8.5in] mx-auto shadow-2xl print:shadow-none">
            {/* Creative Header */}
            <div className="relative">
                <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 h-32 print:bg-blue-600" />
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
                    <div className="bg-white mx-8 p-6 rounded-2xl shadow-xl">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                            {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
                            {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
                            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 pt-20">
                {/* Summary */}
                {summary && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                                💡
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed ml-13">{summary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-xl">
                                💼
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
                        </div>
                        {experience.map((exp, idx) => (
                            <div key={idx} className="ml-13 mb-6 relative pl-6 border-l-4 border-purple-300">
                                <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full" />
                                <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                                <p className="text-purple-600 font-semibold">
                                    {exp.company} • {exp.duration}
                                </p>
                                <p className="text-gray-700 mt-2">{exp.description}</p>
                                {exp.technologies && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {exp.technologies.split(',').map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                                            >
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">
                                🎓
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                        </div>
                        {education.map((edu, idx) => (
                            <div key={idx} className="ml-13 mb-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {edu.degree} in {edu.field}
                                </h3>
                                <p className="text-green-600 font-semibold">
                                    {edu.institution} • {edu.graduationYear}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xl">
                                ⚡
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
                        </div>
                        <div className="ml-13 grid grid-cols-2 gap-4">
                            {skills.technical.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Technical</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.technical.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm"
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
                                                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                                🚀
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                        </div>
                        {projects.map((proj, idx) => (
                            <div key={idx} className="ml-13 mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <h3 className="text-lg font-bold text-gray-800">{proj.name}</h3>
                                <p className="text-gray-700 mt-1">{proj.description}</p>
                                {proj.technologies && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {proj.technologies.split(',').map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-indigo-200 text-indigo-700 rounded text-xs"
                                            >
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-xl">
                                🏆
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
                        </div>
                        {certifications.map((cert, idx) => (
                            <div key={idx} className="ml-13 mb-3">
                                <p className="font-semibold text-gray-800">{cert.name}</p>
                                <p className="text-sm text-gray-600">
                                    {cert.issuer} • {cert.date}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreativeLayout;
