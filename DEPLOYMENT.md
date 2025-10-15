# Deployment Instructions

This document provides step-by-step instructions for deploying the MIDI Music Theory Visualizer to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine (optional, can use GitHub web interface)

## Method 1: Deploy via GitHub Web Interface (Easiest)

### Step 1: Create a New Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Enter repository name: `midi-visualizer` (or your preferred name)
5. Add description: "A web app that visualizes MIDI files on guitar fretboard and piano roll"
6. Choose **Public** (required for free GitHub Pages)
7. **Do NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **"Create repository"**

### Step 2: Upload Files

1. On the repository page, click **"uploading an existing file"**
2. Drag and drop all files from the `midi-visualizer-github` folder:
   - `index.html`
   - `README.md`
   - `LICENSE`
   - `CONTRIBUTING.md`
   - `_config.yml`
   - `.gitignore`
   - `samples/` folder with its contents
3. Add commit message: "Initial commit: MIDI Music Theory Visualizer"
4. Click **"Commit changes"**

### Step 3: Enable GitHub Pages

1. Go to repository **Settings** (gear icon)
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **"Save"**
5. Wait 1-2 minutes for deployment
6. Your site will be live at: `https://YOUR-USERNAME.github.io/midi-visualizer/`

## Method 2: Deploy via Command Line (Advanced)

### Step 1: Create Repository on GitHub

1. Go to GitHub and create a new repository (see Method 1, Step 1)
2. Copy the repository URL (e.g., `https://github.com/YOUR-USERNAME/midi-visualizer.git`)

### Step 2: Push Files from Local Machine

```bash
# Navigate to the project directory
cd /path/to/midi-visualizer-github

# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/midi-visualizer.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

Follow Method 1, Step 3 to enable GitHub Pages via the web interface.

## Method 3: Deploy to Your Own Domain (Optional)

If you have a custom domain:

1. Follow either Method 1 or Method 2 to deploy to GitHub Pages
2. In repository Settings → Pages, add your custom domain
3. Create a `CNAME` file in the repository root with your domain name
4. Configure your domain's DNS settings to point to GitHub Pages:
   ```
   CNAME record: www → YOUR-USERNAME.github.io
   A records:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

## Updating the Deployment

### Via Web Interface

1. Navigate to the file you want to edit on GitHub
2. Click the pencil icon (Edit)
3. Make your changes
4. Commit directly to the `main` branch
5. Changes will be live in 1-2 minutes

### Via Command Line

```bash
# Make your changes locally
# Stage the changes
git add .

# Commit the changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

## Verifying Deployment

1. Visit your GitHub Pages URL
2. Test the following features:
   - Upload a MIDI file
   - Select a sample MIDI
   - Play/pause/stop controls
   - Change tuning and notation settings
   - Adjust theme color
   - Check responsiveness on mobile

## Troubleshooting

### Site Not Loading

- **Wait**: GitHub Pages can take up to 10 minutes for first deployment
- **Check Settings**: Ensure GitHub Pages is enabled in Settings → Pages
- **Check Branch**: Make sure you selected the correct branch (`main`)
- **Check Files**: Verify `index.html` is in the root directory

### 404 Error

- Ensure the repository is **Public**
- Check that `index.html` exists in the root
- Try accessing `https://YOUR-USERNAME.github.io/midi-visualizer/index.html` directly

### MIDI Files Not Loading

- Check browser console for errors (F12)
- Ensure MIDI files are valid `.mid` or `.midi` format
- Try the built-in samples first to verify functionality

### Styling Issues

- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that all CSS is embedded in `index.html`
- Verify no external stylesheet links are broken

## Performance Optimization

For better performance on GitHub Pages:

1. **Enable HTTPS**: GitHub Pages provides free SSL
2. **Use CDN**: The MIDI parser library is already loaded from CDN
3. **Optimize Images**: If you add screenshots, use compressed formats
4. **Minify Code**: Consider minifying HTML/CSS/JS for production

## Security Considerations

- The application runs entirely client-side (no server required)
- MIDI files are processed locally in the browser
- No user data is collected or transmitted
- All code is open source and auditable

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Open an issue in the repository
4. Check browser console for error messages

---

**Congratulations!** Your MIDI Music Theory Visualizer is now live on the web! 🎉
