const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
    config: {
        name: "pinterest",
        aliases: ["pin", "pinsrarch","pic"],
        version: "1.6.9",
        author: "♡ 𝐍𝐚𝐳𝐫𝐮𝐥 ♡",
        countDown: 10,
        role: 0,
        Description: "Image Search",
        category: "image",
    },

    onStart: async function ({ api, event, args }) {

        const queryAndLength = args.join(" ").split("-");
        
        const image = queryAndLength[0].trim();
        const length = queryAndLength[1] ? queryAndLength[1].trim() : null;

        if (!image || !length || isNaN(length)) {
            return api.sendMessage(
                "Example🔰: /pinterest sunnyleon - 10",
                event.threadID,
                event.messageID
            );
        }

        try {
            // Send a message indicating the search is in progress
            const msg = await api.sendMessage("𝐒𝐞𝐚𝐫𝐜𝐡𝐢𝐧𝐠 𝐈𝐦𝐚𝐠𝐞 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 🔰", event.threadID);

            // Make an API call to search for images on Pinterest
            const response = await axios.get(
                `${global.GoatBot.config.api}/pinterest?search=${encodeURIComponent(image)}&count=${encodeURIComponent(length)}`
            );

            const data = response.data.data;

        
            if (!data || data.length === 0) {
                return api.sendMessage(
                    "No images found.",
                    event.threadID,
                    event.messageID
                );
            }

            const nazrul = [];
            const totalImagesCount = Math.min(data.length, parseInt(length));

            
            for (let i = 0; i < totalImagesCount; i++) {
                const imgUrl = data[i];
                const imgResponse = await axios.get(imgUrl, {
                    responseType: "arraybuffer",
                });
                const imgPath = path.join(__dirname, "dvassests", `${i + 1}.jpg`);
                await fs.outputFile(imgPath, imgResponse.data);
                nazrul.push(fs.createReadStream(imgPath));
            }

    
            await api.unsendMessage(msg.messageID);

        
            await api.sendMessage(
                {
                    body: `🔰 𝐇𝐞𝐫𝐞'𝐬 𝐘𝐨𝐮𝐫 𝐒𝐞𝐚𝐫𝐜𝐡𝐞𝐝 𝐈𝐦𝐚𝐠𝐞 🔰\n🔰 𝐓𝐨𝐭𝐚𝐥𝐥 𝐈𝐦𝐚𝐠𝐞 𝐂𝐨𝐮𝐧𝐭 : ${totalImagesCount} 🔰`,
                    attachment: nazrul,
                },
                event.threadID,
                event.messageID
            );
        } catch (error) {
            console.error(error);
            api.sendMessage(
                `Error: ${error.message}`,
                event.threadID,
                event.messageID
            );
        }
    },
};
