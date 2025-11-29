const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoDB = require('./config/db');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const resumeRoutes = require('./routes/resume.route');
const googleAuthRoutes = require("./routes/google.route");
require("./config/passport");

const app = express();

// Load environment variables
dotenv.config();

// Connect to database
mongoDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "SECRET_KEY",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors({
    origin: "http://localhost:5176",
    credentials: true
}));

// Root test route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/user', userRoutes);
app.use('/api/data', resumeRoutes);

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
