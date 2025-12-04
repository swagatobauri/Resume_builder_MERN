import React, { useEffect } from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { updateEducation } from '../redux/educationSlice';
import { updateProfile } from '../redux/profileSlice';
import { updateProject } from '../redux/projectSlice';
import { updateExperience } from '../redux/experienceSlice';
import { updateAchievements, updateExtraCoCurricular, updateSkills } from '../redux/extraDetailsSlice';
import { BASE_URL } from '../api';
import '../styles/LandingPage.css';

// Icons
import BuildIcon from '@mui/icons-material/Build';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { styled } from '@mui/system';

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: '2rem',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)'
  }
}));

export default function LandingPage() {
    const theme = useTheme();
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    const features = [
        {
            icon: <DesignServicesIcon sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />,
            title: 'Professional Templates',
            description: 'Choose from a variety of modern and professional resume templates designed to impress recruiters.'
        },
        {
            icon: <BuildIcon sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />,
            title: 'Easy to Use',
            description: 'Our intuitive interface makes it simple to create and customize your resume in minutes.'
        },
        {
            icon: <RocketLaunchIcon sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />,
            title: 'Land Your Dream Job',
            description: 'Stand out from the crowd and increase your chances of getting hired with a professionally crafted resume.'
        }
    ];

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
        <Box className="landing-container">
            {/* Hero Section */}
            <Box className="hero-section">
                <Box className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography 
                            variant="h1" 
                            className="hero-title"
                            sx={{ 
                                fontWeight: 800, 
                                mb: 3,
                                background: 'linear-gradient(90deg, #3a7bd5, #00d1b2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}
                        >
                            Build Your Professional Resume
                        </Typography>
                        <Typography 
                            variant="h5" 
                            className="hero-subtitle"
                            sx={{ 
                                mb: 4,
                                color: 'white',
                                maxWidth: '700px',
                                mx: 'auto',
                                lineHeight: 1.6
                            }}
                        >
                            Create a stunning resume that gets you noticed by employers. Our easy-to-use builder helps you craft the perfect resume in minutes.
                        </Typography>
                    </motion.div>

                    {!currentUser?.token && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    onClick={handleGetStarted}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '50px',
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        background: 'linear-gradient(45deg, #3a7bd5, #00d1b2)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(58, 123, 213, 0.4)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Get Started for Free
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="large" 
                                    startIcon={<GoogleIcon />} 
                                    onClick={handleGoogleSignIn}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '50px',
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                        borderWidth: '2px',
                                        '&:hover': {
                                            borderWidth: '2px',
                                            transform: 'translateY(-2px)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Continue with Google
                                </Button>
                            </Box>
                        </motion.div>
                    )}
                </Box>
                
                <div className="hero-background">
                    <div className="gradient-overlay"></div>
                </div>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }} ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="features-container"
                >
                    <Box textAlign="center" mb={6}>
                        <Typography 
                            variant="h3" 
                            component="h2" 
                            sx={{ 
                                fontWeight: 700, 
                                mb: 2,
                                color: 'text.primary'
                            }}
                        >
                            Why Choose Our Resume Builder?
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'text.secondary',
                                maxWidth: '700px',
                                mx: 'auto'
                            }}
                        >
                            Everything you need to create a professional resume that stands out
                        </Typography>
                    </Box>

                    <Box className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                            >
                                <FeatureCard>
                                    {feature.icon}
                                    <Typography 
                                        variant="h5" 
                                        component="h3" 
                                        sx={{ 
                                            fontWeight: 600, 
                                            mb: 2,
                                            color: 'text.primary'
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            color: 'text.secondary',
                                            lineHeight: 1.7
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </FeatureCard>
                            </motion.div>
                        ))}
                    </Box>
                </motion.div>
            </Container>

            {/* CTA Section */}
            <Box className="cta-section">
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: 700, 
                                mb: 3,
                                color: '#fff'
                            }}
                        >
                            Ready to Build Your Resume?
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 4,
                                color: 'rgba(255, 255, 255, 0.9)',
                                maxWidth: '700px',
                                mx: 'auto'
                            }}
                        >
                            Join thousands of professionals who have landed their dream jobs with our resume builder.
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="large" 
                            onClick={handleGetStarted}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: '50px',
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                backgroundColor: '#fff',
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Start Building Now
                        </Button>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
}
