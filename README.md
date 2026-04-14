# Dineth Portfolio

Next.js portfolio site for Dineth Perera.

## Local Development

```bash
npm install
npm run dev
```

## Static Build

```bash
npm run build
```

This project is configured for static export, so the build output is generated in `out/` and can be published on GitHub Pages.

## GitHub Pages Publishing

1. Push the repository to GitHub.
2. In the repository settings, open `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` to trigger the workflow in `.github/workflows/deploy-pages.yml`.

If the repository is a project site such as `username/repository-name`, the app automatically uses `/repository-name` as the base path during the GitHub Actions build.

## Assets

- Slideshow images live in `public/images/slideshow/`
- Hero diffusion image lives in `public/images/slideshow/diffuse/IMG_0309.JPG`
- If you want the resume button to work on the live site, add `public/cv.pdf`
