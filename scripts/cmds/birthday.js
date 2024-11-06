const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');
const jimp = require('jimp');

const birthdayFilePath = path.join(__dirname, 'assets', 'birthdays.json');

function loadBirthdays() {
  if (!fs.existsSync(birthdayFilePath)) {
    fs.writeFileSync(birthdayFilePath, '{}');
  }
  return JSON.parse(fs.readFileSync(birthdayFilePath));
}

function saveBirthdays(birthdays) {
  fs.writeFileSync(birthdayFilePath, JSON.stringify(birthdays, null, 4));
}

function listBirthdays() {
  const birthdays = loadBirthdays();
  const birthdayList = Object.values(birthdays).map(user => `🍁 | ${user.userName}: ${user.birthday} 🕊`).join('\n\n');
  return birthdayList || '❎ | 𝙽𝚘 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢𝚜 𝚜𝚎𝚝.';
}

async function bal(uid) {
    let avMentionedUser = await jimp.read(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
    avMentionedUser.circle();
    let pth = `${__dirname}/tmp/wish.jpg`;
    let img = await jimp.read("https://i.ibb.co/9cYzw3J/Hpbd-name-1655b9480a850c.jpg");
    img.resize(1000, 667).composite(avMentionedUser.resize(320, 320), 346, 82);

    await img.writeAsync(pth);
    return pth;
}

module.exports.config = {
    name: 'birthday',
    aliases: ["bday", "bd"],
    version: '1.1',
    author: 'Dipto',
    role : 0,
    description: '𝗦𝗲𝘁 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗼𝗳 𝗨𝘀𝗲𝗿𝘀',
    category: '𝗧𝗢𝗢𝗟𝗦',
    guide:'{pn} [mention/reply] - [date/month]',
    countDown: 5 
};

module.exports.onStart = async function ({ api, event, args, usersData }) {
    const birthdays = loadBirthdays();
    const { threadID, messageID, mentions } = event;

    if (args[0] === 'list') {
      const birthdayList = listBirthdays();
      return api.sendMessage(`🧸 | 𝙻𝚒𝚜𝚝 𝚘𝚏 𝙱𝚒𝚛𝚝𝚑𝚍𝚊𝚢𝚜 | 🧸\n\n\n${birthdayList}`, threadID, messageID);
    }

    if (Object.keys(mentions).length > 0 || event.type === "message_reply") {
      const userID = Object.keys(mentions)[0] || event.messageReply.senderID;
      const [day, month] = args.slice(args.indexOf('-') + 1).join('').split('/');
      const userTimezone = 'Asia/Dhaka';
      const userBirthday = moment.tz(`2023-${month}-${day}`, 'YYYY-MM-DD', userTimezone);

      if (!userID) {
        return api.sendMessage('❎ | 𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚖𝚎𝚗𝚝𝚒𝚘𝚗/𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚞𝚜𝚎𝚛 𝚝𝚘 𝚜𝚎𝚝 𝚝𝚑𝚎𝚒𝚛 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢.', threadID, messageID);
      }

      if (!day || !month) {
        return api.sendMessage('❎ | 𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚜𝚙𝚎𝚌𝚒𝚏𝚢 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢 𝚒𝚗 𝚝𝚑𝚎 𝚏𝚘𝚛𝚖𝚊𝚝 𝙳𝙳/𝙼𝙼.', threadID, messageID);
      }

      if (userBirthday.isBefore(moment.tz('2023-01-01', 'YYYY-MM-DD', userTimezone))) {
        return api.sendMessage('❎ | 𝚈𝚘𝚞 𝚌𝚊𝚗𝚗𝚘𝚝 𝚜𝚎𝚝 𝚊 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢 𝚒𝚗 𝚝𝚑𝚎 𝚙𝚊𝚜𝚝.', threadID, messageID);
      }

      if (birthdays[userID]) {
        return api.sendMessage("❎ | 𝚃𝚑𝚒𝚜 𝚞𝚜𝚎𝚛'𝚜 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢 𝚑𝚊𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚋𝚎𝚎𝚗 𝚜𝚎𝚝.", threadID, messageID);
      }

      const name = await usersData.getName(userID);
      birthdays[userID] = {
        userName: name,
        birthday: `${day}/${month}`,
        timezone: userTimezone,
        timestamp: userBirthday.valueOf(),
        threadID: threadID,
        uid: userID
      };

      saveBirthdays(birthdays);
      return api.sendMessage(`✅ | 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝘀𝗲𝘁 𝗳𝗼𝗿 ► ${name} = ${day}/${month}`, threadID, messageID);
    }
};

module.exports.onChat = async function ({ api, usersData }) {
    const today = moment.tz('Asia/Dhaka');
    const [day, month] = [today.date(), today.month() + 1];
  const currentDate = moment().tz("Asia/Dhaka").format("DD-MM-YYYY");
  const currentTime = moment().tz("Asia/Dhaka").format("hh:mm:ss A");
    const birthdays = loadBirthdays();
    for (const userID in birthdays) {
      const user = birthdays[userID];
if (user.birthday === `${day}/${month}` && today.hours() === parseInt('0', 10) && today.minutes() === parseInt('0', 10)){
        const uid = user.uid;
        const savedThreadID = user.threadID;

        try {
          const userName = await usersData.getName(uid);
          bal(uid).then(ptth => {
      api.sendMessage({ 
            body: `
┏┓｡･ﾟﾟ･｡｡ﾟ♡🎈🎈
┃┗┛ 𝐚𝐩𝐩𝐲•°•♡🎁
┃┏┓┃　.  𝐛𝐢𝐫𝐭𝐡𝐝𝐚𝐲 🧁🍰
┗┛┗┛　

╔╦══••✠•❀❀•✠••══╦╗
           ${userName}
╚╩══••✠•❀❀•✠••══╩╝

- 𝚃𝚑𝚒𝚜 𝚑𝚊𝚙𝚙𝚢 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢 𝚂𝚝𝚊𝚝𝚞𝚜 𝚒𝚜 𝚜𝚑𝚘𝚛𝚝 𝙱𝚞𝚝 𝚠𝚒𝚜𝚑𝚒𝚗𝚐 𝚢𝚘𝚞 𝚎𝚟𝚎𝚛𝚢𝚝𝚑𝚒𝚗𝚐 𝚝𝚑𝚊𝚝 𝚋𝚛𝚒𝚗𝚐𝚜 𝚢𝚘𝚞 𝚑𝚊𝚟𝚙𝚒𝚗𝚎𝚜𝚜 𝚝𝚘𝚍𝚊𝚢 𝚊𝚗𝚍 𝚊𝚕𝚜𝚘 𝚠𝚊𝚢𝚜... 🍩🎉🎁

- 𝙤𝙣𝙘𝙚 𝙖𝙜𝙖𝙞𝙣 𝙝𝙖𝙥𝙥𝙮 𝙗𝙞𝙧𝙩𝙝𝙙𝙖𝙮 𝙩𝙤 𝙮𝙤𝙪 ${userName}🎂🎀🌹

- 𝙼𝚊𝚗𝚢 𝙼𝚊𝚗𝚢 𝙷𝚊𝚙𝚙𝚢 𝚁𝚎𝚝𝚞𝚛𝚗𝚜 𝙾𝚏 𝚃𝚑𝚎 𝙳𝚊𝚢🥰

- 𝙃𝙖𝙥𝙥𝙮 𝙗𝙞𝙧𝙩𝙝𝙙𝙖𝙮 𝙩𝙤 𝙮𝙤𝙪 𝘿𝙚𝙖𝙧 ${userName}🖤

  🌹❤ 𝙻𝚘𝚟𝚎 𝚞 𝚊𝚕𝚠𝚊𝚢𝚜 ❤🌹

- 𝐞𝐯𝐞𝐫𝐲 𝐝𝐚𝐲 𝐢𝐬 𝐬𝐩𝐞𝐜𝐢𝐚𝐥

    - 𝙃𝙖𝙥𝙥𝙮 𝙗𝙞𝙧𝙩𝙝𝙙𝙖𝙮 𝙩𝙤 𝙮𝙤𝙪.!

  🌹 ${userName} 🌹

- Date ⇏ ${currentDate} 

- Time ⇏ ${currentTime}
`,  mentions: [{ id: uid, tag: userName }],
                  attachment: fs.createReadStream(pth)
             }, savedThreadID);
            });

          delete birthdays[userID];
          saveBirthdays(birthdays);
          break;
        } catch (error) {
          api.sendMessage(`❎ | 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚋𝚒𝚛𝚝𝚑𝚍𝚊𝚢 𝚖𝚎𝚜𝚜𝚊𝚐𝚎: ${error}`, threadID, messageID);
        }
      }
    }
};