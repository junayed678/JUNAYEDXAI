const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); 

module.exports = {
        config: {
                name: "owner",
                author: "Tokodori",
                role: 0,
                shortDescription: " ",
                longDescription: "",
                category: "admin",
                guide: "{pn}"
        }, 

        onStart: async function ({ api, event }) {
                try {
                        const ownerInfo = {
                                name: 'JUNAYED',
                                gender: '𝗠𝗮𝗹𝗲',
                                hobby: '𝗖𝗼𝗱𝗲 𝗘𝘃𝗲𝗿𝘆𝗱𝗮𝘆',
                                Fb: 'https://facebook.com/Mdyeasin.Arafat.Junayed',
                                Relationship: '𝘄𝗶𝘁𝗵 𝗺𝘆 𝗰𝗮𝘁',
                                bio: '𝗗𝗶𝘀𝗰𝗼𝗻𝗻𝗲𝗰𝘁 𝗺𝗲 𝗳𝗿𝗼𝗺 𝘁𝗵𝗲 𝘄𝗼𝗿𝗹𝗱 𝗼𝗳 𝘁𝗲𝗰𝗵𝗻𝗼𝗹𝗼𝗴𝘆 𝗮𝗻𝗱 𝗶 𝘄𝗶𝗹𝗹 𝗯𝗲 𝘆𝗼𝘂𝗿 𝗴𝘂𝗶𝗱𝗲. 𝗜 𝘄𝗶𝗹𝗹 𝗵𝗲𝗹𝗽 𝘆𝗼𝘂 𝘁𝗼 𝗹𝗲𝗮𝗿𝗻 𝗮𝗻𝗱 𝗴𝗿𝗼𝘄. 𝗜 𝘄𝗶𝗹𝗹 𝗯𝗲 𝘆𝗼𝘂𝗿 𝗳𝗿𝗶𝗲𝗻𝗱 𝗮𝗻𝗱 𝗴𝘂𝗶𝗱𝗲 𝘆𝗼𝘂 𝘁𝗵𝗿𝗼𝘂𝗴𝗵 𝘁𝗵𝗲 𝗷𝗼𝘂𝗿𝗻𝗲𝘆 𝗼𝗳 𝗰𝗼𝗱𝗶𝗻𝗴'
                        }; 

                        const bold = 'https://i.imgur.com/SyBjkss.mp4';
                        const tmpFolderPath = path.join(__dirname, 'tmp'); 

                        if (!fs.existsSync(tmpFolderPath)) {
                                fs.mkdirSync(tmpFolderPath);
                        } 

                        const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
                        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4'); 

                        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary')); 

                        const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Relationship: ${ownerInfo.Relationship}
Hobby: ${ownerInfo.hobby}
Fb: ${ownerInfo.Fb}
Bio: ${ownerInfo.bio}
                        `; 

                        await api.sendMessage({
                                body: response,
                                attachment: fs.createReadStream(videoPath)
                        }, event.threadID, event.messageID); 

                        fs.unlinkSync(videoPath); 

                        api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
                } catch (error) {
                        console.error('Error in ownerinfo command:', error);
                        return api.sendMessage('An error occurred while processing the command.', event.threadID);
                }
        }
}; 

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
