const PDFDocument = require('pdfkit');

// Generate Resume PDF using PDFKit
const generateResumePDF = async (resumeData, layoutType = 'modern') => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Generating PDF with PDFKit...');

            const doc = new PDFDocument({
                size: 'A4',
                margins: { top: 50, bottom: 50, left: 50, right: 50 }
            });

            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');
                resolve(pdfBuffer);
            });
            doc.on('error', reject);

            const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

            // Header
            doc.fontSize(24).fillColor('#1e40af').text(personalInfo?.fullName || 'Your Name', { align: 'left' });
            doc.moveDown(0.5);

            if (personalInfo?.email || personalInfo?.phone || personalInfo?.location) {
                doc.fontSize(10).fillColor('#64748b');
                const contactInfo = [
                    personalInfo?.email,
                    personalInfo?.phone,
                    personalInfo?.location
                ].filter(Boolean).join(' | ');
                doc.text(contactInfo);
            }

            doc.moveDown(1);
            doc.strokeColor('#2563eb').lineWidth(2).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
            doc.moveDown(1);

            // Summary
            if (summary) {
                doc.fontSize(14).fillColor('#1e40af').text('Professional Summary', { underline: true });
                doc.moveDown(0.5);
                doc.fontSize(11).fillColor('#000000').text(summary, { align: 'justify' });
                doc.moveDown(1);
            }

            // Experience
            if (experience && experience.length > 0) {
                doc.fontSize(14).fillColor('#1e40af').text('Experience', { underline: true });
                doc.moveDown(0.5);

                experience.forEach((exp, index) => {
                    doc.fontSize(12).fillColor('#000000').text(exp.position, { continued: false });
                    doc.fontSize(11).fillColor('#475569').text(`${exp.company} | ${exp.duration}`);
                    doc.moveDown(0.3);
                    doc.fontSize(10).fillColor('#000000').text(exp.description, { align: 'justify' });
                    if (exp.technologies) {
                        doc.fontSize(10).fillColor('#64748b').text(`Technologies: ${exp.technologies}`);
                    }
                    if (index < experience.length - 1) doc.moveDown(0.8);
                });
                doc.moveDown(1);
            }

            // Education
            if (education && education.length > 0) {
                doc.fontSize(14).fillColor('#1e40af').text('Education', { underline: true });
                doc.moveDown(0.5);

                education.forEach((edu, index) => {
                    doc.fontSize(12).fillColor('#000000').text(`${edu.degree} in ${edu.field}`);
                    doc.fontSize(11).fillColor('#475569').text(`${edu.institution} | ${edu.graduationYear}`);
                    if (index < education.length - 1) doc.moveDown(0.5);
                });
                doc.moveDown(1);
            }

            // Skills
            if (skills && (skills.technical?.length > 0 || skills.soft?.length > 0)) {
                doc.fontSize(14).fillColor('#1e40af').text('Skills', { underline: true });
                doc.moveDown(0.5);

                if (skills.technical && skills.technical.length > 0) {
                    doc.fontSize(11).fillColor('#000000').text('Technical: ', { continued: true });
                    doc.fontSize(10).fillColor('#475569').text(skills.technical.join(', '));
                    doc.moveDown(0.3);
                }

                if (skills.soft && skills.soft.length > 0) {
                    doc.fontSize(11).fillColor('#000000').text('Soft Skills: ', { continued: true });
                    doc.fontSize(10).fillColor('#475569').text(skills.soft.join(', '));
                }
                doc.moveDown(1);
            }

            // Projects
            if (projects && projects.length > 0) {
                doc.fontSize(14).fillColor('#1e40af').text('Projects', { underline: true });
                doc.moveDown(0.5);

                projects.forEach((project, index) => {
                    doc.fontSize(12).fillColor('#000000').text(project.name);
                    doc.fontSize(10).fillColor('#475569').text(project.description, { align: 'justify' });
                    if (project.technologies) {
                        doc.fontSize(10).fillColor('#64748b').text(`Technologies: ${project.technologies}`);
                    }
                    if (index < projects.length - 1) doc.moveDown(0.5);
                });
                doc.moveDown(1);
            }

            // Certifications
            if (certifications && certifications.length > 0) {
                doc.fontSize(14).fillColor('#1e40af').text('Certifications', { underline: true });
                doc.moveDown(0.5);

                certifications.forEach((cert, index) => {
                    doc.fontSize(12).fillColor('#000000').text(cert.name);
                    doc.fontSize(11).fillColor('#475569').text(`${cert.issuer} | ${cert.date}`);
                    if (index < certifications.length - 1) doc.moveDown(0.5);
                });
            }

            doc.end();

        } catch (error) {
            console.error('=== PDF Generation Error ===');
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            console.error('===========================');
            reject(new Error(`PDF generation failed: ${error.message}`));
        }
    });
};

module.exports = {
    generateResumePDF
};
