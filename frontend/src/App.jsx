import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreview from './pages/ResumePreview';
import ResumeAnalysis from './pages/ResumeAnalysis';
import IndustryTrends from './pages/IndustryTrends';
import JobRecommendations from './pages/JobRecommendations';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Toaster position="top-right" />
      <AuthProvider>
        <ResumeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/builder/:id?"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/preview/:id?"
              element={
                <ProtectedRoute>
                  <ResumePreview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <ResumeAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <JobRecommendations />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

