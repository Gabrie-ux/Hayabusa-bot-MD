import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {

if (!process.send) throw '*『✦』Reiniciar: node start.js*\n*『✦』Reiniciar: node index.js*'

if (conn.user.jid == conn.user.jid) {

const { key } = await conn.sendMessage(m.chat, {text: `🚀 ᴄᴀʀɢᴀɴᴅᴏ...`}, {quoted: m})
await delay(1000 * 1)
await conn.sendMessage(m.chat, {text: `🔥ᴄᴀʀɢᴀɴᴅᴏ...`, edit: key})
await delay(1000 * 1)
await conn.sendMessage(m.chat, {text: `⚡ᴄᴀʀɢᴀɴᴅᴏ...`, edit: key})
await conn.sendMessage(m.chat, {text: `*『👑』ᴄᴏᴍᴇɴᴢᴀʀ ʀᴇɪɴɪᴄɪᴏ ᴄᴏᴍᴘʟᴇᴛᴏ...*`, edit: key})

process.send('reset')
} else throw 'eh'
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar'] 
handler.rowner = true

export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
