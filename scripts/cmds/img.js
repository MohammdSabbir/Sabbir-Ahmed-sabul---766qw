const axios = require('axios');

module.exports = {
  config: {
    name: "img",
    aliases: ["img"],
    version: "1.0.0",
    author: "Mostakim",
    role: 2,
    category: "Image Generation",
    shortDescription: {
      en: "Generate an image based on a prompt",
      vi: "Tạo hình ảnh dựa trên một prompt"
    },
    longDescription: {
      en: "This command generates an image based on a prompt using an external API.",
      vi: "Lệnh này tạo ra một hình ảnh dựa trên một prompt bằng cách sử dụng API bên ngoài."
    },
    guide: {
      en: "To use this command, simply type generateImage followed by your prompt.",
      vi: "Để sử dụng lệnh này, đơn giản nhấp generateImage theo sau là prompt của bạn."
    }
  },
  onStart: async ({ event, args, api }) => {
    try {
      const prompt = args.join(" "); // Join the arguments to form the prompt
      const apiUrl = `${global.GoatBot.config.mostakim}/img?text=${encodeURIComponent(prompt)}`;

      api.sendMessage("𝚆8 🫡", event.threadID);

      // Fetch image using the API
      const response = await axios.get(apiUrl);

      // Check if the response contains an image URL
      if (response.data && response.data.output && response.data.output.length > 0) {
        const output = response.data.output[0]; // Use the first image URL from the output array

        const imageResponse = await axios({
          url: output,
          responseType: 'stream'
        });

        api.sendMessage({
          body: "➪ 𝙷𝚎𝚛𝚎 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍 𝚒𝚖𝚐",
          attachment: imageResponse.data
        }, event.threadID);
      } else {
        api.sendMessage("𝙵𝚒𝚕𝚎𝚍 𝚝𝚘 𝚐𝚎𝚗𝚎𝚛𝚎 𝚒𝚖𝚐𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.", event.threadID);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      api.sendMessage("𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚒𝚖𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛", event.threadID);
    }
  },
  onReply: async ({ api, event, message, args, commandName }) => {
    // Additional logic to handle user replies if necessary
  }
};
