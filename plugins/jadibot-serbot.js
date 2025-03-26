const { useMultiFileAuthState, DisconnhectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from "pino";
import chalk from "chalk";
import util from "util";
import * as ws from "ws";
const { child, spawn, exec } = await import("child_process");
const { CONNECTING } = ws;
import { makeWASocket } from "../lib/simple.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vegetaJBOptions = {};
if (global.conns instanceof Array) console.log();
else global.conns = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  let time = global.db.data.users[m.sender].Subs + 120000;
  if (new Date() - global.db.data.users[m.sender].Subs < 120000)
    return conn.reply(m.chat, `Debes esperar ${msToTime(time - new Date())} para volver a vincular un *Sub-Bot.*`, m);

  if (Object.values(global.conns).length === 30) {
    return m.reply(`No se han encontrado espacios para *Sub-Bots* disponibles.`);
  }

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let id = `${who.split`@`[0]}`;
  let pathVegetaJadiBot = path.join(`./${jadi}/`, id);

  if (!fs.existsSync(pathVegetaJadiBot)) {
    fs.mkdirSync(pathVegetaJadiBot, { recursive: true });
  }

  vegetaJBOptions.pathVegetaJadiBot = pathVegetaJadiBot;
  vegetaJBOptions.m = m;
  vegetaJBOptions.conn = conn;
  vegetaJBOptions.args = args;
  vegetaJBOptions.usedPrefix = usedPrefix;
  vegetaJBOptions.command = command;
  VegetaJadiBot(vegetaJBOptions);

  global.db.data.users[m.sender].Subs = new Date() * 1;
};

handler.help = ["serbot", "serbot code"];
handler.tags = ["serbot"];
handler.command = ["jadibot", "serbot"];
export default handler;

export async function VegetaJadiBot(options) {
  let { pathVegetaJadiBot, m, conn, args, usedPrefix, command } = options;
  const pathCreds = path.join(pathVegetaJadiBot, "creds.json");

  if (!fs.existsSync(pathVegetaJadiBot)) {
    fs.mkdirSync(pathVegetaJadiBot, { recursive: true });
  }

  try {
    args[0] && args[0] != undefined
      ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"))
      : "";
  } catch {
    conn.reply(m.chat, `Use correctamente el comando » ${usedPrefix + command} code`, m);
    return;
  }

  let { version, isLatest } = await fetchLatestBaileysVersion();
  const msgRetry = (MessageRetryMap) => {};
  const msgRetryCache = new NodeCache();
  const { state, saveState, saveCreds } = await useMultiFileAuthState(pathVegetaJadiBot);

  const connectionOptions = {
    printQRInTerminal: false,
    logger: pino({ level: "silent" }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
    msgRetry,
    msgRetryCache,
    version: [2, 3000, 1015901307],
    syncFullHistory: true,
    browser: ["Vegeta-Super-Bot", "Chrome", "2.0.0"],
    defaultQueryTimeoutMs: undefined,
    getMessage: async (key) => {
      if (store) return { conversation: "Vegeta-Super-Bot" };
    },
  };

  let sock = makeWASocket(connectionOptions);
  sock.isInit = false;

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update;
    if (isNewLogin) sock.isInit = false;

    if (qr && !mcode) {
      if (m?.chat) {
        await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim() }, { quoted: m });
      } else {
        return;
      }
    }

    if (connection === "close") {
      let reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
      if (reason === 428 || reason === 408 || reason === 440) {
        console.log(chalk.bold.magentaBright(`Reconectando sesión...`));
        await creloadHandler(true).catch(console.error);
      }
      if (reason === 405 || reason === 401 || reason === 403) {
        fs.rmdirSync(pathVegetaJadiBot, { recursive: true });
      }
    }

    if (connection === "open") {
      console.log(chalk.bold.cyanBright(`\n❒ SUB-BOT Conectado: ${path.basename(pathVegetaJadiBot)}\n`));
      sock.isInit = true;
      global.conns.push(sock);
    }
  }

  let creloadHandler = async function (restartConn) {
    if (restartConn) {
      try {
        sock.ws.close();
      } catch {}
      sock.ev.removeAllListeners();
      sock = makeWASocket(connectionOptions);
    }
    sock.ev.on("connection.update", connectionUpdate.bind(sock));
  };

  creloadHandler(false);
}