import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { signInStart, signInSuccess, signInFailure } from '../../redux/userSlice';
import GoogleLoginButton from '../../components/GoogleLoginButton';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle successful Google login
  const handleGoogleSuccess = (userData) => {
    dispatch(signInSuccess(userData));
    navigate('/home');
  };




  // Bubble Component
  const Bubble = ({ size, color }) => {
    const randomPos = () => ({
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size)
    });

    return (
      <motion.div
        initial={randomPos()}
        animate={randomPos()}
        transition={{
          duration: 17,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: '50%',
          border: '2px solid rgba(0, 0, 0, 0.1)'
        }}
      />
    );
  };

  const bubbles = Array.from({ length: 15 }).map((_, i) => (
    <Bubble
      key={i}
      size={Math.random() * 100 + 30}
      color={`hsla(${Math.random() * 360}, 100%, 80%, 0.7)`}
    />
  ));

  return (
    <div style={styles.container}>
      <div style={{ border: '1px solid black', position: 'relative', marginTop: '-600px', marginLeft: '-600px' }}>
        {bubbles}
      </div>

      <div style={styles.googleButtonContainer}>
        <GoogleLoginButton />
        {loading && <CircularProgress size={28} style={styles.loader} />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    position: 'relative',
    overflow: 'hidden',
  },
  googleButtonContainer: {
    position: 'relative',
    zIndex: 10,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 20,
  },
};
