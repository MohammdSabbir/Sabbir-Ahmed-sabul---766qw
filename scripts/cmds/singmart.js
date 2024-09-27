
module.exports = {
    config: {
        name: "singmart", 
        version: "2.0",
        author: AUTHOR,
        countDown: 10,
        role: 0,
        shortDescription: "play audio from youtube with lyrics",
        longDescription: "play audio from youtube with lyrics support, audio recognition, and more.",
        category: "music",
        guide: "{p}sing [song name] / reply to audio or video" 
    },
    onStart: function ({ api, event, args, message }) {
        return video(api, event, args, message);
    }
};￼Enter
            shortUrl = await shortenURL(shortUrl);
        } else if (args.length === 0) {
            message.reply("Please provide a video name or reply to a video or audio attachment.");
            return;
        } else {
            title = args.join(" ");
            const searchResponse = await axios.get(`https://youtube-kshitiz-gamma.vercel.app/yt?search=${encodeURIComponent(title)}`);
            if (searchResponse.data.length > 0) {
                videoId = searchResponse.data[0].videoId;
            }

            const videoUrlResponse = await axios.get(`https://yt-kshitiz.vercel.app/download?id=${encodeURIComponent(videoId)}&apikey=${getRandomApiKey()}`);
            if (videoUrlResponse.data.length > 0) {
                shortUrl = await shortenURL(videoUrlResponse.data[0]);
            }
        }

        if (!videoId) {
            message.reply("No video found for the given query.");
            return;
        }

        const downloadResponse = await axios.get(`https://yt-kshitiz.vercel.app/download?id=${encodeURIComponent(videoId)}&apikey=${getRandomApiKey()}`);
        const videoUrl = downloadResponse.data[0];

  if (!videoUrl) {
            message.reply("Failed to retrieve download link for the video.");
            return;
        }

        try {
            const lyricsResponse = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(title.split('-')[0])}/${encodeURIComponent(title.split('-')[1] || '')}`);
            lyrics = lyricsResponse.data.lyrics;
        } catch (error) {
            lyrics = "Lyrics not found.";
        }

        const writer = fs.createWriteStream(path.join(__dirname, "cache", `${videoId}.mp3`));
        const response = await axios({
            url: videoUrl,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        writer.on('finish', () => {
            const videoStream = fs.createReadStream(path.join(__dirname, "cache", `${videoId}.mp3`));
            message.reply({ body: `📹 Playing: ${title}\n\n🎵 Lyrics:\n${lyrics.substring(0, 1000)}${lyrics.length > 1000 ? '...' : ''}`, attachment: videoStream });
            api.setMessageReaction("✅", event.messageID, () => {}, true);
        });
