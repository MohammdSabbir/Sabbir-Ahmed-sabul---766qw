const axios = require("axios");
const fs = require("fs");
const path = require("path");
const os = require("os");

module.exports = {
  config: {
    name: "removebg",
    aliases: ["rmbg", "rbg"],
    version: "1.6.9",
    author: "♡ Nazrul ♡",
    countDown: 5,
    role: 0,
    description: "removebg",
    category: "image"
  },

  onStart: async function ({ message, args, getLang, event, api, threadID, messageID }) {
    if (event.type === "message_reply") {
      const input = event.messageReply?.attachments[0]?.url || args.join(' ');

      if (!input) {
        return api.sendMessage("🔰 Please Reply To an Image...!!", event.threadID, event.messageID);
      }

      const tempFilePath = path.join(os.tmpdir(), `removebg${Date.now()}.png`);

      api.sendMessage("🔰 Removing Image Background Please Wait..!!", event.threadID, (err, info) => {
        if (err) return console.error("Error sending message:", err);

        setTimeout(() => {
          api.unsendMessage(info.messageID, (err) => {
            if (err) console.error("Error unsending message:", err);
          });
        }, 3000);

        (async () => {
          try {
            console.log("Starting image download...");
            const response = await axios.get("https://x9-apis-2.onrender.com/removebg", {
              params: { image: input },
              responseType: "stream"
            });

            const writer = fs.createWriteStream(tempFilePath);
            response.data.pipe(writer);

            writer.on('finish', () => {
              console.log("Image download complete:", tempFilePath);

              api.sendMessage({
                body: "🔰 Successfully Removed Image Background!!",
                attachment: fs.createReadStream(tempFilePath)
              }, event.threadID, () => {
                fs.unlink(tempFilePath, (err) => {
                  if (err) console.error("Failed to delete the file:", err);
                  else console.log("Image file deleted:", tempFilePath);
                });
              });
            });

            writer.on('error', (error) => {
              console.error("Error writing file:", error);
              api.sendMessage("An error occurred while processing the image.", event.threadID);
            });

          } catch (error) {
            console.error("Error during image processing:", error);
            api.sendMessage("An error occurred while processing the image.", event.threadID);
          }
        })();
      });
    } else {
      return api.sendMessage(" Please reply to a photo to process", event.threadID, messageID);
    }
  }
};
