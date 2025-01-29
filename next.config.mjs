/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "zvomobixtewrgsmyijry.supabase.co",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            }
        ]
    }
};

export default nextConfig;
