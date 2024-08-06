/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'coursera-university-assets.s3.amazonaws.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 's3.techplay.jp',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'nextui.org',
        pathname: '**'
      }

    ],
  }
};

module.exports = nextConfig
