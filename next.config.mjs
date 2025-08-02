/** @type {import('next').NextConfig} */
const nextConfig = {
   // Performance optimizations
   poweredByHeader: false,
   compress: true,

   // Image optimization
   images: {
      formats: ["image/webp", "image/avif"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
         {
            protocol: "https",
            hostname: "images.puma.com",
         },
         {
            protocol: "https",
            hostname: "assets.adidas.com",
         },
         {
            protocol: "https",
            hostname: "static.nike.com",
         },
      ],
      // Handle image loading errors gracefully
      unoptimized: process.env.NODE_ENV === "development",
   },

   // Headers for better caching and security
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "X-Frame-Options",
                  value: "DENY",
               },
               {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
               },
               {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
               },
            ],
         },
         {
            source: "/static/(.*)",
            headers: [
               {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
               },
            ],
         },
      ];
   },

   // Experimental features for better performance (removed optimizeCss)
   experimental: {
      optimizePackageImports: ["react-icons"],
   },

   // Webpack optimizations
   webpack: (config, { dev, isServer }) => {
      // Production optimizations
      if (!dev && !isServer) {
         config.optimization.splitChunks = {
            chunks: "all",
            cacheGroups: {
               vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: "vendors",
                  priority: 10,
                  enforce: true,
               },
            },
         };
      }

      return config;
   },
};

export default nextConfig;
