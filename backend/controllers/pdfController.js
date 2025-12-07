const Resume = require('../models/Resume');
const { generateResumePDF } = require('../services/pdfService');

// @desc    Download resume as PDF
// @route   GET /api/pdf/download/:resumeId
// @access  Private
const downloadResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.resumeId);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Authorization check
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to download this resume' });
        }

        // Generate PDF
        const pdfBuffer = await generateResumePDF(resume, resume.layoutType);

        // Set headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${resume.personalInfo.fullName || 'Resume'}_Resume.pdf"`
        );
        res.setHeader('Content-Length', pdfBuffer.length);

        // Send PDF
        res.send(pdfBuffer);
    } catch (error) {
        console.error('PDF generation error:', error);
        res.status(500).json({
            message: 'Failed to generate PDF',
            error: error.message,
        });
    }
};

module.exports = {
    downloadResume,
};
