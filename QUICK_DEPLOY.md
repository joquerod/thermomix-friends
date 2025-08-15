# 🚀 Quick Deploy in 10 Minutes

## Prerequisites
- GitHub account
- Your code pushed to GitHub

## Step 1: Deploy Backend to Render (5 min)

1. **Go to** [render.com](https://render.com) and sign up with GitHub

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**

4. **Configure:**
   - Name: `thermomix-backend`
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

5. **Add Environment Variables:**
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = (leave empty for now)

6. **Click "Create Web Service"**

7. **Copy your backend URL** (like `https://thermomix-backend.onrender.com`)

## Step 2: Deploy Frontend to Vercel (5 min)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Update your backend URL:**
```bash
# Edit .env.production with your Render URL
echo "REACT_APP_API_URL=https://thermomix-backend.onrender.com" > .env.production
```

3. **Deploy to Vercel:**
```bash
cd /Users/jorgequezada/Development/spikes/react/zipcodes/thermomix-friends
vercel --prod
```

4. **Follow prompts:**
   - Login/signup
   - Confirm project settings
   - Wait for deployment

5. **Copy your frontend URL** (like `https://thermomix-friends.vercel.app`)

## Step 3: Update Backend CORS

1. **Go back to Render dashboard**

2. **Environment → Add environment variable:**
   - `FRONTEND_URL` = `https://thermomix-friends.vercel.app`

3. **Trigger redeploy** (or it will auto-redeploy)

## ✅ Done!

Your app is now live at:
- Frontend: `https://thermomix-friends.vercel.app`
- Backend API: `https://thermomix-backend.onrender.com`

## Test Your Deployment

1. Visit your Vercel URL
2. Check that the map loads
3. Click on pins to see popups
4. Verify consultant data appears

## Important Notes

### Free Tier Limitations:
- **Render backend** will sleep after 15 minutes of inactivity
  - First request after sleep takes ~30 seconds (cold start)
  - Subsequent requests are fast
  
- **Vercel frontend** is always fast and available

### For 10 Users This Is Perfect Because:
- 750 free hours/month on Render = always enough
- 100GB bandwidth on Vercel = way more than needed
- Both are completely FREE

## Troubleshooting

### Backend not responding?
- Check Render logs
- Verify CORS includes your Vercel URL
- Wait 30 seconds if it was sleeping

### Map not loading?
- Check browser console for errors
- Verify API URL in Vercel environment variables
- Check network tab for failed requests

### Still having issues?
- Render Dashboard → Logs
- Vercel Dashboard → Functions → Logs
- Check browser console errors

## Alternative: One-Click Deploy

### For Vercel:
1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Add env variable: `REACT_APP_API_URL`
5. Deploy

### For Render:
1. Use the `render.yaml` file included
2. Connect GitHub
3. Auto-deploys on push

## Sharing Your App

Once deployed, share with your 10 users:
```
🗺️ Thermomix Friends Locator
https://thermomix-friends.vercel.app

Find consultants near you!
```

## Future Updates

To update your deployed app:
```bash
# Frontend
git push origin main
# Vercel auto-deploys

# Backend
git push origin main  
# Render auto-deploys
```

Both platforms auto-deploy when you push to GitHub!

---

**Total Cost: $0**
**Time to Deploy: ~10 minutes**
**Users Supported: Way more than 10**