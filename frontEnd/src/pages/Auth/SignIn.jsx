import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { signInStart, signInSuccess, signInFailure } from '../../redux/userSlice';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ---------------------------------------
  // ✅ NEW GOOGLE OAUTH LOGIN (NO FIREBASE)
  // ---------------------------------------
const handleGoogle = () => {
    window.location.href = "http://localhost:5005/api/auth/google";
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

      <button style={styles.button} onClick={handleGoogle}>
        {loading ? (
          <CircularProgress size={28} />
        ) : (
          <>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              style={styles.icon}
            />
            <p style={styles.text}>Continue With Google</p>
          </>
        )}
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 21px',
    borderRadius: '5px',
    marginLeft: '600px',
    border: 'black 2px solid',
    backgroundColor: '#fff',
    color: '#fff',
    cursor: 'pointer',
    width: '320px',
    zIndex: 1,
  },
  text: {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0',
    color: '#000',
  },
  icon: {
    marginRight: '10px',
    width: '24px',
    height: '24px',
  },
};
