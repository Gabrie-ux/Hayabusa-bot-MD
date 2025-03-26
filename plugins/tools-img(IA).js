import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { 
      text: '*🚀 falta el texto para generar la imagen*' 
    }, { quoted: m });
    return;
  }

  m.react('✨');
  await conn.sendMessage(m.chat, { 
    text: `*🚀Estoy generando tu imagen en la galaxia*` 
  }, { quoted: m });

  try {
    const res = await fetch(`https://api.agungny.my.id/api/text2img?prompt=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const buffer = await res.buffer();
    m.react('🪄');

    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: '*🚀 se generó tu imagen galáctica ✅*'
    }, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, { 
      text: '*🚨 𝑯𝒂 𝒐𝒄𝒖𝒓𝒓𝒊𝒅𝒐 𝒖𝒏 𝒆𝒓𝒓𝒐𝒓 😔*' 
    }, { quoted: m });
  }
};

handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['imgIA', 'imgg', 'Imgia'];

export default handler;