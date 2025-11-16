import lingoCompiler from "lingo.dev/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GEMINIAI_API_KEY: process.env.GEMINIAI_API_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "api.producthunt.com",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                ],
            },
        ];
    },
};

const withLingo = lingoCompiler.next({
    sourceRoot: "src/app", // Set to your app directory
    lingoDir: "lingo",
    sourceLocale: "en",
    targetLocales: ["es"], // Example: Add Spanish as a target locale
    rsc: true, // Required for Next.js App Router
    useDirective: false,
    debug: false,
    models: "lingo.dev",
});

export default withLingo(nextConfig);