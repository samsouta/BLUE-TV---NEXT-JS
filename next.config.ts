import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: [
    //   'www.pornkut.com', 'cdn.avfever.net','files.catbox.moe','www.x1hub.com',
    //   'i.pinimg.com','fit.porn','i.ibb.co','i.imgur.com','91porn.asia','www.ssis.bz',
    //   'fapix.porn','cdn.123av.ws','img.freepornvideos.xxx'
    // ], // Add the external hostname here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all HTTP domains
      }
    ],
  },
};

export default nextConfig;
