import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Use Vite environment variable or fallback to backend port 5005
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

    // Redirect user to backend Google OAuth route
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="google-login-button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        border: '2px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '1rem',
      }}
    >
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
