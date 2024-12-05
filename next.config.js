/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GEMINIAI_API_KEY: process.env.GEMINIAI_API_KEY,
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
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig 