# Photo Setup

To add your profile photo:

1. Add your photo as `/public/images/profile.jpg`
2. Recommended: square crop, minimum 800×800px, good lighting
3. The particle system will automatically sample this image
4. For best results, use a photo with clear contrast against background

# Deployment to Vercel

1. Push your code to a GitHub repository
2. Go to https://vercel.com and create an account
3. Click "Add New Project" → Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_GITHUB_USERNAME` = `Dineth14`
   - `NEXT_PUBLIC_SITE_URL` = your domain
5. Click "Deploy"
6. Set up custom domain in Vercel project settings → Domains

HTTPS is automatic — no configuration needed.

# Running Locally

```bash
npm run dev   # starts development server at localhost:3000
npm run build # builds for production (check for errors)
npm run start # runs production build locally
```

# Deploying Changes

```bash
git add .
git commit -m "update: describe what you changed"
git push
```

Vercel automatically redeploys in ~2 minutes.
