import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AutoResumeGenerator.css';

const AutoResumeGenerator = ({ onSave }) => {
  const [formData, setFormData] = useState({
    githubUrl: '',
    portfolioUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show coming soon message
    toast.info('AI Resume Generation feature is coming soon!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    // Call onSave with empty data to maintain any navigation logic
    if (onSave) {
      onSave({});
    }
  };

  const handleSave = () => {
    if (!resume || !onSave) return;
    
    const resumeData = {
      personalInfo: {
        summary: resume.summary || ''
      },
      skills: (resume.skills || []).map(skill => ({ name: skill })),
      experience: (resume.experience || []).map(exp => ({
        title: exp.title || '',
        company: exp.company || '',
        startDate: exp.duration?.split(' - ')[0] || '',
        endDate: exp.duration?.split(' - ')[1] || 'Present',
        description: exp.description || ''
      })),
      projects: (resume.projects || []).map(project => ({
        name: project.name || '',
        description: project.description || '',
        technologies: project.technologies?.join(', ') || '',
        url: project.url || ''
      })),
      education: [],
      achievements: (resume.achievements || []).map(achievement => ({
        title: achievement,
        date: new Date().toISOString().split('T')[0]
      }))
    };

    onSave(resumeData);
    toast.success('Resume saved successfully!');
  };

  return (
    <div className="auto-resume-generator">
      <h2>AI Resume Generator</h2>
      
      <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-group">
          <label htmlFor="githubUrl">GitHub Profile URL*</label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/username"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="portfolioUrl">Portfolio URL (Optional)</label>
          <input
            type="url"
            id="portfolioUrl"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            placeholder="https://your-portfolio.com"
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="generate-btn"
          disabled={isLoading || !formData.githubUrl}
        >
          {isLoading ? 'Generating...' : 'Generate Resume'}
        </button>
      </form>

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Analyzing your GitHub and generating a professional resume...</p>
        </div>
      )}

      {resume && !isLoading && (
        <div className="resume-container">
          <div className="resume-actions">
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button 
              type="button"
              className={`tab-btn ${activeTab === 'json' ? 'active' : ''}`}
              onClick={() => setActiveTab('json')}
            >
              JSON View
            </button>
            <button 
              type="button"
              className="save-btn"
              onClick={handleSave}
            >
              Save to My Resume
            </button>
          </div>

          {activeTab === 'preview' ? (
            <div className="resume-preview">
              {resume.summary && (
                <div className="resume-section">
                  <h3>Professional Summary</h3>
                  <p>{resume.summary}</p>
                </div>
              )}

              {resume.skills?.length > 0 && (
                <div className="resume-section">
                  <h3>Skills</h3>
                  <div className="skills-container">
                    {resume.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {resume.experience?.length > 0 && (
                <div className="resume-section">
                  <h3>Experience</h3>
                  {resume.experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <h4>{exp.title}</h4>
                      <div className="experience-meta">
                        {exp.company && <span className="company">{exp.company}</span>}
                        {exp.duration && <span className="duration">{exp.duration}</span>}
                      </div>
                      {exp.description && <p>{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {resume.projects?.length > 0 && (
                <div className="resume-section">
                  <h3>Projects</h3>
                  {resume.projects.map((project, index) => (
                    <div key={index} className="project-item">
                      <h4>
                        {project.url ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            {project.name}
                          </a>
                        ) : (
                          project.name
                        )}
                      </h4>
                      {project.technologies?.length > 0 && (
                        <div className="project-technologies">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                      {project.description && <p>{project.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {resume.achievements?.length > 0 && (
                <div className="resume-section">
                  <h3>Achievements</h3>
                  <ul className="achievements-list">
                    {resume.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="json-view">
              <pre>{JSON.stringify(resume, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoResumeGenerator;