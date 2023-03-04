const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    qrBase = qr;
    qrcode.generate(qr, { small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.initialize();

exports.module = client;