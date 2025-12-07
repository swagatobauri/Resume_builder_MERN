# API Documentation

Base URL: `http://localhost:5000/api` (Development)  
Production: `https://your-backend-url.com/api`

All endpoints except authentication require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `201 Created`
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

### Login
**POST** `/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

### Get Current User
**GET** `/auth/me`

Get authenticated user's information.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## Resumes

### Create Resume
**POST** `/resumes`

Create a new resume.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "location": "San Francisco, CA",
    "portfolio": "johndoe.com",
    "linkedin": "linkedin.com/in/johndoe",
    "github": "github.com/johndoe"
  },
  "summary": "Experienced software engineer...",
  "experience": [
    {
      "position": "Senior Developer",
      "company": "Tech Corp",
      "duration": "2020 - Present",
      "description": "Led development of...",
      "technologies": "React, Node.js, AWS"
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "institution": "University of California",
      "graduationYear": "2019"
    }
  ],
  "skills": {
    "technical": ["React", "Node.js", "Python"],
    "soft": ["Leadership", "Communication"]
  },
  "projects": [
    {
      "name": "E-commerce Platform",
      "description": "Built a full-stack solution...",
      "technologies": "React, MongoDB, Stripe"
    }
  ],
  "certifications": [
    {
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "date": "2023"
    }
  ],
  "layoutType": "modern"
}
```

**Response:** `201 Created`
```json
{
  "_id": "resume_id",
  "userId": "user_id",
  "personalInfo": { ... },
  "summary": "...",
  "experience": [ ... ],
  "education": [ ... ],
  "skills": { ... },
  "projects": [ ... ],
  "certifications": [ ... ],
  "layoutType": "modern",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Get User's Resumes
**GET** `/resumes/:userId`

Get all resumes for a specific user.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "_id": "resume_id",
    "userId": "user_id",
    "personalInfo": { ... },
    "layoutType": "modern",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Single Resume
**GET** `/resumes/single/:id`

Get a specific resume by ID.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "_id": "resume_id",
  "userId": "user_id",
  "personalInfo": { ... },
  "summary": "...",
  "experience": [ ... ],
  ...
}
```

### Update Resume
**PUT** `/resumes/:id`

Update an existing resume.

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as Create Resume

**Response:** `200 OK`
```json
{
  "_id": "resume_id",
  "userId": "user_id",
  ...
}
```

### Delete Resume
**DELETE** `/resumes/:id`

Delete a resume.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "message": "Resume deleted successfully"
}
```

### Generate PDF
**POST** `/resumes/generate-pdf`

Generate a PDF from resume data.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "resumeId": "resume_id",
  "layoutType": "modern"
}
```
OR
```json
{
  "resumeData": { ... },
  "layoutType": "modern"
}
```

**Response:** `200 OK`  
Content-Type: `application/pdf`  
Binary PDF data

---

## AI Features

### Analyze Resume
**POST** `/ai/analyze-resume`

Get AI-powered analysis of a resume.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "resumeContent": "Full resume text content..."
}
```

**Response:** `200 OK`
```json
{
  "atsScore": 85,
  "keywordOptimization": {
    "score": 80,
    "suggestions": ["Add more technical keywords", "..."]
  },
  "structure": {
    "score": 90,
    "feedback": "Well-organized sections"
  },
  "contentQuality": {
    "score": 85,
    "improvements": ["Quantify achievements", "..."]
  },
  "suggestions": [
    "Add metrics to work experience",
    "Include relevant certifications"
  ],
  "missingSections": ["Projects", "Certifications"]
}
```

### Get Job Recommendations
**POST** `/ai/job-recommendations`

Get AI-powered job recommendations based on resume.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "resumeContent": "Full resume text content..."
}
```

**Response:** `200 OK`
```json
{
  "recommendations": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "matchScore": 95,
      "salary": "$150,000 - $200,000",
      "description": "We are looking for...",
      "requirements": ["5+ years experience", "React", "Node.js"],
      "whyGoodFit": "Your experience with React and Node.js..."
    }
  ]
}
```

### Get Industry Trends
**GET** `/ai/industry-trends`

Get current industry trends and insights.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "trends": [
    {
      "category": "Technology",
      "trend": "AI/ML Skills",
      "growth": "+45%",
      "description": "High demand for AI/ML expertise",
      "topSkills": ["Python", "TensorFlow", "PyTorch"],
      "averageSalary": "$140,000"
    }
  ]
}
```

---

## User Profile

### Get Profile
**GET** `/profiles/:userId`

Get user profile information.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "_id": "profile_id",
  "userId": "user_id",
  "bio": "Software engineer with...",
  "skills": ["React", "Node.js"],
  "experience": "5 years",
  "preferences": {
    "jobType": "Full-time",
    "location": "Remote",
    "salary": "$120,000+"
  }
}
```

### Update Profile
**PUT** `/profiles/:userId`

Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bio": "Updated bio...",
  "skills": ["React", "Node.js", "Python"],
  "preferences": {
    "jobType": "Full-time",
    "location": "Remote"
  }
}
```

**Response:** `200 OK`
```json
{
  "_id": "profile_id",
  "userId": "user_id",
  ...
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, token failed"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Auth Endpoints**: 5 requests per 15 minutes per IP

---

## Notes

- All timestamps are in ISO 8601 format
- All IDs are MongoDB ObjectIds
- File uploads (if implemented) should use multipart/form-data
- PDF generation may take a few seconds depending on resume complexity
- AI features require valid Gemini API key configuration

---

## Testing

Example using cURL:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Resumes (replace TOKEN)
curl -X GET http://localhost:5000/api/resumes/USER_ID \
  -H "Authorization: Bearer TOKEN"
```

Example using JavaScript (Axios):

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
const register = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
};

// Get resumes
const getResumes = async (userId) => {
  const { data } = await api.get(`/resumes/${userId}`);
  return data;
};
```
