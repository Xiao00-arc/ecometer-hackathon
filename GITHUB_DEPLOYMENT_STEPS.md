# 🚀 GitHub Integration Commands

## After creating your GitHub repository, run these commands:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
cd "e:\Project ECO"
git remote add origin https://github.com/YOUR_USERNAME/ecometer-hackathon.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Next Steps (After GitHub Push):

### 1. Deploy Backend to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "Deploy from GitHub repo"
4. Select your `ecometer-hackathon` repository
5. Railway will detect the Spring Boot app in `ecometer/` folder
6. Add environment variable: `SPRING_PROFILES_ACTIVE=prod`
7. Railway provides free MySQL database automatically
8. Note your Railway URL: `https://your-app-name.railway.app`

### 2. Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with your GitHub account  
3. Click "Import Project"
4. Select your `ecometer-hackathon` repository
5. Set root directory to `frontend/`
6. Add environment variable:
   ```
   REACT_APP_API_BASE_URL=https://your-railway-url.railway.app/api
   ```
7. Deploy automatically
8. Note your Vercel URL: `https://your-app-name.vercel.app`

### 3. Update CORS (After Deployment)
Update `ecometer/src/main/java/com/example/ecometer/config/WebConfig.java`:
```java
.allowedOrigins(
    "http://localhost:3000",
    "https://your-vercel-url.vercel.app",  // Add your actual Vercel URL
    "https://*.vercel.app"
)
```

### 4. Share with Your Friend
**Send her:** `https://your-vercel-url.vercel.app`

## 🎯 Expected Result
- ✅ Automatic deployments on every git push
- ✅ Your friend sees the same data you do
- ✅ Professional cloud-hosted demo
- ✅ No local setup required for her

## 🔄 Future Updates
1. Make changes locally
2. `git add .`
3. `git commit -m "Update description"`
4. `git push`
5. Auto-deployment happens!