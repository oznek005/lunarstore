import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ambil data universal dari form website kamu
    // game: 'mobilelegends' | 'freefire' | 'roblox'
    const { game, userId, zoneId, nominal, payment, whatsapp } = body;

    const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_WEBHOOK) {
      return NextResponse.json({ error: 'Sistem belum dikonfigurasi' }, { status: 500 });
    }

    // 1. Tentukan Nama Game & Format ID yang Rapi untuk Tampilan Discord
    let gameName = "Unknown Game";
    let accountFormat = `${userId}`;
    let embedColor = 8421504; // Warna abu-abu standar

    if (game === 'mobilelegends') {
      gameName = "MOBILE LEGENDS";
      accountFormat = `ID: ${userId} (${zoneId || 'Tanpa Zone'})`;
      embedColor = 3447003; // Biru terang ala ML
    } else if (game === 'freefire') {
      gameName = "FREE FIRE";
      accountFormat = `ID: ${userId}`;
      embedColor = 15105570; // Oranye ala FF
    } else if (game === 'roblox') {
      gameName = "ROBLOX";
      accountFormat = `Username: ${userId}`;
      embedColor = 15158332; // Merah ala Roblox
    }

    // 2. Bungkus data ke dalam format Embeds yang disukai Discord
    const discordMessage = {
      content: `🔔 **ADA PESANAN TOP-UP BARU - ${gameName}** 🔔`,
      embeds: [
        {
          title: `Detail Transaksi Lunar Store`,
          color: embedColor,
          fields: [
            { name: "Game", value: gameName, inline: true },
            { name: "Data Akun", value: accountFormat, inline: true },
            { name: "Nominal", value: `${nominal}`, inline: true },
            { name: "Metode Pembayaran", value: `🏦 ${payment}`, inline: true },
            { name: "No. WhatsApp", value: `${whatsapp || '-'}`, inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Lunar Store Automation",
          },
        },
      ],
    };

    // 3. Kirim data ke Webhook Discord
    const res = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }
    
    const errorText = await res.text();
    console.error("Discord Error:", errorText);
    return NextResponse.json({ error: 'Gagal mengirim ke Discord', details: errorText }, { status: 400 });

  } catch (error: any) {
    console.error("Catch Server Error:", error);
    return NextResponse.json({ error: 'Server Error', details: error.message }, { status: 500 });
  }
}