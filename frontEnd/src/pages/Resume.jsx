import React, { useEffect, useState } from 'react';
import ResumeTemplate1 from '../components/ResumeTemplates/Template1';
import ResumeTemplate2 from '../components/ResumeTemplates/Template2';
import { useParams, useLocation } from 'react-router-dom';

export default function Resume({ section }) {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const { template } = useParams();
  const location = useLocation();

  // If section prop is not provided, try to get it from the URL path
  const currentSection = section || location.pathname.split('/')[1];

  useEffect(() => {
    if (template) {
      // Extract the template number from the URL
      const templateNumber = parseInt(template.split('=')[1]);
      setSelectedTemplate(templateNumber);
    }
  }, [template]);

  // Pass the current section to the template
  const templateProps = {
    activeSection: currentSection === 'resume' ? null : currentSection
  };

  return (
    <div className="resume-container">
      {selectedTemplate === 1 ? (
        <ResumeTemplate1 {...templateProps} />
      ) : (
        <ResumeTemplate2 {...templateProps} />
      )}
    </div>
  );
}
