export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) {
    return;
  }

 const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
        return true;
      }
    }
    return false;
  };

  if (!command) return;

  if (command === "bot") {
    return;
  }

  if (validCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat.isBanned) {
      const avisoDesactivado = `❄️ *𝑽𝒆𝒈𝒆𝒕𝒂* 𝒆𝒔𝒕𝒂 𝒇𝒖𝒆𝒓𝒂 𝒅𝒆 𝒔𝒆𝒓𝒗𝒊𝒄𝒊𝒐 𝒆𝒏 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐 *${chat.name}*.\n\n> ⛰️ 𝑼𝒏 *𝑨𝒅𝒎𝒊𝒏* 𝒑𝒖𝒆𝒅𝒆 𝒂𝒄𝒕𝒊𝒗𝒂𝒓𝒍𝒐 𝒄𝒐𝒏 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 *${usedPrefix}𝑩𝒐𝒕 𝒐𝒏*`;
      await m.reply(avisoDesactivado);
      return;
    }

    if (!user.commands) {
      user.commands = 0;
    }
    user.commands += 1;
  } else {
    const comando = m.text.trim().split(' ')[0];
    await m.reply(`🔮*ᴇʟ ᴄᴏᴍᴀɴᴅᴏ* 《 *${comando}* 》*ɴᴏ ᴇxɪsᴛᴇ*\n\n*🔮 ᴘᴀʀᴀ ᴠᴇʀ ɪɴғᴏʀᴍᴀᴄɪᴏɴ ᴅᴇʟ ʙᴏᴛ ᴜsᴀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ* *${usedPrefix}𝗠𝗘𝗡𝗨*`);
  }
}