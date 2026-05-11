import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const newsSnap = await dbAdmin.collection('news').orderBy('date', 'desc').limit(20).get();
    
    const items = newsSnap.docs.map(doc => {
      const data = doc.data();
      // Ensure date is valid for RSS (needs to be RFC 822)
      const pubDate = data.date ? new Date(data.date).toUTCString() : new Date().toUTCString();
      const link = data.url || 'https://aignite.banezglobal.com/news';
      
      return `
    <item>
      <title><![CDATA[${data.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${data.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="${data.url ? 'true' : 'false'}">${data.url || doc.id}</guid>
      <category>${data.category || 'General'}</category>
    </item>`;
    }).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/svg">
<channel>
  <title>Project AIgnite Briefings</title>
  <link>https://aignite.banezglobal.com/news</link>
  <description>Daily briefings on AI in Philippine education.</description>
  <language>en-ph</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="https://aignite.banezglobal.com/news/feed.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
