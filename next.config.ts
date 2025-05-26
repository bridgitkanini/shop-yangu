/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "cdn.pixabay.com", // <-- Add any additional domains here
    ],
  },
};

module.exports = nextConfig;
