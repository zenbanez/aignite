import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Facebot',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/api'],
      },
      {
        userAgent: ['CCBot', 'anthropic-ai', 'GPTBot', 'Google-Extended', 'Bytespider', 'omgili'],
        disallow: '/',
      },
    ],
    sitemap: 'https://aignite.banezglobal.com/sitemap.xml',
  };
}
