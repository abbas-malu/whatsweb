const qrcode = require("qrcode-terminal");
const csvtojson = require("csvtojson");
const { Client } = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");
const client = new Client();
const media = MessageMedia.fromFilePath("test.jpeg");
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let msg;
let phone_list = '';
var csvfilepath = "data.csv";
client.on("message", (message) => {
//   console.log(message.from);
  if (message.body.includes("m$s$g$")) {
    msg = message.body.replace("m$s$g$", "");
    // console.log(msg)
  }
  if (message.body.includes("c$s$v$")) {
    phone_list += message.body.replace("c$s$v$", "");
    // console.log(phone_list)
  }
  if (message.body.includes("$shootimg$")){
    let countUnreg = 0;
    let countReg = 0;
    let unregMob = [];
    let tempMsg = "";
    csvtojson()
      .fromString(csvfilepath)
      .then(async (jsonData) => {
        var x = jsonData;
        const demo1 = async function demo(dataRow) {
          for (let i = 0; i < dataRow.length; i++) {
            client
              .isRegisteredUser(`91${dataRow[i].mobile}@c.us`)
              .then((regStatus) => {
                if (regStatus) {
                  tempMsg = msg
                  Object.keys(dataRow[i]).forEach(element => {
                    tempMsg = tempMsg.replace(`<${element}>`,`${dataRow[i][element]}`)
                    // console.log(dataRow[i][element])
                  });
//                   let media = MessageMedia.fromFilePath(`ss/${dataRow[i].scode}.png`);
                  client.sendMessage(`91${dataRow[i].mobile}@c.us`, media,{'caption':`Scode : ${dataRow[i].scode}`});
//                   client.sendMessage(`91${dataRow[i].mobile}@c.us`, media,{'caption':``});
                  // client.sendMessage(`91${dataRow[i].mobile}@c.us`, tempMsg);
                  countReg += 1;
                  // client.sendMessage(media,})
                } else {
                  countUnreg += 1;
                  unregMob.push(dataRow[i].scode);
                }
              });
            await sleep(3000);
          }
        };
        await demo1(x);

        client.sendMessage(
          "916232705352@c.us",
          `Message Brodcasted Is: \n*====================\n\n====================\nTotal Registered no. : ${countReg}\nTotal Unregistered no. : ${countUnreg}\n====================*\n\n\nList of unregistred  numbers : ${unregMob.toString()}`
        );
      });
  }
  if (message.body.includes("$shoot$")) {
    let countUnreg = 0;
    let countReg = 0;
    let unregMob = [];
    let tempMsg = "";
    csvtojson()
      .fromString(phone_list)
      .then(async (jsonData) => {
        var x = jsonData;
        const demo1 = async function demo(dataRow) {
          for (let i = 0; i < dataRow.length; i++) {
            client
              .isRegisteredUser(`91${dataRow[i].mobile}@c.us`)
              .then((regStatus) => {
                // console.log(regStatus)
                // console.log(`${dataRow[i].mobile}@c.us`)
                // client.isRegisteredUser('916232705352@c.us').then((regS)=>{console.log(regS)})
                if (regStatus) {
                  // console.log(Object.keys(dataRow[i]))
                  // tempMsg = `${msg}`.replace(`<name>`, `${dataRow[i].name}`).replace(`<scode>`, `${dataRow[i].scode}`).replace(`<msj_main>`, `${dataRow[i].msj_main}`).replace(`<sabeel>`, `${dataRow[i].sabeel}`).replace(`<est_sabeel>`, `${dataRow[i].est_sabeel}`).replace(`<niy_fmb>`, `${dataRow[i].niy_fmb}`);
                  // msj_main	sabeel	est_sabeel	niy_fmb
                  // console.log(tempMsg)
                  tempMsg = msg
                  Object.keys(dataRow[i]).forEach(element => {
                    tempMsg = tempMsg.replace(`<${element}>`,`${dataRow[i][element]}`)
                    // console.log(dataRow[i][element])
                  });
                  client.sendMessage(`91${dataRow[i].mobile}@c.us`, tempMsg);
                  countReg += 1;
                  // client.sendMessage(media,})
                } else {
                  countUnreg += 1;
                  unregMob.push(dataRow[i].scode);
                }
              });
            await sleep(3000);
          }
        };
        await demo1(x);

        client.sendMessage(
          "916232705352@c.us",
          `Message Brodcasted Is: \n*====================\n${tempMsg}\n====================\nTotal Registered no. : ${countReg}\nTotal Unregistered no. : ${countUnreg}\n====================*\n\n\nList of unregistred  numbers : ${unregMob.toString()}`
        );
      });
  } if (message.body.includes('$clearlist$')) {
    phone_list = ''
    msg = ''
  }
  if (message.body.includes('$shootall$')) {
    let countUnreg = 0;
    let countReg = 0;
    let unregMob = [];
    let tempMsg = "";
    csvtojson()
      .fromFile(csvfilepath)
      .then(async (jsonData) => {
        var x = jsonData;
        const demo1 = async function demo(dataRow) {
          for (let i = 0; i < dataRow.length; i++) {
            client
              .isRegisteredUser(`91${dataRow[i].mobile}@c.us`)
              .then((regStatus) => {
                // console.log(regStatus)
                // console.log(`${dataRow[i].mobile}@c.us`)
                // client.isRegisteredUser('916232705352@c.us').then((regS)=>{console.log(regS)})
                if (regStatus) {
                  tempMsg = `${msg}`.replace('<name>', `${dataRow[i].name}`).replace('<scode>', `${dataRow[i].scode}`).replace('<dept>', `${dataRow[i].dept}`);
                  client.sendMessage(`91${dataRow[i].mobile}@c.us`, tempMsg);
                  countReg += 1;
                  // client.sendMessage(media,})
                } else {
                  countUnreg += 1;
                  unregMob.push(dataRow[i].its);
                }
              });
            await sleep(3000);
          }
        };
        await demo1(x);

        client.sendMessage(
          "916232705352@c.us",
          `Message Brodcasted Is: \n*====================\n${tempMsg}\n====================\nTotal Registered no. : ${countReg}\nTotal Unregistered no. : ${countUnreg}\n====================*\n\n\nList of unregistred ITS numbers : ${unregMob.toString()}`
        );
      });
  }
});
client.initialize();
