# ========================================
# UISN WEBSITE - DEPLOYMENT GUIDE
# ========================================

## PREREQUISITES
1. Domain name (you have this)
2. Gmail App Password (for sending emails)
3. Railway account (free tier: railway.app)
4. Vercel account (free tier: vercel.com)
5. MongoDB Atlas account (free tier: mongodb.com/atlas)

## STEP 1: SET UP MONGODB ATLAS (Database)

1. Go to https://www.mongodb.com/atlas/database
2. Create free account
3. Create a new cluster (free tier M0)
4. Create database user:
   - Username: `uisn_admin`
   - Password: (save this!)
5. Add IP: 0.0.0.0/0 (allow from anywhere)
6. Get connection string:
   - Click "Connect" > "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://uisn_admin:yourpassword@cluster0.xxxxx.mongodb.net/uisn_db?retryWrites=true&w=majority`

## STEP 2: GET GMAIL APP PASSWORD

1. Go to https://myaccount.google.com/
2. Security > 2-Step Verification (enable if not already)
3. Security > App passwords
4. Select app: Mail
5. Generate password (16 characters)
6. **SAVE THIS PASSWORD!**

## STEP 3: DEPLOY BACKEND TO RAILWAY

1. Go to https://railway.app/
2. Sign up with GitHub
3. Create new project > "Deploy from GitHub repo"
4. Connect your GitHub account
5. Push your code to GitHub first:
   ```bash
   cd /app
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

6. In Railway:
   - Select your repo
   - Railway will auto-detect Python
   - Root directory: `/backend`
   - Build command: (auto-detected)
   - Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

7. Add Environment Variables in Railway:
   ```
   MONGO_URL=your_mongodb_atlas_connection_string
   DB_NAME=uisn_db
   GMAIL_USER=utahintercollegiateservicenetw@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

8. Deploy!
9. Copy your Railway app URL (e.g., `https://your-app.railway.app`)

## STEP 4: DEPLOY FRONTEND TO VERCEL

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Import project from GitHub
4. Configure:
   - Root directory: `/frontend`
   - Framework: Create React App
   - Build command: `yarn build`
   - Output directory: `build`

5. Add Environment Variable:
   ```
   REACT_APP_BACKEND_URL=https://your-app.railway.app
   ```

6. Deploy!
7. Vercel will give you a URL (e.g., `https://your-app.vercel.app`)

## STEP 5: CONNECT YOUR DOMAIN

### In Vercel (for frontend):
1. Go to your project > Settings > Domains
2. Add your domain: `yourdomain.com` and `www.yourdomain.com`
3. Follow DNS configuration instructions
4. Add these records to your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.19.19
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### In Railway (for backend):
1. Go to your project > Settings > Domains
2. Add custom domain: `api.yourdomain.com`
3. Add this to your domain registrar:
   ```
   Type: CNAME
   Name: api
   Value: your-app.up.railway.app
   ```

## STEP 6: UPDATE CORS & ENVIRONMENT VARIABLES

### In Railway, update CORS_ORIGINS:
```
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### In Vercel, update backend URL:
```
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

## STEP 7: INITIALIZE DATABASE

1. Once backend is deployed, call the init endpoint:
   ```bash
   curl -X POST https://api.yourdomain.com/api/cms/initialize
   ```

2. This will populate your database with default data

## FINAL URLS

- Website: `https://yourdomain.com`
- Backend API: `https://api.yourdomain.com`
- Admin Panel: `https://yourdomain.com/admin/login`
  - Username: `admin`
  - Password: `uisn2026`

## IMPORTANT NOTES

1. **Update Admin Password**: After first login, change the password!
2. **Gmail Security**: If emails don't send, check:
   - 2-Step Verification is enabled
   - App password is correct (16 chars, no spaces)
   - Less secure app access is OFF (use app passwords instead)

3. **Railway Free Tier**: 
   - 500 hours/month (enough for a low-traffic site)
   - Sleeps after inactivity (first request will be slow)

4. **Vercel Free Tier**:
   - Unlimited bandwidth
   - 100GB/month

5. **MongoDB Atlas Free Tier**:
   - 512MB storage
   - Shared cluster

## TROUBLESHOOTING

### Backend won't start:
- Check Railway logs
- Verify all environment variables are set
- Check MongoDB connection string

### Emails not sending:
- Verify Gmail app password (no spaces)
- Check Gmail account isn't blocking sign-ins
- Check Railway logs for email errors

### Frontend can't connect to backend:
- Verify REACT_APP_BACKEND_URL is correct
- Check CORS_ORIGINS includes your domain
- Check backend is running (visit api.yourdomain.com/api/)

### CMS data not loading:
- Call /api/cms/initialize endpoint
- Check MongoDB Atlas connection
- Verify DB_NAME matches

## NEED HELP?
Email: utahintercollegiateservicenetw@gmail.com
