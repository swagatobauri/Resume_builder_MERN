# AI Resume Builder

A comprehensive MERN stack application for creating professional resumes with AI-powered analysis, job recommendations, and PDF generation.

## Features

- 🎨 **Multiple Resume Layouts** - Modern, Classic, and Minimal designs
- 🤖 **AI Resume Analysis** - Get ATS compatibility scores and improvement suggestions
- 💼 **Job Recommendations** - AI-powered job matching based on your resume
- 📊 **Industry Trends** - Stay updated with market insights
- 📄 **PDF Generation** - Download professional PDFs of your resume
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📱 **Responsive Design** - Works seamlessly on all devices

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Puppeteer for PDF generation
- Gemini API for AI features
- Security: Helmet, Rate Limiting, Mongo Sanitize

### Frontend
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Hot Toast for notifications
- Lucide React for icons

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Gemini API Key (for AI features)

## Local Development Setup

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd ai_resume
\`\`\`

### 2. Backend Setup
\`\`\`bash
# Install dependencies
npm install

# Create .env file in backend directory
cp backend/.env.example backend/.env

# Update .env with your values:
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: A secure random string
# - GEMINI_API_KEY: Your Gemini API key
# - PORT: 5000 (or your preferred port)

# Start backend server
npm run server
\`\`\`

### 3. Frontend Setup
\`\`\`bash
# Create .env file in frontend directory
cp frontend/.env.example frontend/.env

# Update .env with your backend URL (default: http://localhost:5001/api)

# Start frontend development server
npm run client
\`\`\`

### 4. Run Both Concurrently
\`\`\`bash
npm run dev
\`\`\`

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Environment Variables

### Backend (.env)
\`\`\`
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume_builder
JWT_SECRET=your_secure_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
\`\`\`

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:5001/api
\`\`\`

## Project Structure

\`\`\`
ai_resume/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # Business logic (PDF, AI, etc.)
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context providers
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
└── package.json         # Root package.json
\`\`\`

## Available Scripts

- `npm run server` - Start backend server
- `npm run client` - Start frontend development server
- `npm run dev` - Run both frontend and backend concurrently
- `npm run build` - Build frontend for production

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Backend: Render, Railway, or Heroku
- Frontend: Vercel or Netlify
- Database: MongoDB Atlas

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API endpoint documentation.

## Features Overview

### Resume Builder
- Step-by-step resume creation process
- Multiple layout options
- Real-time preview
- Save drafts and edit later

### AI Analysis
- ATS compatibility scoring
- Keyword optimization suggestions
- Structure and content quality analysis
- Missing sections detection

### Job Recommendations
- AI-powered job matching
- Industry-specific recommendations
- Salary insights
- Application tracking

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- MongoDB injection prevention
- Security headers with Helmet
- CORS configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

- Gemini for AI capabilities
- Puppeteer for PDF generation
- Tailwind CSS for styling
- React community for excellent tools and libraries
