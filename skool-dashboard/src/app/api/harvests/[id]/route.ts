import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'data', id);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Harvest not found' }, { status: 404 });
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch harvest' }, { status: 500 });
  }
}
