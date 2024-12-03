/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    reactStrictMode: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",  // for Google auth profile images
            "your-domain-if-any.com", // Add if you're using external image domains
        ],
    },
}

module.exports = nextConfig 