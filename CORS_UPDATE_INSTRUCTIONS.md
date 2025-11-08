# 🔧 CORS Update Required

After deploying to Vercel, you'll need to update the CORS configuration.

## Replace YOUR_VERCEL_URL in WebConfig.java:

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000",
                "https://YOUR_VERCEL_URL.vercel.app",  // Replace with actual URL
                "https://*.vercel.app"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```

## Then commit and push the update:
```bash
git add .
git commit -m "Update CORS for production URL"
git push
```

Railway will auto-redeploy with the new CORS settings!