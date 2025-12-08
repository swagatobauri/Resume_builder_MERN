const React = require('react');
const { Document, Page, Text, View, StyleSheet, pdf } = require('@react-pdf/renderer');

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottom: '2 solid #2563eb',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 5,
    },
    contactInfo: {
        fontSize: 10,
        color: '#64748b',
        marginBottom: 2,
    },
    section: {
        marginTop: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 8,
        borderBottom: '1 solid #cbd5e1',
        paddingBottom: 4,
    },
    text: {
        marginBottom: 4,
        lineHeight: 1.4,
    },
    bold: {
        fontWeight: 'bold',
    },
    experienceItem: {
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    company: {
        fontSize: 11,
        color: '#475569',
        marginBottom: 2,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillItem: {
        backgroundColor: '#e0e7ff',
        padding: '4 8',
        borderRadius: 4,
        fontSize: 10,
    },
});

// Resume PDF Document Component
const ResumePDF = ({ resumeData }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo?.fullName || 'Your Name'}</Text>
                    {personalInfo?.email && <Text style={styles.contactInfo}>{personalInfo.email}</Text>}
                    {personalInfo?.phone && <Text style={styles.contactInfo}>{personalInfo.phone}</Text>}
                    {personalInfo?.location && <Text style={styles.contactInfo}>{personalInfo.location}</Text>}
                </View>

                {/* Summary */}
                {summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.text}>{summary}</Text>
                    </View>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{exp.position}</Text>
                                <Text style={styles.company}>{exp.company} | {exp.duration}</Text>
                                <Text style={styles.text}>{exp.description}</Text>
                                {exp.technologies && <Text style={styles.text}>Technologies: {exp.technologies}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{edu.degree} in {edu.field}</Text>
                                <Text style={styles.company}>{edu.institution} | {edu.graduationYear}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {skills && (skills.technical?.length > 0 || skills.soft?.length > 0) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {skills.technical && skills.technical.length > 0 && (
                            <View style={{ marginBottom: 8 }}>
                                <Text style={[styles.text, styles.bold]}>Technical:</Text>
                                <Text style={styles.text}>{skills.technical.join(', ')}</Text>
                            </View>
                        )}
                        {skills.soft && skills.soft.length > 0 && (
                            <View>
                                <Text style={[styles.text, styles.bold]}>Soft Skills:</Text>
                                <Text style={styles.text}>{skills.soft.join(', ')}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((project, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{project.name}</Text>
                                <Text style={styles.text}>{project.description}</Text>
                                {project.technologies && <Text style={styles.text}>Technologies: {project.technologies}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {certifications.map((cert, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{cert.name}</Text>
                                <Text style={styles.company}>{cert.issuer} | {cert.date}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};

// Generate PDF Buffer
const generateResumePDF = async (resumeData, layoutType = 'modern') => {
    try {
        console.log('Generating PDF with @react-pdf/renderer...');

        const doc = <ResumePDF resumeData={resumeData} />;
        const pdfBuffer = await pdf(doc).toBuffer();

        console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');
        return pdfBuffer;
    } catch (error) {
        console.error('=== PDF Generation Error ===');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('===========================');

        throw new Error(`PDF generation failed: ${error.message}`);
    }
};

module.exports = {
    generateResumePDF
};
