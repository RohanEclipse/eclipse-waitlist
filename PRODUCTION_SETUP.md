# Production Setup Guide

## Environment Variables

### Local Development

Create `.env.local` at the repo root with:

```env
# Firebase Client SDK (from Firebase Console > Project Settings > General)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Firebase Admin SDK - Local Development
# Option 1: Use service account file (recommended for local)
GOOGLE_APPLICATION_CREDENTIALS=C:/path/to/serviceAccountKey.json

# Option 2: Use JSON directly (alternative)
# FIREBASE_ADMIN_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
```

### Production (Vercel)

In Vercel dashboard, add these environment variables:

**Required:**
- `FIREBASE_ADMIN_CREDENTIALS_JSON` - Full service account JSON as a single string
  - Get from: Firebase Console > Project Settings > Service Accounts > Generate new private key
  - Copy the entire JSON object and paste as the value
  - Example: `{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}`

**Client SDK (NEXT_PUBLIC_*):**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## How It Works

The Firebase Admin initialization (`src/firebaseAdmin.js`) automatically detects the environment:

1. **Production (Vercel)**: Uses `FIREBASE_ADMIN_CREDENTIALS_JSON` env var
2. **Local Development**: Falls back to `GOOGLE_APPLICATION_CREDENTIALS` file path

This allows the same code to work in both environments without changes.

## Git Safety

The following files are ignored and will NOT be committed:
- `serviceAccountKey.json` (local service account file)
- `.env.local` (local environment variables)
- `.env*` (all env files)

## Testing

After deployment, test the invite flow:
1. Validate endpoint: `https://your-domain.com/api/invite/validate?code=TEST1`
2. Submit endpoint: Use the UI form with a valid invite code
3. Verify Firestore updates correctly
