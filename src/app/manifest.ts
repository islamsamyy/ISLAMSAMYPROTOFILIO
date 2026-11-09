import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Islam Samy — Principal AI Engineer & Full-Stack Architect',
    short_name: 'Islam Samy',
    description: 'Executive Portfolio, Technical Advisory & Autonomous AI Systems Showcase.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0e15',
    theme_color: '#0c0e15',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/artboard-mark.png',
        sizes: '192x192 512x512',
        type: 'image/png',
      },
    ],
  };
}
