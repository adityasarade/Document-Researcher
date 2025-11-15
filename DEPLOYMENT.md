# Deployment Guide

This guide provides step-by-step instructions for deploying the Document Research & Theme Identification application to production.

## Overview

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on HuggingFace Spaces
- **Live URLs**:
  - Frontend: https://wasserstoff-mu.vercel.app
  - Backend: https://adityasarade-wasserstoff.hf.space

---

## 🚀 Backend Deployment (HuggingFace Spaces)

The backend is containerized using Docker and runs on HuggingFace Spaces.

### Prerequisites

1. A HuggingFace account
2. GROQ API Key (get from https://console.groq.com)

### Initial Setup

1. **Create a new Space on HuggingFace**:
   - Go to https://huggingface.co/spaces
   - Click "Create new Space"
   - Space name: `wasserstoff` (or your preferred name)
   - License: Apache 2.0 (or your choice)
   - SDK: **Docker**
   - Hardware: CPU Basic (free tier works fine)

2. **Configure Space Settings**:
   - Go to your Space settings
   - Under "Repository secrets", add:
     - Name: `GROQ_API_KEY`
     - Value: Your GROQ API key

### Deployment Steps

#### Method 1: Git Push (Recommended)

```bash
# Navigate to the repository root
cd /path/to/Document-Researcher

# Add HuggingFace remote (if not already added)
git remote add huggingface https://huggingface.co/spaces/adityasarade/wasserstoff

# Push to HuggingFace
git push huggingface main
```

#### Method 2: Manual Upload via Web Interface

1. Go to your Space's "Files" tab
2. Upload the following files/folders:
   - `Dockerfile`
   - `requirements.txt`
   - `app/` folder (entire backend directory from `AiInternTask/chatbot_theme_identifier/backend/app/`)
3. HuggingFace will automatically build and deploy

### After Deployment

1. **Verify API is running**:
   ```bash
   curl https://adityasarade-wasserstoff.hf.space/
   ```

   Expected response:
   ```json
   {"status": "ok", "message": "Document Research API is running"}
   ```

2. **Test endpoints**:
   ```bash
   # Test clear endpoint
   curl -X POST https://adityasarade-wasserstoff.hf.space/clear/

   # Test documents list
   curl https://adityasarade-wasserstoff.hf.space/documents/
   ```

### Troubleshooting

- **Build fails**: Check the "Logs" tab in your Space for error messages
- **API Key error**: Ensure `GROQ_API_KEY` is set in Space secrets
- **Port issues**: The Dockerfile exposes port 7860 (HuggingFace default)
- **Timeout errors**: HuggingFace Spaces may sleep after inactivity; first request may be slow

---

## 🌐 Frontend Deployment (Vercel)

The React frontend is deployed on Vercel with automatic builds from the git repository.

### Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub/GitLab repository connected to Vercel

### Initial Setup

1. **Import Project to Vercel**:
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository: `Document-Researcher`

2. **Configure Build Settings**:
   - Framework Preset: **Create React App**
   - Root Directory: `AiInternTask/chatbot_theme_identifier/frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add the following:
     ```
     Name: REACT_APP_API_URL
     Value: https://adityasarade-wasserstoff.hf.space
     ```
   - Apply to: Production, Preview, Development (check all)

### Deployment Steps

#### Automatic Deployment (Recommended)

Vercel automatically deploys on every push to your main branch:

```bash
# Make your changes
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel will:
1. Detect the push
2. Build the frontend
3. Deploy to production
4. Provide a deployment URL

#### Manual Deployment via CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd AiInternTask/chatbot_theme_identifier/frontend
   vercel --prod
   ```

### Updating the Deployment

After making code changes:

1. **Update the `.env.production` file** (if needed):
   ```bash
   cd AiInternTask/chatbot_theme_identifier/frontend
   # Verify REACT_APP_API_URL is correct
   cat .env.production
   ```

2. **Rebuild and redeploy**:

   **Option A: Git Push (automatic)**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

   **Option B: Vercel CLI (manual)**
   ```bash
   cd AiInternTask/chatbot_theme_identifier/frontend
   npm run build
   vercel --prod
   ```

3. **Verify deployment**:
   - Go to https://vercel.com/dashboard
   - Check deployment status
   - Click on the deployment to see build logs
   - Visit your production URL: https://wasserstoff-mu.vercel.app

### Vercel Dashboard

Key sections:
- **Deployments**: View all deployment history and logs
- **Settings** → **Environment Variables**: Update API URLs
- **Settings** → **Domains**: Configure custom domains
- **Analytics**: Monitor traffic and performance

### Troubleshooting

- **Build fails**:
  - Check "Deployment" logs in Vercel dashboard
  - Verify `package.json` dependencies are correct
  - Ensure `REACT_APP_API_URL` is set in environment variables

- **CORS errors in browser console**:
  - Verify backend CORS settings in `backend/app/main.py`
  - Ensure Vercel domain is in the `origins` list

- **API connection fails**:
  - Check `REACT_APP_API_URL` environment variable
  - Test backend endpoint: `curl https://adityasarade-wasserstoff.hf.space/`
  - Check browser console for error details

---

## 🔄 Full Deployment Workflow (After Code Changes)

### Step 1: Test Locally

```bash
# Terminal 1 - Backend
cd AiInternTask/chatbot_theme_identifier/backend
export GROQ_API_KEY="your-key-here"
uvicorn app.main:app --reload --port 8000

# Terminal 2 - Frontend
cd AiInternTask/chatbot_theme_identifier/frontend
npm start
```

Visit http://localhost:3000 and test your changes.

### Step 2: Commit Changes

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### Step 3: Deploy Backend to HuggingFace

```bash
# Push to HuggingFace Space
git push huggingface main
```

Wait for HuggingFace to rebuild (monitor at https://huggingface.co/spaces/adityasarade/wasserstoff).

### Step 4: Deploy Frontend to Vercel

Vercel deploys automatically when you push to `main`. Monitor at:
- https://vercel.com/dashboard

Alternatively, manual deploy:
```bash
cd AiInternTask/chatbot_theme_identifier/frontend
vercel --prod
```

### Step 5: Verify Production

1. **Test Backend**:
   ```bash
   curl https://adityasarade-wasserstoff.hf.space/
   ```

2. **Test Frontend**:
   - Visit https://wasserstoff-mu.vercel.app
   - Upload a document
   - Run a search query
   - Check browser console for errors

---

## 📋 Environment Variables Reference

### Backend (HuggingFace Spaces)

Set in: HuggingFace Space Settings → Repository Secrets

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | API key for GROQ LLM service |

### Frontend (Vercel)

Set in: Vercel Project Settings → Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REACT_APP_API_URL` | Yes | `http://127.0.0.1:8000` | Backend API base URL |

**Production value**: `https://adityasarade-wasserstoff.hf.space`

---

## 🛡️ Security Checklist

Before deploying to production:

- [ ] `GROQ_API_KEY` is set in HuggingFace Spaces secrets (not in code)
- [ ] CORS origins in `backend/app/main.py` include your Vercel domain
- [ ] SSL verification is enabled (`verify=True` in `llm_service.py`)
- [ ] No API keys or secrets in git history
- [ ] `.env` files are in `.gitignore`
- [ ] Production URLs are correct in environment variables

---

## 📊 Monitoring & Logs

### Backend Logs (HuggingFace)

View at: https://huggingface.co/spaces/adityasarade/wasserstoff → Logs tab

Common log patterns:
```
[DEBUG] Extracted chunks from file.pdf: 150
[ERROR] Failed to extract chunks from file.pdf: <error>
```

### Frontend Logs (Vercel)

View at: Vercel Dashboard → Your Project → Deployments → [Select deployment] → Logs

Build logs show:
- npm install output
- Build process
- Deployment status

Runtime logs (serverless functions, if any):
- API requests
- Errors

---

## 🔧 Configuration Files

Key configuration files to maintain:

### Backend
- `Dockerfile` - Container configuration
- `requirements.txt` - Python dependencies
- `app/params.yaml` - Application parameters
- `app/main.py` - CORS and routing

### Frontend
- `package.json` - Node dependencies and scripts
- `.env.production` - Production environment variables
- `public/manifest.json` - PWA configuration

---

## 📞 Support & Resources

- **HuggingFace Spaces Docs**: https://huggingface.co/docs/hub/spaces
- **Vercel Docs**: https://vercel.com/docs
- **GROQ API Docs**: https://console.groq.com/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/

---

## 🎯 Quick Reference Commands

```bash
# Backend local run
cd AiInternTask/chatbot_theme_identifier/backend
uvicorn app.main:app --reload

# Frontend local run
cd AiInternTask/chatbot_theme_identifier/frontend
npm start

# Deploy backend to HuggingFace
git push huggingface main

# Deploy frontend to Vercel (automatic)
git push origin main

# Deploy frontend to Vercel (manual)
cd AiInternTask/chatbot_theme_identifier/frontend && vercel --prod

# Test production backend
curl https://adityasarade-wasserstoff.hf.space/

# View Vercel deployments
vercel ls

# View HuggingFace Space logs
# Visit: https://huggingface.co/spaces/adityasarade/wasserstoff
```

---

**Last Updated**: 2025-11-15
