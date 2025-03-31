import fetch from 'node-fetch'

let suscripciones = global.suscripciones || (global.suscripciones = {})

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || !args[1]) {
    return m.reply(`✘ Uso incorrecto del comando\n\n📌 Ejemplo: *${usedPrefix + command} <enlace del grupo> <días>*\n\n📌 Ejemplo: *${usedPrefix + command} https://chat.whatsapp.com/ABCDEFGHIJK 3*`)
  }

  let enlace = args[0]
  let dias = parseInt(args[1])

  if (!enlace.startsWith('https://chat.whatsapp.com/')) {
    return m.reply('✘ El enlace proporcionado no es válido.')
  }

  if (isNaN(dias) || dias < 1 || dias > 7) {
    return m.reply('✘ Debes ingresar un número válido entre 1 y 7 para los días.')
  }

  try {
    let res = await conn.groupAcceptInvite(enlace.split('/')[3])
    let groupMetadata = await conn.groupMetadata(res)
    let groupId = groupMetadata.id
    let groupName = groupMetadata.subject

    m.reply(`✅ El bot se ha unido al grupo *${groupName}* por ${dias} ${dias === 1 ? 'día' : 'días'}.`)

    suscripciones[groupId] = setTimeout(async () => {
      await conn.sendMessage(groupId, { text: '⏳ Tu tiempo de suscripción ha finalizado. El bot procederá a salir del grupo.' })
      await conn.groupLeave(groupId)
      delete suscripciones[groupId]
    }, dias * 86400000) // 1 día = 86,400,000 milisegundos

  } catch (e) {
    m.reply(`✘ Error al unirse al grupo: ${e.message}`)
  }
}

handler.help = ['suscripción <enlace> <días>']
handler.tags = ['bot']
handler.command = ['suscripción']
export default handler