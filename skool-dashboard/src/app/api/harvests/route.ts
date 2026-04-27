import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      return NextResponse.json({ harvests: [] });
    }

    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    const harvests = files.map(file => {
      const filePath = path.join(dataDir, file);
      const stats = fs.statSync(filePath);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      const pageProps = content.data?.props?.pageProps;
      const group = pageProps?.currentGroup || pageProps?.allGroups?.[0];
      const groupName = group?.metadata?.displayName || group?.name || 'Unknown Group';

      return {
        id: file,
        name: file,
        timestamp: content.timestamp || stats.mtime.toISOString(),
        groupName: groupName,
        url: content.url
      };
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ harvests });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list harvests' }, { status: 500 });
  }
}
