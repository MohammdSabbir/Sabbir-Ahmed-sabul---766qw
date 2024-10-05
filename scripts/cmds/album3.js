const axios = require("axios");

module.exports.config = {
  name: "album3",
  aliases: ["Album3", "albam3"],
  version: "2.0.2",
  role: 0,
  author: "♡ 𝐍𝐚𝐳𝐫𝐮𝐥 ♡",
  category: "Album Video",
  description: "Get Video From Album list",
  countDowns: 2,
  guide: {
    en: "{p}{n} or type [album] [page number]"
  }
};

module.exports.onStart = async ({ api, event, args, Reply }) => {
  const page = args[0] ? parseInt(args[0]) : 1;
  let albumMsg = "";

  if (page === 1) {
    albumMsg = `
🌟 **Family Videos** 🌟
┌───────────────┐
│ 1. Attitude    │
│ 2. Status      │
│ 3. Natural     │
│ 4. Islamic     │
│ 5. Love        │
│ 6. Sura        │
│ 7. Free Fire   │
│ 8. Sad         │
│ 9. Anime       │
│ 10. Cute Baby  │
└───────────────┘
👉 Reply with the number (0-9) to see your video!`;
  } else if (page === 2) {
    albumMsg = `
🌟 **18+ Videos** 🌟
┌───────────────┐
│ 11. Hot       │
│ 12. S3X       │
│ 13. Horny     │
│ 14. Item      │
└───────────────┘
👉 Reply with the number (10-13) to see your video!`;
  } else {
    return api.sendMessage("❌ Invalid page number. Please use /album 1 or /album 2.", event.threadID, event.messageID);
  }

  api.sendMessage(albumMsg, event.threadID, (error, info) => {
    if (error) return console.error(error);
    global.GoatBot.onReply.set(info.messageID, {
      commandName: module.exports.config.name,
      type: "reply",
      messageID: info.messageID,
      author: event.senderID,
      msg: albumMsg,
    });
  }, event.messageID);
};

module.exports.onReply = async ({ api, event, Reply }) => {
  try {
    api.unsendMessage(Reply.messageID);
    if (event.type === "message_reply") {
      const reply = event.body.trim();
      let nazrulUrl;

      // Family videos (0-10)
      switch (reply) {
        case '0':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/attitude";
          break;
        case '1':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/status2";
          break;
        case '2':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/natural";
          break;
        case '3':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/islam";
          break;
        case '4':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/love";
          break;
        case '5':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/sura";
          break;
        case '6':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/ff";
          break;
        case '7':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/sad";
          break;
        case '8':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/anime";
          break;
        case '9':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/baby";
          break;

        // 18+ videos (10-13)
        case '10':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/hot";
          break;
        case '11':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/sex";
          break;
        case '12':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/horny";
          break;
        case '13':
          nazrulUrl = "https://x9-apis-2.onrender.com/video/item";
          break;

        default:
          return api.sendMessage("❌ Invalid choice. Please reply with a number corresponding to the video you want to see.", event.threadID, event.messageID);
      }

      const res = await axios.get(nazrulUrl);
      const dataUrl = res.data.data;
      const n4zr9l = (await axios.get(dataUrl, { responseType: 'stream' })).data;

      api.sendMessage({
        body: "📽️ Here's your requested video!",
        attachment: n4zr9l
      }, event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("⚠️ Error: " + error.message, event.threadID, event.messageID);
  }
};
