module.exports = {
 config: {
 name: "yeamata",
 version: "1.0",
 author: "XyryllPanget",
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "yeamata") {
 return message.reply({
 body: "yamata kudasai",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/PjXGoUu.mp4")
 });
 }
 }
}
