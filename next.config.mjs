/** @type {import('next').NextConfig} */
const nextConfig = {
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: "https",
  //         hostname: "images.pexels.com",
  //         port: "",
  //         pathname: "/photos/.*",
  //       },
  //     ],
  //   },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.pexels.com", "static.wixstatic.com"],
  },
};

export default nextConfig;
