const Resume = require('../models/Resume');
const { generateResumePDF } = require('../services/pdfService');

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    try {
        const {
            personalInfo,
            summary,
            experience,
            education,
            skills,
            projects,
            certifications,
            layoutType,
        } = req.body;

        // Validation
        // Relaxed validation: allow empty saves
        // if (!personalInfo) {
        //     return res.status(400).json({ message: 'Personal info is required' });
        // }

        // Create resume with authenticated user's ID
        const resume = await Resume.create({
            userId: req.user.id,
            personalInfo,
            summary,
            experience: experience || [],
            education: education || [],
            skills: skills || { technical: [], soft: [] },
            projects: projects || [],
            certifications: certifications || [],
            layoutType: layoutType || 'modern',
        });

        res.status(201).json(resume);
    } catch (error) {
        console.error('Create Resume Error:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: 'Validation Error', errors: messages });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all resumes for a user
// @route   GET /api/resumes/:userId
// @access  Private
const getUserResumes = async (req, res) => {
    try {
        const { userId } = req.params;

        // Authorization check - user can only access their own resumes
        if (userId !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to access these resumes' });
        }

        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get specific resume by ID
// @route   GET /api/resumes/single/:id
// @access  Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Authorization check - user can only access their own resume
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to access this resume' });
        }

        res.json(resume);
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Authorization check - user can only update their own resume
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this resume' });
        }

        const {
            personalInfo,
            summary,
            experience,
            education,
            skills,
            projects,
            certifications,
            layoutType,
        } = req.body;

        // Update fields
        if (personalInfo) resume.personalInfo = personalInfo;
        if (summary) resume.summary = summary;
        if (experience) resume.experience = experience;
        if (education) resume.education = education;
        if (skills) resume.skills = skills;
        if (projects) resume.projects = projects;
        if (certifications) resume.certifications = certifications;
        if (layoutType) resume.layoutType = layoutType;

        const updatedResume = await resume.save();
        res.json(updatedResume);
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Authorization check - user can only delete their own resume
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this resume' });
        }

        await resume.deleteOne();
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Generate PDF for a resume
// @route   POST /api/resumes/generate-pdf
// @access  Private
const generatePDF = async (req, res) => {
    try {
        const { resumeId, resumeData, layoutType } = req.body;
        let dataToRender = resumeData;

        // If resumeId is provided, fetch from DB
        if (resumeId) {
            const resume = await Resume.findById(resumeId);
            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
            }
            // Authorization check
            if (resume.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized to access this resume' });
            }
            dataToRender = resume;
        }

        if (!dataToRender) {
            return res.status(400).json({ message: 'Resume data or ID is required' });
        }

        const pdfBuffer = await generateResumePDF(dataToRender, layoutType || 'modern');

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="resume-${layoutType}.pdf"`,
            'Content-Length': pdfBuffer.length,
        });

        res.send(pdfBuffer);
    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ message: 'Error generating PDF', error: error.message });
    }
};

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
    generatePDF,
};
