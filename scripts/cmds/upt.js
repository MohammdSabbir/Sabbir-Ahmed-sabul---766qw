const os = require('os');
const fs = require('fs').promises;
const pidusage = require('pidusage');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

module.exports = {
    config: {
        name: 'upt2',
        aliases: ["up2", "state2", "uptime2"],
        version: '1.0',
        author: "Nazrul",
        countDown: 5,
        role: 0,
        shortDescription: 'Show all Information of Uptime',
        longDescription: { en: 'Show all uptime information of bot' },
        category: 'system',
        guide: { en: '{p}upt' }
    },

    byte2mb(bytes) {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0, n = parseInt(bytes, 10) || 0;
        while (n >= 1024 && ++l) n /= 1024;
        return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
    },

    async getStartTimestamp() {
        try {
            const startTimeStr = await fs.readFile('uptime_start_time.txt', 'utf8');
            return parseInt(startTimeStr);
        } catch (error) {
            return Date.now();
        }
    },

    async saveStartTimestamp(timestamp) {
        try {
            await fs.writeFile('uptime_start_time.txt', timestamp.toString());
        } catch (error) {
            console.error('Error saving start timestamp:', error);
        }
    },

    getUptime(uptime) {
        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const mins = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        return `${days}d ${hours}h ${mins}m ${seconds}s`;
    },

    async getInstalledPackagesCount() {
        try {
            const { stdout } = await execPromise('npm ls --depth=0 | wc -l');
            return parseInt(stdout.trim()) - 1;
        } catch (error) {
            return 'Error retrieving package count';
        }
    },

    async getDiskSpaceInfo() {
        try {
            const { stdout } = await execPromise('df -h / | tail -1');
            const parts = stdout.trim().split(/\s+/);
            return { total: parts[1], used: parts[2], available: parts[3] };
        } catch (error) {
            return { total: 'N/A', used: 'N/A', available: 'N/A' };
        }
    },

    onStart: async ({ api, event, usersData, threadsData }) => {
        const startTime = await module.exports.getStartTimestamp();
        const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
        const usage = await pidusage(process.pid);
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" });
        const time = currentDate.toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour12: true });
        const allUsers = await usersData.getAll();
        const allThreads = await threadsData.getAll();
        const totalUsers = 6356 + allUsers.length;
        const totalGroups = 327 + allThreads.length;

        const uptimeMessage = module.exports.getUptime(uptimeSeconds);
        const systemUptime = module.exports.getUptime(os.uptime());
        const timeStart = Date.now();
        const installedPackagesCount = await module.exports.getInstalledPackagesCount();
        const diskSpace = await module.exports.getDiskSpaceInfo();
        const totalMemory = module.exports.byte2mb(os.totalmem());
        const freeMemory = module.exports.byte2mb(os.freemem());
        const cpuModel = os.cpus()[0].model;

        const networkInfo = Object.entries(os.networkInterfaces()).map(([ifName, addrs]) => {
            return `${ifName}: ${addrs.map(iface => iface.address).join(', ')}`;
        }).join('\n');

        const returnResult = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🤖 BOT STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗓️ Date: ${date} | ⏰ Time: ${time}
🚀 UPTIME INFORMATION
━━━━━━━━━━━━━━━━━━━
- Bot Uptime: ${uptimeMessage}
- System Uptime: ${systemUptime}
- Ping: ${Date.now() - timeStart} ms
💻 SYSTEM INFORMATION
━━━━━━━━━━━━━━━━━━━
- CPU Usage: ${usage.cpu.toFixed(1)}%
- RAM Usage: ${module.exports.byte2mb(usage.memory)}
- Total Memory: ${totalMemory}
- Free Memory: ${freeMemory}
- CPU Cores: ${os.cpus().length}
- CPU Model: ${cpuModel}
- Installed Packages: ${installedPackagesCount}
📊 BOT STATISTICS
━━━━━━━━━━━━━━━━━━━
- Total Users: ${totalUsers}
- Total Groups: ${totalGroups}
💾 DISK INFORMATION
━━━━━━━━━━━━━━━━━━━
- Total Disk Space: ${diskSpace.total}
- Used Disk Space: ${diskSpace.used}
- Available Disk Space: ${diskSpace.available}
🌐 NETWORK INFORMATION
━━━━━━━━━━━━━━━━━━━
${networkInfo}
👑 BOT Owner - 𝗦𝗔𝗕𝗕𝗜𝗥 𝗔𝗛𝗠𝗘𝗗
━━━━━━━━━━━━━━━━━━━
🌐 Messenger: https://www.facebook.com/profile.php?id=100071882764076
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

        await module.exports.saveStartTimestamp(startTime);
        return api.sendMessage(returnResult, event.threadID, event.messageID);
    }
};
