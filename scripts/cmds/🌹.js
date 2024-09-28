module.exports = {
    config: {
        name: "🌹",
        version: "1.0",
        author: "𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎",
        countDown: 5,
        role: 0,
        shortDescription: "Romance envoûtante",
        longDescription: "Exprime une affection envoûtante et pleine de charme.",
        category: "reply",
    },
    onStart: async function() {},
    onChat: async function({ event, message, api }) {
        if (event.body && event.body.toLowerCase() === "🌹") {
            return message.reply({
                body: "🌹 **Ton sourire est comme une rose rare dans un jardin secret. Chaque fois que tu souris, le monde devient plus lumineux et magique.** 🌟💕\n\n**« Les hommes qui ne savent pas comment traiter une femme ne méritent pas d'en avoir une à leurs côtés. »** — *𝒮𝒶𝓃𝒿𝒾",
                attachment: await global.utils.getStreamFromURL("https://i.imgur.com/XLRNjHq.gif")
            });
        }
    }
};
