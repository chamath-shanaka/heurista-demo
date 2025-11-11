This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the signin page.

Open [http://localhost:3000/acc](http://localhost:3000/acc) for user dashboard with shops.


### .env file structure
```env
# Google OAuth and next-auth
GOOGLE_OAUTH_CLIENT_ID=""
GOOGLE_OAUTH_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# Shopify API App
SHOPIFY_API_KEY=""
SHOPIFY_API_SECRET=""
NEXT_PUBLIC_SHOPIFY_API_KEY=""

# Google Gemini API
GEMINI_API_KEY=""

# Supabase
SUPABASE_URL=""
SUPABASE_ANON_PUBLIC_KEY=""

# MongoDB
MONGODB_URI=""

# For encripting tokens
ENCRYPTION_SECRET=""

NEXT_PUBLIC_APP_URL=""

```


### Basic flow

`Google OAuth → [recodes user to MongoDB] → Dashboard → Connect Shopify Store → [recodes store data to MongoDB] → Chat → Gemini API → store conversations to Supabase` 

