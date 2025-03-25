const handler = async (m, { conn, participants, groupMetadata }) => {
  const { welcome, autolevelup, antiBot, antiBot2, autoAceptar, autoRechazar, autoresponder, modoadmin, reaction, nsfw, detect, antiLink, antitoxic, antiTraba, antifake } = global.db.data.chats[m.chat];

  const text = `👑 *𝕔𝕠𝕟𝕗𝕚𝕘𝕦𝕣𝕒𝕔𝕚𝕠𝕟 𝕕𝕖 𝕘𝕣𝕦𝕡𝕠𝕤* 
  
◈ Welcome: ${𝐖𝐞𝐥𝐜𝐨𝐦𝐞 ? 'Activado' : 'Desactivado'}
◈ 𝐀𝐮𝐭𝐨𝐥𝐞𝐯𝐞𝐥𝐮𝐩: ${autolevelup ? 'Activado' : 'Desactivado'} 
◈ 𝐀𝐧𝐭𝐢𝐛𝐨𝐭: ${antiBot ? 'Activado' : 'Desactivado'} 
◈ 𝐀𝐧𝐭𝐢𝐬𝐮𝐛𝐛𝐨𝐭𝐬: ${antiBot2 ? 'Activado' : 'Desactivado'}
◈ 𝐀𝐮𝐭𝐨𝐚𝐜𝐞𝐩𝐭𝐚𝐫: ${autoAceptar ? 'Activado' : 'Desactivado'} 
◈ 𝐀𝐮𝐭𝐨𝐫𝐞𝐜𝐡𝐚𝐳𝐚𝐫: ${autoRechazar ? 'Activado' : 'Desactivado'} 
◈ Au𝐭𝐨𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫: ${autoresponder ? 'Activado' : 'Desactivado'}
◈ 𝐌𝐨𝐝𝐨𝐚𝐝𝐦𝐢𝐧: ${modoadmin ? 'Activado' : 'Desactivado'}
◈ 𝐑𝐞𝐚𝐜𝐭𝐢𝐨𝐧: ${reaction ? 'Activado' : 'Desactivado'}
◈ 𝐍𝐬𝐟𝐰: ${nsfw ? 'Activado' : 'Desactivado'} 
◈ 𝐃𝐞𝐭𝐞𝐜𝐭: ${detect ? 'Activado' : 'Desactivado'} 
◈ 𝐀𝐧𝐭𝐢𝐥𝐢𝐧𝐤: ${antiLink ? 'Activado' : 'Desactivado'} 
◈ 𝐀𝐧𝐭𝐢𝐭𝐨𝐱𝐢𝐜: ${antitoxic ? 'Activado' : 'Desactivado'} 
◈ 𝐀𝐧𝐭𝐢𝐭𝐫𝐚𝐛𝐚: ${antiTraba ? 'Activado' : 'Desactivado'}
◈ 𝐚𝐧𝐭𝐢𝐟𝐚𝐤𝐞: ${antifake ? 'Activado' : 'Desactivado'}

> Nota: ᴘᴜᴇᴅᴇs ᴀᴄᴛɪᴠᴀʀ ᴜɴᴀ ᴅᴇ ᴇsᴛᴀs ᴏᴘᴄɪᴏɴᴇs ᴅᴇ ᴇsᴛᴀ ᴍᴀɴᴇʀᴀ 𝗘𝗷𝗲𝗺𝗽𝗹𝗼: .antilink`.trim();

  await conn.sendFile(m.chat, icons, 'Vegeta.jpg', text, m, true, {
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