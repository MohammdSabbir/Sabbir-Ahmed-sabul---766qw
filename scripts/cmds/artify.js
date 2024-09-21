▓▓▓▓▓█\n─▓▓▓●▓───────────────▓▓▓▓█\n─▓▓●▓─────────────────▓▓▓█\n─▓▓▓───────────────────▓▓█\n─▓▓▓───────────────────▓▓█",

 

};

 

const axios = require('axios');

 

function generateText(text, font) {

    const selectedFont = fonts[font];

 

    if (!selectedFont) {

        return `The font '${font}' was not found. Use '/Artify list' to see available fonts.`;

    }

 

    const formattedText = text.split("").map(char => selectedFont[char] || char).join("");

 

    return formattedText;

}

 

module.exports = {

    config: {

        name: "artify",

        version: "1.0.0",

        role: 0,

        author: "♡ 𝐍𝐚𝐳𝐫𝐮𝐥 ♡",

        shortDescription: "Font text",

        countDown: 0,

        category: "GRAPHIC",

        guide: {

            en: '{p}Artify [fontname | textartname] [text]'

        }

    },

    onStart: async ({ event, api, args }) => {

        const command = args[0]?.toLowerCase();

 

        if (!command) {

            let message = "𝗟𝗜𝗦𝗧 𝗢𝗙 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗔𝗦𝗖𝗜𝗜 𝗔𝗥𝗧𝗦:\n\n";

            for (const name in textArts) {

                message += ` ⦿ ${name}\n`;

            }

            message += "\n𝗟𝗜𝗦𝗧 𝗢𝗙 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗙𝗢𝗡𝗧𝗦:\n\n";

            for (const name in fonts) {

                message += ` ⦿ ${name}\n`;

            }

            message += "\n𝗨𝗦𝗔𝗚𝗘:\n\n ⦿ /Artify [ASCII art name]\n Example: /Artify luffy\n\n ⦿ /Artify [font name] [text]\n Example: /Artify mathsans\n Artificial Intelligence";

            return api.sendMessage(message, event.threadID, event.messageID);

        }

 

        if (command === "list") {

            let message = "𝗟𝗜𝗦𝗧 𝗢𝗙 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗔𝗥𝗧𝗦:\n\n";

            for (const name in textArts) {

                message += ` ⦿ ${name}\n`;

            }

            message += "\n𝗟𝗜𝗦𝗧 𝗢𝗙 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗙𝗢𝗡𝗧𝗦:\n\n";

            for (const name in fonts) {

                message += ` ⦿ ${name}\n`;

            }

            return api.sendMessage(message, event.threadID, event.messageID);

        }

 

        const fontOrArt = command;

        const text = args.slice(1).join(" ");

 

        if (fonts[fontOrArt]) {

            const generatedText = generateText(text, fontOrArt);

            const formattedMsg = `${generatedText}`;

            return api.sendMessage(formattedMsg, event.threadID, event.messageID);

        }

 

        if (textArts[fontOrArt]) {

            const selectedArt = textArts[fontOrArt];

            const artMessage = `Here's the "${fontOrArt}" ASCII art:\n\n${selectedArt}\n\nYou can copy the ${fontOrArt} art and paste it into [https://pastebin.com/] to see it more clearly.`;

            const pastebinLink = `https://pastebin.com/`;

 

            if (selectedArt.length > 100000) {

                return api.sendMessage(`The "${fontOrArt}" text art or ASCII art is too long. You can paste it to ${pastebinLink} to see it more clearly.`, event.threadID);

            }

 

            return api.sendMessage(artMessage, event.threadID);

        }

 

        return "Invalid command. Use '/Artify 'list' to see available fonts and text arts.";

    }

};
