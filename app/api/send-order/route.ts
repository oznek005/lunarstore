import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // URL Webhook disimpan di file .env (Sisi Server)
    const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_WEBHOOK) {
      return NextResponse.json({ error: 'Sistem belum dikonfigurasi' }, { status: 500 });
    }

    const res = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Gagal mengirim ke Discord' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}