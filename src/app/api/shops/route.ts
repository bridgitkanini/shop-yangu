import { NextResponse } from 'next/server';

const API_URL = 'http://localhost:3001';

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/shops`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error fetching shops:', error);
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/shops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error creating shop:', error);
    return NextResponse.json({ error: 'Failed to create shop' }, { status: 500 });
  }
}