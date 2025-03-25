/*export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) {
    return;
  }

  // Legnita good 
  const match = global.prefix.exec(m.text);
  const usedPrefix = match ? match[0] : "";
  
  const command = m.text.slice(usedPrefix.length).trim().split(" ")[0].toLowerCase();

  if (!command) return;

  // muevo before
  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat.isBanned) {
      const avisoDesactivado = `❄️ *𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃* 𝒆𝒔𝒕𝒂 𝒇𝒖𝒆𝒓𝒂 𝒅𝒆 𝒔𝒆𝒓𝒗𝒊𝒄𝒊𝒐 𝒆𝒏 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐 *${chat.name}*.\n\n> ⛰️ 𝑼𝒏 *𝑨𝒅𝒎𝒊𝒏* 𝒑𝒖𝒆𝒅𝒆 𝒂𝒄𝒕𝒊𝒗𝒂𝒓𝒍𝒐 𝒖𝒔𝒂𝒏𝒅𝒐 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 *${usedPrefix}𝒃𝒐𝒕 𝒐𝒏*`;
      await m.reply(avisoDesactivado);
      return;
    }

    user.commands = (user.commands || 0) + 1;
  } else {
    await m.reply(`❌ *𝑬𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐* 《 *${command}* 》*𝒏𝒐 𝒆𝒙𝒊𝒔𝒕𝒆* 𝒆𝒏 𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃.\n\n*‼️ 𝑴𝒂𝒔 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆𝒍 𝒃𝒐𝒕 𝒖𝒔𝒂 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐* *${usedPrefix}𝗠𝗘𝗡𝗨* 𝑒𝑛 𝑒𝑙 𝑔𝑟𝑢𝑝𝑜.`);
  }
}

// Función optimizada y movida fuera de before
function validCommand(command, plugins) {
  return Object.values(plugins).some(plugin =>
    plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)
  );
}*/