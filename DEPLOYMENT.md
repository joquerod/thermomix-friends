# Thermomix Friends - Deployment Guide

## Production URLs
- **Frontend:** https://thermomix-friends.vercel.app
- **Backend API:** https://thermomix-friends.onrender.com
- **GitHub:** https://github.com/joquerod/thermomix-friends

## Quick Commands

### Local Development
```bash
# Terminal 1 - Start backend
cd backend && npm start

# Terminal 2 - Start frontend
npm start
```

### Test Production Build Locally
```bash
# Build and serve production frontend
npm run build
npx serve -s build -l 3000

# Test with production backend
# Edit .env.development temporarily:
# REACT_APP_API_URL=https://thermomix-friends.onrender.com
```

## Environment Variables

### Frontend
- **Development:** `.env.development`
  - `REACT_APP_API_URL=http://localhost:3001`
- **Production:** `.env.production`
  - `REACT_APP_API_URL=https://thermomix-friends.onrender.com`

### Backend
- **PORT:** Set by hosting provider (10000 on Render)
- **NODE_ENV:** production (on Render)

## Deployment Services

### Vercel (Frontend)
- **Account:** Login with GitHub
- **Auto-deploy:** On push to main branch
- **Build:** `npm run build`
- **Output:** `build/`
- **Free tier:** 100GB bandwidth/month

### Render (Backend)
- **Service Type:** Web Service
- **Auto-deploy:** On push to main branch
- **Build:** `npm install && npm run build`
- **Start:** `npm start`
- **Free tier:** 750 hours/month

## Important Files

### Required for Deployment
- `backend/consultants-with-coords.json` - MUST be in repo (contains cached geocoded data)
- `render.yaml` - Render configuration
- `vercel.json` - Vercel configuration
- `.env.production` - Production environment variables

### Data Files
- `backend/consultants.csv` - Source data (1369 consultants)
- `backend/consultants-with-coords.json` - Geocoded cache (1191 with coordinates)

## Monitoring

### Backend Health Check
```bash
curl https://thermomix-friends.onrender.com/health
```

### API Test
```bash
curl https://thermomix-friends.onrender.com/api/consultants | head
```

## Troubleshooting

### Backend not loading cached data
- Ensure `backend/consultants-with-coords.json` is committed to git
- Check logs on Render dashboard for "Loading consultants from cache..."

### Frontend not connecting to backend
- Verify `REACT_APP_API_URL` environment variable in Vercel dashboard
- Check browser console for CORS errors
- Ensure backend is running (check /health endpoint)

### After code changes
1. Commit and push to GitHub
2. Both services auto-deploy (2-3 minutes)
3. Check deployment logs in respective dashboards

## Support
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Render Dashboard:** https://dashboard.render.com
- **GitHub Repo:** https://github.com/joquerod/thermomix-friends