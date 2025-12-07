const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const aiRoutes = require('./routes/aiRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const { limiter, authLimiter } = require('./middleware/rateLimiter');

dotenv.config();

connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Security headers
app.use(mongoSanitize()); // Prevent MongoDB injection

// CORS Configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL] // Add your production frontend URL
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate Limiting
app.use('/api/', limiter); // General rate limiting for all API routes

// Routes
app.use('/api/auth', authLimiter, authRoutes); // Stricter rate limiting for auth
app.use('/api/resumes', resumeRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/pdf', pdfRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
