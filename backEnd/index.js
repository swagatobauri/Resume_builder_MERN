// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoDB = require('./config/db');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// Import routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const resumeRoutes = require('./routes/resume.route');
const googleAuthRoutes = require("./routes/google.route");

// Passport config
require("./config/passport");

// Initialize app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoDB();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SECRET_KEY",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5176", // your React frontend URL
    credentials: true,
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/google', googleAuthRoutes); 
app.use('/api/user', userRoutes);
app.use('/api/data', resumeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
