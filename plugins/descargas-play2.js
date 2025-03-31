import fetch from "node-fetch"; import yts from 'yt-search'; import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav']; const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = { download: async (url, format) => { if (!formatAudio.includes(format) && !formatVideo.includes(format)) { throw new Error('Formato no soportado.'); }

const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
try {
  const response = await axios.get(apiUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  if (response.data?.success) {
    const { id, title, info } = response.data;
    const downloadUrl = await ddownr.cekProgress(id);
    return { id, image: info.image, title, downloadUrl };
  } else {
    throw new Error('No se pudo obtener el archivo.');
  }
} catch (error) {
  throw new Error('Error en la descarga: ' + error.message);
}

},

cekProgress: async (id) => { try { while (true) { const response = await axios.get(https://p.oceansaver.in/ajax/progress.php?id=${id}, { headers: { 'User-Agent': 'Mozilla/5.0' } });

if (response.data?.success && response.data.progress === 1000) {
      return response.data.download_url;
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
} catch (error) {
  throw new Error('Error verificando el progreso de descarga.');
}

} };

const handler = async (m, { conn, text, usedPrefix, command }) => { try { if (!text.trim()) return conn.reply(m.chat, ✎ Ingresa el nombre de la música a descargar., m);

const search = await yts(text);
if (!search.all.length) return m.reply('No se encontraron resultados.');

const videoInfo = search.all[0];
const { title, thumbnail, url } = videoInfo;
const thumb = (await conn.getFile(thumbnail))?.data;

await conn.reply(m.chat, `「✦」Descargando *<${title}>*\n\n> 🜸 Link » ${url}\n`, m);

if (command === 'play' || command === 'yta' || command === 'mp3') {
  const api = await ddownr.download(url, 'mp3');
  if (!api.downloadUrl) throw new Error('No se pudo obtener el enlace de descarga.');

  await conn.sendMessage(m.chat, { audio: { url: api.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: m });
} else if (command === 'play2' || command === 'ytv' || command === 'mp4') {
  const sources = [
    `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
    `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
    `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
    `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
  ];
  
  for (let source of sources) {
    try {
      const res = await fetch(source);
      const json = await res.json();
      const downloadUrl = json?.data?.dl || json?.result?.download?.url;

      if (downloadUrl) {
        return await conn.sendMessage(m.chat, {
          video: { url: downloadUrl },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          thumbnail: thumb
        }, { quoted: m });
      }
    } catch (e) {
      console.error(`Error con la fuente ${source}:`, e.message);
    }
  }
  return m.reply('✱ No se pudo descargar el video.');
} else {
  throw new Error("Comando no reconocido.");
}

} catch (error) { return m.reply(𓁏 *Error:* ${error.message}); } };

handler.command = handler.help = ['play', 'play2', 'mp3', 'yta', 'mp4', 'ytv']; handler.tags = ['downloader'];

export default handler;

