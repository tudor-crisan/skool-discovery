import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, url, timestamp } = body;

    // Extract group name from URL or data
    const urlObj = new URL(url);
    const groupName = urlObj.pathname.split('/')[1] || 'unknown';

    const fileName = `${groupName}-${new Date().getTime()}.json`;
    const dataDir = path.join(process.cwd(), 'data');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    fs.writeFileSync(
      path.join(dataDir, fileName),
      JSON.stringify(body, null, 2)
    );

    console.log(`Saved data to ${fileName}`);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error('Error ingesting data:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
