# How to Push Changes to GitHub

## 1. Check what's changed
```bash
git status
```

## 2. Stage all changes
```bash
git add .
```

## 3. Commit with a message
```bash
git commit -m "refactor: backend and frontend architecture overhaul

Backend:
- Renamed backened/ to backend/ (typo fix)
- Added service layer (url.service.ts)
- Added error handler middleware
- Fixed click count race condition
- Added /api/url/stats/:code endpoint

Frontend:
- Broke App.tsx into components (Navbar, Hero, ResultCard, HistoryList)
- Added centralized API service (src/services/api.ts)
- Added real-time click polling
- Fixed duplicate history entries
- Moved resume.pdf to correct folder (client/public/)

Misc:
- Added .gitignore
- Rewrote README.md"
```

## 4. Push to GitHub
```bash
git push origin main
```

---

## If git push asks for login
```bash
git remote set-url origin https://your-github-username@github.com/Rohitdhakal1/ShrinkIt-url-shortner.git
git push origin main
```
