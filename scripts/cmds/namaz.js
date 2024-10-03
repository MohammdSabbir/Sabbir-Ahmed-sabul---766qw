const axios = require("axios");

module.exports = {
    config: {
        name: "namaz",
        version: "1.0",
        author: "Tasbiul Islam Rasin",
        role: 0,
        shortDescription: "Namaz Time",
        longDescription: "Namaz Time",
        category: "prayer",
        guide: {
            en: "Namaz",
        },
    },

    onStart: async function ({ api, event }) {
        try {
            
            const response = await axios.get("https://tasbiul-rasin07.vercel.app/api/prayertime");

        
            console.log("API Response:", response.data);

        
            if (response.data && response.data.data && response.data.data.timings) {
                const timings = response.data.data.timings;

                const fajr = timings.Fajr;
                const sunrise = timings.Sunrise;
                const johor = timings.Dhuhr;
                const asr = timings.Asr;
                const sunset = timings.Sunset;
                const magrib = timings.Maghrib;
                const isha = timings.Isha;

            
                api.sendMessage(`আজকের নামাজের সময়সূচী:

🌅 সূর্যোদয়: ${sunrise}

🕗 ফজর: ${fajr}
🕗 যোহর: ${johor}
🕗 আসর: ${asr}
🕗 মাগরিব: ${magrib}
🕗 এশা: ${isha}

🌐 Site: https://islamic-zone.netlify.app/`, event.threadID, event.messageID);
            } else {
                
                console.error("Unexpected API response structure:", response.data);
                api.sendMessage("API did not return expected prayer time data.", event.threadID, event.messageID);
            }
        } catch (error) {
            
            console.error("🥹 | API ERROR", error.response ? error.response.data : error.message);
            api.sendMessage("Something went wrong. An Error: " + (error.response ? error.response.data : error.message), event.threadID, event.messageID);
        }
    },
};
