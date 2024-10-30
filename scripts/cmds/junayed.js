module.exports = {
        config: {
                name: "junayed",
                aliases: ["junayed"],
                version: "1.0",
                author: "Doru fix by kivv",
                countDown: 5,
                role: 2,
                shortDescription: "I Am King",
                longDescription: "Your Bot Creator",
                category: "junayed",
                guide: "{pn}"
        },

        onStart: async function ({ message }) {
         var link = [ 
"https://i.imgur.com/nN28Eea.mp4",
"https://i.imgur.com/6b61HGs.mp4",
"https://i.imgur.com/WWGiRvB.mp4",
"https://i.imgur.com/EPzjIbt.mp4",
"https://i.imgur.com/X7lugs3.mp4",
"https://i.imgur.com/N3wIadu.mp4",
"https://i.imgur.com/Qudb0Vl.mp4",
"https://i.imgur.com/JnmXyO3.mp4",
"https://i.imgur.com/fknQ3Ut.mp4",
"https://i.imgur.com/yXZJ4A9.mp4",
"https://i.imgur.com/GnF9Fdw.mp4",
 "https://i.imgur.com/B86BX8T.mp4",
"https://i.imgur.com/kZCBjkz.mp4",
        "https://i.imgur.com/id5Rv7O.mp4",
        "https://i.imgur.com/aWIyVpN.mp4",
        "https://i.imgur.com/aFIwl8X.mp4",
        "https://i.imgur.com/SJ60dUB.mp4",
        "https://i.imgur.com/ySu69zS.mp4",
        "https://i.imgur.com/mAmwCe6.mp4",
        "https://i.imgur.com/Sbztqx2.mp4",
        "https://i.imgur.com/s2d0BIK.mp4",
        "https://i.imgur.com/rWRfAAZ.mp4",
        "https://i.imgur.com/dYLBspd.mp4",
        "https://i.imgur.com/HCv8Pfs.mp4",
        "https://i.imgur.com/jdVLoxo.mp4",
        "https://i.imgur.com/hX3Znez.mp4",
        "https://i.imgur.com/cispiyh.mp4",
        "https://i.imgur.com/ApOSepp.mp4",
        "https://i.imgur.com/lFoNnZZ.mp4",
"https://i.imgur.com/qDsEv1Q.mp4",
"https://i.imgur.com/NjWUgW8.mp4",
"https://i.imgur.com/ViP4uvu.mp4",
"https://i.imgur.com/bim2U8C.mp4",
       ]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
        body: '「 Junayed 」',attachment: await global.utils.getStreamFromURL(img)
})
}
                 }
