# UISN Deployment & Email Setup Guide

## Overview
This guide will help you deploy your UISN landing page and set up email notifications for form submissions.

---

## Part 1: Email Setup (Gmail App Password)

### Why You Need This
When someone fills out a volunteer form, partnership request, or newsletter signup, you'll receive an email notification at `utahintercollegiateservicenetw@gmail.com`.

### Step-by-Step Instructions

1. **Go to your Google Account Security Settings**
   - Visit: https://myaccount.google.com/security
   - Sign in with `utahintercollegiateservicenetw@gmail.com`

2. **Enable 2-Step Verification** (if not already enabled)
   - Click "2-Step Verification"
   - Follow the prompts to set it up

3. **Create an App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as the device and name it "UISN Website"
   - Click "Generate"
   - **Copy the 16-character password** (looks like: `xxxx xxxx xxxx xxxx`)

4. **Give me the App Password**
   - Share the generated password with me (without spaces)
   - I'll configure the backend to send emails

---

## Part 2: Database Setup (MongoDB Atlas)

### Create a Free MongoDB Atlas Account

1. **Sign Up**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select a region close to you (e.g., US East)
   - Name it "uisn-cluster"

3. **Set Up Database Access**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Create a username (e.g., `uisn_admin`)
   - Create a strong password (save this!)
   - Set privileges to "Read and write to any database"

4. **Set Up Network Access**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for now)

5. **Get Your Connection String**
   - Go to "Database" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://uisn_admin:<password>@uisn-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

---

## Part 3: Deploy Backend to Railway

### Step 1: Prepare Your GitHub Repository
First, save your code to GitHub using the "Save to GitHub" button in the chat.

### Step 2: Deploy on Railway

1. **Sign Up for Railway**
   - Go to: https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your UISN repository
   - Select the `/backend` folder as the root directory

3. **Add Environment Variables**
   Click "Variables" and add:
   ```
   MONGO_URL=mongodb+srv://uisn_admin:YOUR_PASSWORD@uisn-cluster.xxxxx.mongodb.net/uisn_db?retryWrites=true&w=majority
   DB_NAME=uisn_db
   EMAIL_ADDRESS=utahintercollegiateservicenetw@gmail.com
   EMAIL_PASSWORD=your_app_password_here
   ```

4. **Generate Domain**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy the URL (e.g., `https://uisn-backend-production.up.railway.app`)

---

## Part 4: Deploy Frontend to Vercel

### Step 1: Deploy on Vercel

1. **Sign Up for Vercel**
   - Go to: https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set the root directory to `frontend`

3. **Configure Environment Variables**
   Add this environment variable:
   ```
   REACT_APP_BACKEND_URL=https://your-railway-backend-url.up.railway.app
   ```
   (Replace with your actual Railway URL from Part 3)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

5. **Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Follow the DNS configuration instructions

---

## Part 5: Post-Deployment Checklist

After deploying, verify these work:

- [ ] Homepage loads correctly
- [ ] Programs section shows all 4 programs
- [ ] SnowServes event displays with image
- [ ] Event detail page works (`/event/1`)
- [ ] Volunteer form submits successfully
- [ ] Newsletter signup works
- [ ] Admin login works (`/admin/login`)
- [ ] Admin can add/edit/delete events
- [ ] Form submissions send email notifications

---

## Quick Reference

| Service | URL |
|---------|-----|
| Frontend (Vercel) | `https://your-app.vercel.app` |
| Backend (Railway) | `https://your-backend.up.railway.app` |
| MongoDB Atlas | `https://cloud.mongodb.com` |
| Admin Panel | `your-domain.com/admin/login` |

| Credentials | Value |
|-------------|-------|
| Admin Username | `admin` |
| Admin Password | `uisn2026` |

---

## Need Help?

If you get stuck at any step, let me know:
1. Which step you're on
2. Any error messages you see
3. Screenshots if possible

I'll help you troubleshoot!
