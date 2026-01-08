# Deployment Guide

This guide covers deploying the AI Resume Builder to production environments.

## Table of Contents
1. [MongoDB Atlas Setup](#mongodb-atlas-setup)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Post-Deployment](#post-deployment)

---
## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient for testing)

### 2. Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and secure password
4. Grant "Read and write to any database" permissions
5. Click "Add User"

### 3. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your deployment platform's IP addresses

### 4. Get Connection String
1. Go to "Database" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `myFirstDatabase` with your database name (e.g., `resume_builder`)

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resume_builder?retryWrites=true&w=majority`

---

## Backend Deployment

### Option 1: Render

#### 1. Prepare Your Repository
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Create Render Account
1. Go to [Render](https://render.com)
2. Sign up and connect your GitHub account

#### 3. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name**: `ai-resume-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `backend` if separate repo)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js` (adjust path as needed)
   - **Plan**: Free

#### 4. Add Environment Variables
In the "Environment" section, add:
```
PORT=5000
MONGO_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<generate_secure_random_string>
OPENAI_API_KEY=<your_openai_api_key>
NODE_ENV=production
FRONTEND_URL=<your_frontend_url_after_deployment>
```

#### 5. Deploy
- Click "Create Web Service"
- Render will automatically deploy your backend
- Note the URL (e.g., `https://ai-resume-backend.onrender.com`)

### Option 2: Railway

#### 1. Create Railway Account
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub

#### 2. Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

#### 3. Configure Service
1. Add environment variables (same as Render)
2. Railway will auto-detect Node.js and deploy

#### 4. Custom Start Command (if needed)
Add to `package.json`:
```json
{
  "scripts": {
    "start": "node backend/server.js"
  }
}
```

### Option 3: Heroku

#### 1. Install Heroku CLI
```bash
npm install -g heroku
```

#### 2. Login and Create App
```bash
heroku login
heroku create ai-resume-backend
```

#### 3. Set Environment Variables
```bash
heroku config:set MONGO_URI=<your_mongodb_uri>
heroku config:set JWT_SECRET=<your_jwt_secret>
heroku config:set OPENAI_API_KEY=<your_openai_key>
heroku config:set NODE_ENV=production
```

#### 4. Deploy
```bash
git push heroku main
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### 1. Prepare Frontend
Update `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### 2. Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

#### 3. Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### 4. Add Environment Variables
In "Environment Variables" section:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### 5. Deploy
- Click "Deploy"
- Vercel will build and deploy your frontend
- Note your deployment URL

### Option 2: Netlify

#### 1. Create Netlify Account
1. Go to [Netlify](https://netlify.com)
2. Sign up with GitHub

#### 2. Create New Site
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub and select your repository
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

#### 3. Environment Variables
Go to "Site settings" → "Environment variables":
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### 4. Deploy
- Click "Deploy site"
- Netlify will build and deploy

---

## Post-Deployment

### 1. Update Backend CORS
Update your backend `.env` with the frontend URL:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

Redeploy the backend for changes to take effect.

### 2. Test the Application
1. Visit your frontend URL
2. Register a new account
3. Create a resume
4. Test all features:
   - Resume creation and editing
   - PDF download
   - AI analysis (if OpenAI key is configured)
   - Job recommendations

### 3. Monitor Logs
- **Render**: Check logs in the dashboard
- **Railway**: View logs in the project dashboard
- **Vercel/Netlify**: Check function logs and deployment logs

### 4. Set Up Custom Domain (Optional)
Both Vercel and Netlify allow custom domains:
1. Go to domain settings
2. Add your custom domain
3. Update DNS records as instructed

---

## Troubleshooting

### Backend Issues
- **500 Error**: Check environment variables are set correctly
- **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
- **CORS Error**: Ensure FRONTEND_URL is set correctly

### Frontend Issues
- **API Connection Failed**: Verify VITE_API_URL is correct
- **Build Fails**: Check all dependencies are in package.json
- **Environment Variables Not Working**: Ensure they start with `VITE_`

### Common Issues
- **Rate Limiting**: Adjust rate limits in `backend/middleware/rateLimiter.js`
- **PDF Generation**: Puppeteer may need additional configuration on some platforms
- **OpenAI Errors**: Verify API key and check usage limits

---

## Security Checklist

- [ ] Strong JWT_SECRET set (at least 32 random characters)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables never committed to Git
- [ ] HTTPS enabled on both frontend and backend
- [ ] Rate limiting configured
- [ ] CORS properly configured with specific origins
- [ ] Helmet security headers enabled

---

## Scaling Considerations

### Database
- Monitor MongoDB Atlas metrics
- Upgrade to paid tier when approaching limits
- Consider indexing frequently queried fields

### Backend
- Upgrade Render/Railway plan for better performance
- Consider adding Redis for caching
- Implement CDN for static assets

### Frontend
- Vercel/Netlify automatically scale
- Consider code splitting for large applications
- Optimize images and assets

---

## Monitoring & Logging

### Recommended Services
- **Error Tracking**: [Sentry](https://sentry.io)
- **Performance**: [New Relic](https://newrelic.com)
- **Uptime Monitoring**: [UptimeRobot](https://uptimerobot.com)

### Adding Sentry (Optional)
```bash
npm install @sentry/node @sentry/react
```

Configure in backend/server.js and frontend/main.jsx as per Sentry documentation.

---

## Backup Strategy

1. **Database**: MongoDB Atlas provides automated backups
2. **Code**: Ensure all code is in Git
3. **Environment Variables**: Keep secure backup of all env vars

---

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review application logs
3. Verify all environment variables
4. Test locally first with production env vars
