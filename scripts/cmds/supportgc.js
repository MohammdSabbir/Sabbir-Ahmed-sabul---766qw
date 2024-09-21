let storedGroupList = [];
let groupListMessageID = null;

module.exports = {
  config: {
    name: "supportgc",
    aliases: ["addgc", "joingc", "joingroup"],
    version: "1.1",
    author: "♡ Nazrul ♡",
    countDown: 5,
    role: 0,
    Description: {
      en: "Join Group chat"
    },
    category: "Group",
    guide: {
      en: "{pn} [groupNumber] or use {pn} to show groups, then reply to the list with the number"
    }
  },

  onStart: async function ({ api, event, message, args }) {
    const supportGroups = [
      { id: "7272501799469344" },
      { id: "7692803354163298" }
    ];

    if (!args[0]) {
      let groupListMessage = "Available Groups:\n\n";
      storedGroupList = [];
      for (let i = 0; i < supportGroups.length; i++) {
        const group = supportGroups[i];
        try {
          const threadInfo = await api.getThreadInfo(group.id);
          group.name = threadInfo.threadName || "Unnamed Group";
          group.memberCount = threadInfo.participantIDs.length;
          storedGroupList.push(group);
          groupListMessage += `${i + 1}. Group Name: ${group.name}\n   threadID: ${group.id}\n   Members: ${group.memberCount}\n\n`;
        } catch (error) {
          groupListMessage += `${i + 1}. Group Name: Unknown (Error fetching info)\n   threadID: ${group.id}\n\n`;
          console.error("Error fetching group info:", error);
        }
      }

      const msgInfo = await message.reply(groupListMessage);
      groupListMessageID = msgInfo.messageID;
      console.log("Group list message ID:", groupListMessageID);

      global.GoatBot.onReply.set(groupListMessageID, {
        commandName: module.exports.config.name,
        type: "groupSelection",
        author: event.senderID,
      });

      return;
    }

    const selectedGroupIndex = parseInt(args[0], 10) - 1;
    if (isNaN(selectedGroupIndex) || selectedGroupIndex < 0 || selectedGroupIndex >= supportGroups.length) {
      return message.reply("Invalid group number. Please select a valid group.");
    }

    const selectedGroup = supportGroups[selectedGroupIndex];
    await joinGroup(api, message, selectedGroup, event);
  },

  onReply: async function ({ api, event, Reply }) {
    const { type, author } = Reply;

    if (event.senderID !== author) return;

    if (type === "groupSelection") {
      const selectedGroupIndex = parseInt(event.body.trim()) - 1;

      if (isNaN(selectedGroupIndex) || selectedGroupIndex < 0 || selectedGroupIndex >= storedGroupList.length) {
        return api.sendMessage("Invalid selection. Please reply with a valid number.", event.threadID, event.messageID);
      }

      const selectedGroup = storedGroupList[selectedGroupIndex];
      await joinGroup(api, { reply: (msg) => api.sendMessage(msg, event.threadID, event.messageID) }, selectedGroup, event);
    }
  }
};

async function joinGroup(api, message, selectedGroup, event) {
  try {
    const botID = await api.getCurrentUserID();
    const senderName = event.senderName || (await api.getUserInfo(event.senderID))[event.senderID].name;

    const { participantIDs: members } = await api.getThreadInfo(selectedGroup.id);

    const userAlreadyInGroup = members.includes(event.senderID);

    if (userAlreadyInGroup) {
      const alreadyInGroupMessage = `🔰You are already joined in ${selectedGroup.name} ⛱️`;
      return message.reply(alreadyInGroupMessage);
    }

    await api.addUserToGroup(event.senderID, selectedGroup.id);
    const successMessage = `🔰Successfully added to ${selectedGroup.name}. Please check your request box or inbox ⛱️`;
    return message.reply(successMessage);
  } catch (error) {
    const failedMessage = `- তর আইডিতে সমস্যা 😒🔪: ${error.message}`;
    console.error("Error adding user to support group:", error);
    return message.reply(failedMessage);
  }
}
