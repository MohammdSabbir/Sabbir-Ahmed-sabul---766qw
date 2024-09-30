const axios = require("axios");

module.exports = {
    config: {
        name: "status",
        version: "1.6.9",
        author: "♡ 𝐍𝐚𝐳𝐫𝐮𝐥 ♡",
        countDown: 10,
        role: 0,
        description: "Status Video",
        category: "Video",
    },

    onStart: async function ({ api, event, args }) {
        const status2 = args.join(" ");
        const name = args.join(" ");

        try {
            const msg = await api.sendMessage("🔰 Please Wait Loading Status Video.!!!!", event.threadID);
            const response = await axios.get("https://x9-apis-2.onrender.com/video/status2");

            const data = response.data;
            const count = data.urlCount;
            const name = data.nazrul;
            const video = (await axios.get(data.data, { responseType: 'stream' })).data;

            await api.unsendMessage(msg.messageID);
            await api.sendMessage(
                {
                    body: "🔰 Status Video 🔰",
                    attachment: video,
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
