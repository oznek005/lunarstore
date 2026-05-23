import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Menerima data universal dari frontend (MLBB, Roblox, Free Fire)
    const { game, userId, zoneId, nominal, payment, whatsapp } = body;

    const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

    // Proteksi jika Environment Variable belum di-setting di Netlify
    if (!DISCORD_WEBHOOK) {
      console.error("❌ Error: DISCORD_WEBHOOK_URL belum dikonfigurasi di Netlify.");
      return NextResponse.json(
        { error: 'Sistem belum dikonfigurasi di serverless Netlify.' }, 
        { status: 500 }
      );
    }

    // 1. Inisialisasi variabel tampilan Discord
    let gameName = "UNKNOWN GAME";
    let accountFormat = `${userId || '-'}`;
    let embedColor = 8421504; // Warna Abu-abu Standar

    // 2. Format data spesifik berdasarkan game yang masuk
    if (game === 'mobilelegends') {
      gameName = "🚀 MOBILE LEGENDS";
      accountFormat = `ID: \`${userId || '-'}\` (Zone: \`${zoneId || 'Tanpa Zone'}\`)`;
      embedColor = 3447003; // Biru terang ala ML
    } else if (game === 'freefire') {
      gameName = "🔥 FREE FIRE";
      accountFormat = `ID: \`${userId || '-'}\``;
      embedColor = 15105570; // Oranye ala FF
    } else if (game === 'roblox') {
      gameName = "📦 ROBLOX";
      accountFormat = `${userId || '-'}`; // Untuk Roblox, data login gabungan langsung ditampilkan rapi
      embedColor = 15158332; // Merah ala Roblox
    }

    // 3. Menyusun struktur pesan & embeds untuk webhook Discord (Proteksi || '-')
    const discordMessage = {
      content: `🔔 **ADA PESANAN TOP-UP BARU - ${gameName}** 🔔`,
      embeds: [
        {
          title: `Detail Transaksi - Lunar Store`,
          color: embedColor,
          fields: [
            { name: "🎮 Game", value: gameName, inline: true },
            { name: "💳 Metode Pembayaran", value: `🏦 ${payment?.toUpperCase() || '-'}`, inline: true },
            { name: "💎 Nominal", value: `\`${nominal || '-'}\``, inline: true },
            { name: "👤 Data Akun", value: accountFormat, inline: false },
            { name: "📱 No. WhatsApp", value: `[Hubungi Pembeli](https://wa.me/${whatsapp}) (\`${whatsapp || '-'}\`)`, inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Lunar Store Automation System",
          },
        },
      ],
    };

    // 4. Mengirimkan payload data bersih ke Discord Webhook
    const res = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    // Jika Discord berhasil menerima data
    if (res.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    // Jalur penanganan jika Webhook Discord menolak (misal: struktur bermasalah)
    const errorText = await res.text();
    console.error("❌ Discord Webhook Refused:", errorText);
    return NextResponse.json(
      { error: 'Discord menolak mengirimkan data pesanan.', details: errorText }, 
      { status: 400 }
    );

  } catch (error: any) {
    // Jalur penanganan jika kodingan internal crash (gagal parse json, network loss, dll)
    console.error("❌ Catch Server Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message }, 
      { status: 500 }
    );
  }
}