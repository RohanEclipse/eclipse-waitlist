# Clean Next.js Build Cache

## Quick Clean (Recommended)

```powershell
# Kill all Node processes
taskkill /IM node.exe /F

# Clean .next cache
npm run clean

# Restart dev server
npm run dev
```

## Full Clean (If Quick Clean Doesn't Work)

```powershell
# Kill all Node processes
taskkill /IM node.exe /F

# Clean all caches
npm run clean:all

# Restart dev server
npm run dev
```

## Manual Clean Steps

1. **Kill Node processes:**
   ```powershell
   taskkill /IM node.exe /F
   ```

2. **Delete .next directory:**
   ```powershell
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   ```

3. **Optional: Clear node_modules cache:**
   ```powershell
   Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
   ```

4. **Restart dev server:**
   ```powershell
   npm run dev
   ```

## OneDrive Issue

If you continue to see `EINVAL readlink` errors, **move the repository out of OneDrive**:

1. **Move repo to a local directory:**
   ```powershell
   # Example: Move to C:\dev
   Move-Item "C:\Users\dhir\OneDrive\Desktop\eclipse-waitlist" "C:\dev\eclipse-waitlist"
   ```

2. **Update your working directory:**
   ```powershell
   cd C:\dev\eclipse-waitlist
   ```

3. **Restart dev server:**
   ```powershell
   npm run dev
   ```

**Why?** OneDrive on Windows can interfere with Next.js's use of symlinks in the `.next` directory, causing `EINVAL readlink` errors. Moving the repo to a non-synced location (like `C:\dev`) resolves this.
