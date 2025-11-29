import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { updateEducation } from '../redux/educationSlice';
import { updateProfile } from '../redux/profileSlice';
import { updateProject } from '../redux/projectSlice';
import { updateExperience } from '../redux/experienceSlice';
import { updateAchievements, updateExtraCoCurricular, updateSkills } from '../redux/extraDetailsSlice';
import { BASE_URL } from '../api';
import '../styles/LandingPage.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

export default function LandingPage() {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle token from URL query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token && !currentUser) {
            const user = { token, name: "Google User" }; // optional: decode JWT for real name/email
            dispatch(signInSuccess(user));
            localStorage.setItem('token', token);

            // Clean URL
            window.history.replaceState({}, document.title, '/');

            // Redirect to homepage
            navigate('/');
        }
    }, [currentUser, dispatch, navigate]);

    // Fetch resume data only if logged in
    const getAllResumeData = async () => {
        if (!currentUser?.token) return;

        try {
            const response = await axios.get(`${BASE_URL}/data/get-all-resume-data?id=${currentUser._id}`, {
                headers: { authorization: currentUser.token }
            });
            const resumeData = response.data.resumeData?.[0];
            if (!resumeData) return;

            dispatch(updateProfile(resumeData.profile));
            dispatch(updateEducation(resumeData.education?.[0] || {}));

            resumeData.projects?.forEach((project, index) => {
                Object.keys(project).forEach(field => {
                    dispatch(updateProject({ index, field, value: project[field] }));
                });
            });

            resumeData.experience?.forEach((experience, index) => {
                Object.keys(experience).forEach(field => {
                    dispatch(updateExperience({ index, field, value: experience[field] }));
                });
            });

            const { skills, achievements, extraCoCurricular } = resumeData.extraDetails || {};

            if (skills) {
                Object.keys(skills).forEach(type => {
                    skills[type].forEach((skill, index) => {
                        dispatch(updateSkills({ type, index, value: skill }));
                    });
                });
            }

            achievements?.forEach((achievement, index) => dispatch(updateAchievements({ index, value: achievement })));
            extraCoCurricular?.forEach((activity, index) => dispatch(updateExtraCoCurricular({ index, value: activity })));

        } catch (err) {
            console.error("Error fetching resume data:", err);
        }
    };

    useEffect(() => { getAllResumeData(); }, [currentUser]);

    const handleGoogleSignIn = () => { window.location.href = `${BASE_URL}/auth/google`; };
    const handleGetStarted = () => { navigate('/sign-in'); };

    return (
        <Box className="box-container">
            <div className="img-container">
                <div className="image-container-1"><img src={img1} alt="img1" className="image-style-1" /></div>
                <div className="image-container-2"><img src={img2} alt="img2" className="image-style-2" /></div>
                <div className="image-container-3"><img src={img3} alt="img3" className="image-style-3" /></div>
            </div>

            <div className="overlay-text">
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>Build Your Professional Resume</Typography>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
                        <Typography variant="h5" gutterBottom>Create a resume that stands out with our easy-to-use builder</Typography>
                    </motion.div>

                    {!currentUser?.token && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, width: '100%', maxWidth: 300 }}>
                                <Button variant="contained" size="large" sx={{ height: 50, borderRadius: 25 }} onClick={handleGetStarted}>Get Started</Button>

                                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                                    <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
                                    <Typography variant="body2" sx={{ mx: 2 }}>OR</Typography>
                                    <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
                                </Box>

                                <Button variant="outlined" size="large" startIcon={<GoogleIcon />} onClick={handleGoogleSignIn} sx={{ height: 50, borderRadius: 25 }}>
                                    Continue with Google
                                </Button>
                            </Box>
                        </motion.div>
                    )}
                </Container>
            </div>
        </Box>
    );
}
