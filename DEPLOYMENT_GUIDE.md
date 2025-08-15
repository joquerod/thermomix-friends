# Free Deployment Options for Thermomix Friends App

## 🚀 Recommended: Vercel (Frontend) + Render (Backend)

### Why This Combo?
- **Vercel**: Perfect for React apps, automatic HTTPS, great performance
- **Render**: Free tier for backend, automatic deploys, persistent disk storage
- **Both**: Zero cost for your use case (10 users)

---

## Option 1: Vercel + Render (⭐ BEST CHOICE)

### Step 1: Deploy Frontend to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Build the React app:**
```bash
npm run build
```

3. **Deploy to Vercel:**
```bash
vercel
```
- Follow prompts
- Choose "Create React App"
- Get URL like: `https://thermomix-friends.vercel.app`

4. **Set Environment Variable in Vercel:**
```bash
vercel env add REACT_APP_API_URL
# Enter: https://your-backend.onrender.com
```

### Step 2: Deploy Backend to Render

1. **Create account at** [render.com](https://render.com)

2. **Prepare backend for deployment:**

Create `backend/package.json` scripts:
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "ts-node src/server.ts"
  }
}
```

3. **Create `backend/render.yaml`:**
```yaml
services:
  - type: web
    name: thermomix-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

4. **Push to GitHub and connect to Render**

5. **Update CORS in backend:**
```typescript
app.use(cors({
  origin: [
    'https://thermomix-friends.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

**Free Tier Limits:**
- Vercel: 100GB bandwidth/month
- Render: 750 hours/month, spins down after 15 min inactivity

---

## Option 2: Netlify + Cyclic.sh

### Frontend on Netlify:
```bash
# Build
npm run build

# Deploy
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Backend on Cyclic:
1. Sign up at [cyclic.sh](https://cyclic.sh)
2. Connect GitHub repo
3. Deploy backend folder
4. Get URL like: `https://app-name.cyclic.app`

**Free Tier:**
- Netlify: 100GB bandwidth/month
- Cyclic: 10,000 requests/month

---

## Option 3: GitHub Pages + Railway

### Frontend on GitHub Pages:
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/thermomix-friends",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

### Backend on Railway:
1. Sign up at [railway.app](https://railway.app)
2. Deploy from GitHub
3. Add environment variables
4. Get URL like: `https://project.up.railway.app`

**Free Tier:**
- GitHub Pages: Unlimited for public repos
- Railway: $5 free credits/month

---

## Option 4: Single Platform - Fly.io (Full Stack)

Deploy both frontend and backend together:

1. **Create Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app

# Build backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
RUN cd backend && npm run build

# Build frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve both
EXPOSE 3001
CMD ["node", "backend/dist/server.js"]
```

2. **Deploy:**
```bash
fly launch
fly deploy
```

**Free Tier:** 
- 3 shared VMs
- 3GB persistent storage

---

## Option 5: Replit (Easiest, All-in-One)

1. Go to [replit.com](https://replit.com)
2. Import from GitHub
3. Click "Run"
4. Done! Get URL like: `https://thermomix-friends.username.repl.co`

**Free Tier:**
- Always-on deployment
- 500MB storage
- Custom domain

---

## 🎯 Quick Deployment Checklist

### For Vercel + Render (Recommended):

#### Backend Prep:
```bash
cd backend

# 1. Update CORS
# Edit server.ts to include your Vercel URL

# 2. Ensure TypeScript builds
npm run build

# 3. Test production build
NODE_ENV=production node dist/server.js
```

#### Frontend Prep:
```bash
# 1. Update API URL
echo "REACT_APP_API_URL=https://your-app.onrender.com" > .env.production

# 2. Build
npm run build

# 3. Test build
npx serve -s build
```

---

## Environment Variables Setup

### Frontend (.env.production):
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (on hosting platform):
```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-url.com
```

---

## Post-Deployment Tasks

1. **Update CORS origins** in backend
2. **Test all features:**
   - [ ] Map loads
   - [ ] Pins display
   - [ ] Popups work
   - [ ] Data loads from API
3. **Monitor logs** for errors
4. **Set up error tracking** (optional - Sentry free tier)

---

## Comparison Table

| Platform | Frontend | Backend | Pros | Cons | Best For |
|----------|----------|---------|------|------|----------|
| Vercel + Render | Vercel | Render | Fast, reliable | Backend sleeps after 15min | Production |
| Netlify + Cyclic | Netlify | Cyclic | Good free tiers | Request limits | Low traffic |
| GitHub Pages + Railway | GH Pages | Railway | Free for public | Limited credits | Open source |
| Fly.io | Both | Both | Single deploy | Learning curve | Full control |
| Replit | Both | Both | Easiest | Performance | Quick demo |

---

## 🏃 Quickest Path (15 minutes)

### Use Vercel + Render:

1. **Push to GitHub:**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Deploy Frontend:**
```bash
npx vercel --prod
```

3. **Deploy Backend:**
- Go to render.com
- New > Web Service
- Connect GitHub repo
- Select backend folder
- Deploy

4. **Update environment variables** on both platforms

5. **Done!** Share your URLs

---

## Cost Analysis for 10 Users

**All options are FREE for your use case:**
- 10 users = ~1000 requests/day max
- ~10GB bandwidth/month max
- All platforms offer more than enough

**When you might need to pay:**
- Over 100 concurrent users
- Need guaranteed uptime
- Want custom domain
- Need faster backend (no cold starts)

---

## Security Checklist

Before deploying:
- [ ] Remove all console.logs with sensitive data
- [ ] Set NODE_ENV=production
- [ ] Update CORS to specific domains
- [ ] Don't commit .env files
- [ ] Use environment variables for API URLs
- [ ] Ensure HTTPS everywhere

---

## Domain Options (Optional)

**Free subdomains:**
- `yourapp.vercel.app`
- `yourapp.netlify.app`
- `yourapp.onrender.com`

**Custom domain (~$12/year):**
- Buy from Namecheap/Google Domains
- Point to your hosting
- All platforms support custom domains free

---

## Need Help?

Common deployment issues:
1. **Build fails**: Check Node version matches local
2. **API not working**: Check CORS and environment variables
3. **Slow loading**: Normal for free tiers (cold starts)
4. **Data not persisting**: Ensure cached JSON file is included