const handler = async (m, { conn, participants, groupMetadata }) => {
  const { welcome, autolevelup, antiBot, antiBot2, autoAceptar, autoRechazar, autoresponder, modoadmin, reaction, nsfw, detect, antiLink, antitoxic, antiTraba, antifake } = global.db.data.chats[m.chat];

  const text = `👑 *ℂ𝕆ℕ𝔽𝕀𝔾𝕌ℝ𝔸ℂ𝕀𝕆ℕ 𝔻𝔼 𝔾ℝ𝕌ℙ𝕆* 
  
◈ Welcome: ${welcome ? 'Activado' : 'Desactivado'}
◈ Autolevelup: ${autolevelup ? 'Activado' : 'Desactivado'} 
◈ Antibot: ${antiBot ? 'Activado' : 'Desactivado'} 
◈ Antisubbots: ${antiBot2 ? 'Activado' : 'Desactivado'}
◈ Autoaceptar: ${autoAceptar ? 'Activado' : 'Desactivado'} 
◈ Autorechazar: ${autoRechazar ? 'Activado' : 'Desactivado'} 
◈ Autoresponder: ${autoresponder ? 'Activado' : 'Desactivado'}
◈ Modoadmin: ${modoadmin ? 'Activado' : 'Desactivado'}
◈ Reaction: ${reaction ? 'Activado' : 'Desactivado'}
◈ Nsfw: ${nsfw ? 'Activado' : 'Desactivado'} 
◈ Detect: ${detect ? 'Activado' : 'Desactivado'} 
◈ Antilink: ${antiLink ? 'Activado' : 'Desactivado'} 
◈ Antitoxic: ${antitoxic ? 'Activado' : 'Desactivado'} 
◈ Antitraba: ${antiTraba ? 'Activado' : 'Desactivado'}
◈ antifake: ${antifake ? 'Activado' : 'Desactivado'}

> Nota: ᴘᴜᴇᴅᴇs ᴀᴄᴛɪᴠᴀʀ ᴜɴᴀ ᴅᴇ ᴇsᴛᴀs ᴏᴘᴄɪᴏɴᴇs ᴅᴇ ᴇsᴛᴀ ᴍᴀɴᴇʀᴀ 𝗘𝗷𝗲𝗺𝗽𝗹𝗼: .antilink`.trim();

  await conn.sendFile(m.chat, icons, 'yuki.jpg', text, m, true, {
    contextInfo: {
      forwardingScore: 200,
      isForwarded: false,
      externalAdReply: {
        showAdAttribution: true,
        renderLargerThumbnail: false,
        title: packname,
        body: dev,
        mediaType: 1,
        sourceUrl: redes,
        thumbnailUrl: icono
      }
    }
  }, { mentions: [m.sender] });

  m.react(emoji);
};

handler.help = ['configuraciongrupo'];
handler.tags = ['grupo'];
handler.command = ['on', 'off', 'config'];
handler.register = true;
handler.group = true;

export default handler;