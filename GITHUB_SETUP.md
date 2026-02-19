# GitHub Setup Guide for BlockTime

This guide will help you publish BlockTime to GitHub and optionally deploy it using GitHub Pages.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right and select "New repository"
3. Fill in the repository details:
   - **Repository name**: `blocktime` (or your preferred name)
   - **Description**: "A comprehensive time management app with emotional spectrum tracking"
   - **Visibility**: Public (recommended) or Private
   - **Initialize**: Do NOT check "Add a README file" (we already have one)
4. Click "Create repository"

## Step 2: Upload Your Files

### Option A: Using Git Command Line

If you have Git installed on your computer:

```bash
# Navigate to your blocktime directory
cd /path/to/blocktime

# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: BlockTime v1.0 with Smart Fill feature"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/blocktime.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Web Interface

If you prefer not to use the command line:

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all files from your blocktime directory
3. Add commit message: "Initial commit: BlockTime v1.0 with Smart Fill feature"
4. Click "Commit changes"

## Step 3: Add a Screenshot

To make your README more attractive:

1. Open BlockTime in your browser
2. Fill in some sample time blocks to show the interface
3. Take a screenshot (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)
4. Save it as `screenshot.png`
5. Upload it to your repository root
6. The README.md already references this image

## Step 4: Enable GitHub Pages (Optional)

To make BlockTime accessible via a public URL:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for deployment
7. Your app will be available at: `https://YOUR_USERNAME.github.io/blocktime`

## Step 5: Update Repository Details

1. Go to your repository main page
2. Click the gear icon next to "About"
3. Add:
   - **Description**: "Time management with emotional spectrum tracking"
   - **Website**: Your GitHub Pages URL (if enabled)
   - **Topics**: `time-management`, `productivity`, `javascript`, `emotional-tracking`, `time-blocking`
4. Click "Save changes"

## Files Included in Your Repository

```
blocktime/
├── index.html              # Main application
├── styles.css              # Styling and themes
├── script.js               # Application logic
├── README.md               # Project documentation
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
├── SMART_FILL_FEATURE.md   # Smart Fill documentation
├── BUG_FIX_REPORT.md       # Development notes
├── .gitignore              # Git ignore rules
└── screenshot.png          # (Add this yourself)
```

## Recommended Repository Topics

Add these topics to help people discover your project:

- `time-management`
- `productivity`
- `time-blocking`
- `emotional-tracking`
- `javascript`
- `vanilla-js`
- `web-app`
- `calendar`
- `schedule`
- `self-improvement`

## Next Steps

After publishing to GitHub:

1. **Share your project**: Post on social media, Reddit, or Hacker News
2. **Accept contributions**: Review pull requests from other developers
3. **Track issues**: Use GitHub Issues for bug reports and feature requests
4. **Release versions**: Tag releases when you add major features
5. **Star your own repo**: Show it some love!

## Updating Your Repository

When you make changes to BlockTime:

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add undo feature for Smart Fill"

# Push to GitHub
git push
```

If using GitHub Pages, changes will automatically deploy within a few minutes.

## Need Help?

- [GitHub Docs: Creating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [GitHub Docs: GitHub Pages](https://docs.github.com/en/pages)
- [Git Basics Tutorial](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

---

**Congratulations on publishing BlockTime! 🎉**
