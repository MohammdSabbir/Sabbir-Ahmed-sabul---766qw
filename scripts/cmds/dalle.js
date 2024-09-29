 const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "1g4_ZNInY79FUn4-DBMKTTxdOfMw_GRjDoXhR4x8S3rjqhwQaEbqT58ScgB-C0shcqVNceOecAG9UhhiIAG98sFXA86j1AV66NP00WVvViAojxFX084n2oupvzC1fieit9uoXkMTGNgSw3gClhfOSL1WDxP0p1Nx72mgYvJnAcRZVt_B3e1J6L3fSrJ0vppAySlTJy7gsth2k1qP7dhZVxQ";
const _U = "1g4_ZNInY79FUn4-DBMKTTxdOfMw_GRjDoXhR4x8S3rjqhwQaEbqT58ScgB-C0shcqVNceOecAG9UhhiIAG98sFXA86j1AV66NP00WVvViAojxFX084n2oupvzC1fieit9uoXkMTGNgSw3gClhfOSL1WDxP0p1Nx72mgYvJnAcRZVt_B3e1J6L3fSrJ0vppAySlTJy7gsth2k1qP7dhZVxQ";

module.exports = {
  config: {
    name: "dalle",
    version: "1.0.2",
    author: "Samir Å’ ",
    role: 0,
    countDown: 100,
    shortDescription: { en: "dalle3 image generator" },
    longDescription: { en: "dalle3 is a image generator powdered by OpenAi" },
    category: "ð—”ð—œ-ð—šð—˜ð—¡ð—˜ð—¥ð—”ð—§ð—˜ð——",
    guide: { en: "{prefix}dalle <search query>" }
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ");

    try {
      const res = await axios.get(`https://apis-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(prompt)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("response received but imgurl are missing ", event.threadID, event.messageID);
        return;
      }

      const imgData = [];

      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here's your generated image`
      }, event.threadID, event.messageID);

    } catch (error) {
      api.sendMessage("Can't Full Fill this request ", event.threadID, event.messageID);
    }
  }
};
