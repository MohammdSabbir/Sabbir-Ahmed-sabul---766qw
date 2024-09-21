const axios = require('axios'); 
module.exports.config={
  name: "ai",
  version: "1.0.0",
  author: "♡ 𝐍𝐚𝐳𝐫𝐮𝐥 ♡",
  role: 0,
  category: "ai",
  Description: "Google ai",
  guide: {
      en: "   {pn} your question"
    }
}
module.exports.onStart = async ({api,event,args,Reply,message}) =>{ 
  const A1R1N = args.join(" ")
  try {
    const res = await axios.get(`https://x9-apis-2.onrender.com/hercai?ask=${encodeURIComponent(A1R1N)}`);
    const nazrulMsg = res.data.answer
    const airin = `⊰ ✧ ⊱┈──╌♡ 𝐀𝐢 𝐀𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭 ♡╌──┈⊰ ✧ ⊱\n
\n${nazrulMsg}`;
      api.sendMessage(airin, event.threadID, (error, info) => {
  global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            msg: airin,
        });
    }, event.messageID);
  } catch (error) {
    api.sendMessage(error, message,event.threadID, event.messageID)
  }
}

module.exports.onReply = async({api,event,args,Reply}) =>{
       const AIRIN = args.join(" ") 
 try {
     const res = await axios.get(`https://x9-apis-2.onrender.com/hercai?ask=${encodeURIComponent(AIRIN)}`);
    const nazrulMsg = res.data.answer
    const airins = `⊰ ✧ ⊱┈──╌♨︎ 𝐑𝐞𝐩𝐥𝐲 ♨︎╌──┈⊰ ✧ ⊱\n
\n${nazrulMsg}`;
      api.sendMessage(airins, event.threadID, (error, info) => {
  global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            msg: airins,
        });
    }, event.messageID);
    
  } catch (error) {
      api.sendMessage(error, message,event.threadID, event.messageID)
    
  }
}
