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

// Create Resume PDF Document
const createResumePDF = (resumeData) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

    const sections = [];

    // Header
    sections.push(
        React.createElement(View, { style: styles.header },
            React.createElement(Text, { style: styles.name }, personalInfo?.fullName || 'Your Name'),
            personalInfo?.email && React.createElement(Text, { style: styles.contactInfo }, personalInfo.email),
            personalInfo?.phone && React.createElement(Text, { style: styles.contactInfo }, personalInfo.phone),
            personalInfo?.location && React.createElement(Text, { style: styles.contactInfo }, personalInfo.location)
        )
    );

    // Summary
    if (summary) {
        sections.push(
            React.createElement(View, { style: styles.section },
                React.createElement(Text, { style: styles.sectionTitle }, 'Professional Summary'),
                React.createElement(Text, { style: styles.text }, summary)
            )
        );
    }

    // Experience
    if (experience && experience.length > 0) {
        const expItems = experience.map((exp, index) =>
            React.createElement(View, { key: index, style: styles.experienceItem },
                React.createElement(Text, { style: styles.jobTitle }, exp.position),
                React.createElement(Text, { style: styles.company }, `${exp.company} | ${exp.duration}`),
                React.createElement(Text, { style: styles.text }, exp.description),
                exp.technologies && React.createElement(Text, { style: styles.text }, `Technologies: ${exp.technologies}`)
            )
        );
        sections.push(
            React.createElement(View, { style: styles.section },
                React.createElement(Text, { style: styles.sectionTitle }, 'Experience'),
                ...expItems
            )
        );
    }

    // Education
    if (education && education.length > 0) {
        const eduItems = education.map((edu, index) =>
            React.createElement(View, { key: index, style: styles.experienceItem },
                React.createElement(Text, { style: styles.jobTitle }, `${edu.degree} in ${edu.field}`),
                React.createElement(Text, { style: styles.company }, `${edu.institution} | ${edu.graduationYear}`)
            )
        );
        sections.push(
            React.createElement(View, { style: styles.section },
                React.createElement(Text, { style: styles.sectionTitle }, 'Education'),
                ...eduItems
            )
        );
    }

    // Skills
    if (skills && (skills.technical?.length > 0 || skills.soft?.length > 0)) {
        const skillsContent = [];
        if (skills.technical && skills.technical.length > 0) {
            skillsContent.push(
                React.createElement(View, { style: { marginBottom: 8 } },
                    React.createElement(Text, { style: [styles.text, styles.bold] }, 'Technical:'),
                    React.createElement(Text, { style: styles.text }, skills.technical.join(', '))
                )
            );
        }
        if (skills.soft && skills.soft.length > 0) {
            skillsContent.push(
                React.createElement(View, {},
                    React.createElement(Text, { style: [styles.text, styles.bold] }, 'Soft Skills:'),
                    React.createElement(Text, { style: styles.text }, skills.soft.join(', '))
                )
            );
        }
        sections.push(
            React.createElement(View, { style: styles.section },
                React.createElement(Text, { style: styles.sectionTitle }, 'Skills'),
                ...skillsContent
            )
        );
    }

    return React.createElement(Document, {},
        React.createElement(Page, { size: 'A4', style: styles.page }, ...sections)
    );
};

// Generate PDF Buffer
const generateResumePDF = async (resumeData, layoutType = 'modern') => {
    try {
        console.log('Generating PDF with @react-pdf/renderer...');

        const doc = createResumePDF(resumeData);
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
