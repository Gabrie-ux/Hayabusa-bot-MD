let handler = async (m, { conn, args, usedPrefix, command }) => {
    const imageUrl = 'https://qu.ax/qHTkG.jpg'; // Reemplázala con la URL de tu imagen

    let isClose = {
        'open': 'not_announcement',
        'close': 'announcement',
        'abierto': 'not_announcement',
        'cerrado': 'announcement',
        'abrir': 'not_announcement',
        'cerrar': 'announcement',
    }[(args[0] || '')];

    if (isClose === undefined) {
        return conn.sendMessage(m.chat, { 
            text: `🍬 *Elija una opción para configurar el grupo*\n\nEjemplo:\n*✰ #${command} abrir*\n*✰ #${command} cerrar*\n*✰ #${command} close*\n*✰ #${command} open*`,
            image: { url: imageUrl } 
        }, { quoted: m });
    }

    await conn.groupSettingUpdate(m.chat, isClose);

    if (isClose === 'not_announcement') {
        conn.sendMessage(m.chat, { text: `🍬 *Ya pueden escribir en este grupo.*`, image: { url: imageUrl } }, { quoted: m });
    }

    if (isClose === 'announcement') {
        conn.sendMessage(m.chat, { text: `🍭 *Solo los admins pueden escribir en este grupo.*`, image: { url: imageUrl } }, { quoted: m });
    }
};

handler.help = ['group open / close', 'grupo abrir / cerrar'];
handler.tags = ['grupo'];
handler.command = ['group', 'grupo'];
handler.admin = true;
handler.botAdmin = true;
export default handler;