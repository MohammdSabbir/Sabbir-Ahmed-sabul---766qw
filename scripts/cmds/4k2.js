const axios = require("axios");
const { shorten } = require('tinyurl');

module.exports = {
  config: {
    name: "4k2",
    version: "1.0",
    role: 0,
    author: "♡ 𝐍𝐚𝐳𝐫𝐮𝐥 ♡",
    category: "utility",
    countDown: 5,
    guide: {
      en: "reply to an image"
    }
  },
  onStart: async ({ api, event }) => {
    try {
      if (event.messageReply && event.messageReply.attachments[0]?.url) {
        const imageUrl = event.messageReply.attachments[0].url;
        
     const msg = await api.sendMessage("✨ Processing your image in 4K quality... Please wait a moment. ✨", event.threadID);
        
        const response = await axios.get(`https://x9-apis-2.onrender.com/remini?input=${await shorten(imageUrl)}`, { responseType: 'stream' });
        
        api.sendMessage({
          body: "💎 Here is your enhanced 4K image! 💎",
          attachment: response.data
        }, event.threadID, event.messageID);
      } else {
        api.sendMessage("⚠️ Please reply to an image to enhance it to 4K quality. ⚠️", event.threadID);
  await api.unsendMessage(msg.messageID);
      }
    } catch (e) {
      api.sendMessage("❌ An error occurred while processing the command. Please try again later. ❌", event.threadID);
      console.error(e);
    }
  }
};
