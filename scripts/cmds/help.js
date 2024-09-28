const fs = require("fs-extra");
const request = require("request");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "1.6.9",
    role: 0,
    author: "♡ 𝐍𝐚𝐳𝐫𝐮𝐥 ♡",
    category: "system",
    countDowns: 3,
    Description: "show cmds list",
    guide: {
      en: "{pn}",
    }
  },

  onStart: async function ({ api, event, args, getText, threadsData, role }) {
    const { threadID, messageID } = event;
    const prefix = getPrefix(threadID);

    if (!commands || commands.size === 0) {
      return api.sendMessage("Command list is not available at the moment.", threadID, messageID);
    }

    if (args.length === 0 || !isNaN(args[0])) {
      // Show help command usage with pagination
      let msg = "💫  Ｈｅｌｐ ♡ Ｌｉｓｔ 💫\n\n";

      const allCommands = [];
      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;
        allCommands.push(`✰︵${name} ︵✰`);
      }

      // Pagination
      const startPage = parseInt(args[0]) || 1;
      const numberOfOnePage = 20;
      const totalCommands = allCommands.length;
      const totalPages = Math.ceil(totalCommands / numberOfOnePage);

      const page = Math.max(Math.min(startPage, totalPages), 1);
      const startIndex = (page - 1) * numberOfOnePage;
      const endIndex = Math.min(startIndex + numberOfOnePage, totalCommands);

      if (page > totalPages || page < 1) {
        return api.sendMessage(`Page ${page} does not exist. Total pages: ${totalPages}`, threadID, messageID);
      }

      msg += allCommands.slice(startIndex, endIndex).join("\n\n") + `\n\nPage ${page}/${totalPages}`;
      msg += `\n⊰᯽⊱┈──╌❊⛱️❊╌──┈⊰᯽⊱\n     \n🔰𝙏𝙤𝙩𝙖𝙡𝙡 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙊𝙛 𝙩𝙝𝙞𝙨 𝘽𝙤𝙩: 【 ${commands.size} 】\n\n「 𝐎𝐰𝐧𝐞𝐫 : ♡ SABBIR AHMED ♡\n\n🌸𝘽𝙤𝙩 𝙉𝙖𝙢𝙚 : 「 ${global.GoatBot.config.nickNameBot} 」\n⛱️ 𝘽𝙤𝙩 𝙋𝙧𝙚𝙛𝙞𝙭 : 「 ${prefix} 」\n 🌏𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 𝙇𝙞𝙣𝙠  : https://www.facebook.com/profile.php?id=100071882764076`;
      msg += ``;

      const imageUrl = "https://i.imgur.com/Jau8vs1.jpeg"; // Replace with your Imgur link
      const imagePath = __dirname + `/cache/commands.jpg`;

      request(imageUrl).pipe(fs.createWriteStream(imagePath)).on("close", () => {
        api.sendMessage({
          body: msg,
          attachment: fs.createReadStream(imagePath)
        }, threadID, (err, info) => {
          fs.unlinkSync(imagePath);
          if (err) console.error(err);
        });
      });

      return;
    }

    // Show command information
    const commandName = args[0]?.toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));

    if (!command) {
      return api.sendMessage(`Command "${commandName}" not found.`, threadID, messageID);
    }

    const configCommand = command.config;
    const roleText = roleTextToString(configCommand.role);
    const author = configCommand.author || "Unknown";
    const longDescription = configCommand.longDescription?.en || "No description";
    const guideBody = configCommand.guide?.en || "No guide available.";
    const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

    const response = `╭── Command Information  ──┈⊰᯽⊱
│ Name: ${configCommand.name}
│ Description: ${longDescription}
│ Aliases: ${configCommand.aliases ? configCommand.aliases.join(", ") : "None"}
│ Version: ${configCommand.version || "1.0"}
│ Permission: ${roleText}
│ Time Per Usage: ${configCommand.countDown || 1}s
│ Author: ${author}
├── Usage
│ ${usage}
├── Notes
│ Owner: SABBIR AHMED 
╰───────────────────────────`;

    api.sendMessage(response, threadID, messageID);
  },
};

function roleTextToString(role) {
  switch (role) {
    case 0:
      return "0 (All Users)";
    case 1:
      return "1 (Group Admins)";
    case 2:
      return "2 (Bot Admins)";
    default:
      return "Unknown Permission";
  }
}
