const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "★𝐌𝟗𝐇𝟒𝐌𝐌𝟒𝐃-𝐁𝟒𝐃𝟗𝐋★",
		countDown: 20,
		role: 0,
		shortDescription: { vi: "", en: "" },
		longDescription: { vi: "", en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},
	onStart: async function ({ message }) {
		const botName = "𝐁𝟒𝐃𝟗𝐋-𝐁𝟗𝐓___//𝟎𝟎𝟕";
		const botPrefix = "/";
		const authorName = "𝚁𝙾𝙼𝙸𝙼 𝙰𝙷𝙼𝙴𝙳";
		const ownAge = "27+";
		const teamName = "Muslim Cyber Security";
		const authorFB = "https://m.me/MBC.K1NG.007";
		const authorInsta = "++";
		const tikTok = "++";
		const st = "ACTTVE";
		const urls = JSON.parse(fs.readFileSync('MBC.json'));
		const link = urls[Math.floor(Math.random() * urls.length)];
		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

		message.reply({
			body: `♕︎➪Sabbir-bot-information 𖤍🂱
\☢ ︎︎Bot-Name ☞︎︎︎ ${MIM} 🂱
\☢︎︎ Bot-Prefix ☞︎︎︎ ${/} 𖤍
\☢ ︎︎Bot-Owner-Name ☞︎︎︎ ${Sabbir Ahmed } ⚠︎
\☢︎︎ Bot-Owner-Age  ☞︎︎︎ ${18+} ⚠︎
\☢ ︎Bot-Owner-Facebook ☞︎︎︎ ${https://www.facebook.com/profile.php?id=100071882764076} ♧︎︎︎
\☢︎︎ Team-Name☞︎︎︎ ${🌚🫦} 𓀬
\♕︎════════♔︎═════════♕︎

 ♲︎︎︎ Bot-Uptime𒊹︎︎︎
 \☢ ︎︎Bot-Raning-Time ☞︎︎︎ ${uptimeString} ❁
 \☢︎︎ Date☞︎︎︎ ${date} ꕥ
 \☢ Now-Time ☞︎︎︎ ${time} ☔︎
 \☢︎︎ Status ☞︎︎︎ ${st}🔰
 \♕════════𖣘═════════♕︎
 `,
			attachment: await global.utils.getStreamFromURL(link)
		});
	},
	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};
