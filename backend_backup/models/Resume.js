const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: [true, 'Please add a school name'],
  },
  degree: {
    type: String,
    required: [true, 'Please add a degree'],
  },
  fieldOfStudy: {
    type: String,
    required: [true, 'Please add a field of study'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return !this.currentJob ? value !== null : true;
      },
      message: 'Please add an end date or check the current job box',
    },
  },
  currentJob: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please add a company name'],
  },
  position: {
    type: String,
    required: [true, 'Please add a position'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return !this.currentJob ? value !== null : true;
      },
      message: 'Please add an end date or check the current job box',
    },
  },
  currentJob: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a skill name'],
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 50,
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a project description'],
  },
  url: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  technologies: [String],
});

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    personalInfo: {
      fullName: {
        type: String,
        required: [true, 'Please add your full name'],
      },
      email: {
        type: String,
        required: [true, 'Please add your email'],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
        ],
      },
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      summary: String,
      linkedin: String,
      github: String,
      website: String,
    },
    education: [educationSchema],
    experience: [experienceSchema],
    skills: [skillSchema],
    projects: [projectSchema],
    languages: [
      {
        name: {
          type: String,
          required: [true, 'Please add a language'],
        },
        level: {
          type: String,
          enum: ['Basic', 'Intermediate', 'Fluent', 'Native'],
          default: 'Intermediate',
        },
      },
    ],
    certifications: [
      {
        name: {
          type: String,
          required: [true, 'Please add a certification name'],
        },
        issuer: {
          type: String,
          required: [true, 'Please add the issuer name'],
        },
        date: Date,
        credentialUrl: String,
      },
    ],
    template: {
      type: String,
      default: 'default',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ensure a user can only have one default resume
resumeSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);
