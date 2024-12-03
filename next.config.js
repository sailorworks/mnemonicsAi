/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    reactStrictMode: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",  // for Google auth profile images
        ],
    },
}

module.exports = nextConfig 