const mongoose = require('mongoose');
console.log('LOADING RESUME MODEL - VALIDATION SHOULD BE GONE');

const experienceSchema = new mongoose.Schema({
    company: { type: String },
    position: { type: String },
    duration: { type: String },
    description: { type: String },
    technologies: [String]
});

const educationSchema = new mongoose.Schema({
    institution: { type: String },
    degree: { type: String },
    field: { type: String },
    graduationYear: { type: String }
});

const projectSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    technologies: [String],
    link: { type: String },
    github: { type: String }
});

const certificationSchema = new mongoose.Schema({
    name: { type: String },
    issuer: { type: String },
    date: { type: String }
});

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personalInfo: {
        fullName: { type: String },
        email: { type: String },
        phone: { type: String },
        location: { type: String },
        portfolio: { type: String },
        linkedin: { type: String },
        github: { type: String }
    },
    summary: {
        type: String,
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: {
        technical: [String],
        soft: [String]
    },
    projects: [projectSchema],
    certifications: [certificationSchema],
    layoutType: {
        type: String,
        enum: ['modern', 'classic', 'minimal', 'creative'],
        default: 'modern'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
