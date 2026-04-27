import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, data, timestamp, domPosts } = body;

    // Use a clean version of the group name or handle for the filename
    const pageProps = data?.props?.pageProps;
    const group = pageProps?.currentGroup || pageProps?.allGroups?.[0];
    const groupHandle = group?.name || 'unknown-group';
    const fileName = `${groupHandle}.json`;
    
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const filePath = path.join(dataDir, fileName);
    
    let existingData: any = {};
    if (fs.existsSync(filePath)) {
      try {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        existingData = {};
      }
    }

    // Extract posts from the current payload
    const newPosts = domPosts || pageProps?.feed?.posts || pageProps?.initialState?.groupFeed?.posts || [];
    
    // Merge posts, avoiding duplicates based on post ID
    const existingPosts = existingData.domPosts || [];
    const postMap = new Map();
    
    // Add existing posts to map
    existingPosts.forEach((p: any) => postMap.set(p.id || p.title, p));
    // Add new posts to map (overwriting if ID matches)
    newPosts.forEach((p: any) => postMap.set(p.id || p.title, p));
    
    const mergedPosts = Array.from(postMap.values());

    // Construct the final merged object
    const finalData = {
      url: url || existingData.url,
      timestamp: timestamp, // Keep latest timestamp
      data: data || existingData.data, // Keep latest metadata
      domPosts: mergedPosts
    };

    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: `Intelligence updated for ${groupHandle}`,
      postCount: mergedPosts.length 
    });
  } catch (error: any) {
    console.error('Ingest error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
