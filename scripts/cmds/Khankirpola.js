module.exports = {
    config: {
        name: "khankir",
        version: "1.0",
        author: "Junayed", //** original author fb I'd : https://m.me/MR.AYAN.2X **//
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "khankir") return message.reply(" আস্তাগফিরুল্লাহ এসব কি বল-!!😒");
}
}; 
