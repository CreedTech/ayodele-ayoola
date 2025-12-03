import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'rentspace.tech' },
      { protocol: 'https', hostname: 'vanguardngr.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'zummitafrica.com' },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },



    ],
  },
};

export default nextConfig;
