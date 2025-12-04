import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route , useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AuthSuccess from './pages/AuthSuccess';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import ResumeLayout from './components/ResumeLayout';
import AutoResumeGenerator from './components/AutoResumeGenerator/AutoResumeGenerator';

import Home from './pages/Home';
import Resume from './pages/Resume';
import SignIn from './pages/Auth/SignIn';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';
import Templates from './pages/Templates';
import ErrorPage from './pages/ErrorPage';
import Contact from './components/Contact';
import Profile from './components/Profile';

function App() {
  const handleSaveResume = async (resumeData, navigate) => {
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
    
    // Optional: Uncomment this if you want to navigate to a different page
    // navigate('/resume');
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/auto-resume" element={<AutoResumeGeneratorWrapper onSave={handleSaveResume} />} />
          <Route path="/auth/success" element={<AuthSuccess />} />

          {/* Resume Builder Routes */}
          <Route path="/resume" element={<ResumeLayout><Resume /></ResumeLayout>} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/education" element={<ResumeLayout><Resume section="education" /></ResumeLayout>} />
          <Route path="/experience" element={<ResumeLayout><Resume section="experience" /></ResumeLayout>} />
          <Route path="/projects" element={<ResumeLayout><Resume section="projects" /></ResumeLayout>} />
          <Route path="/skills" element={<ResumeLayout><Resume section="skills" /></ResumeLayout>} />
          <Route path="/resume/:template" element={<Resume />} />
          <Route path="/contact-us" element={<Contact />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

// Wrapper to pass navigate to AutoResumeGenerator
function AutoResumeGeneratorWrapper({ onSave }) {
  const navigate = useNavigate();
  return <AutoResumeGenerator onSave={(data) => onSave(data, navigate)} />;
}

export default App;
