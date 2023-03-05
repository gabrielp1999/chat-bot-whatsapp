const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const cors = require("cors");
const app = express();
app.use(express.json());

const env = require('dotenv');
env.config();

const port = process.env.APP_PORT;  
const delay = process.env.APP_DALAY;


app.use(cors({
	origin: true
}))

client.on('qr', (qr) => {
    qrBase = qr;
    qrcode.generate(qr, { small: true});
});


client.on('message', message => {
	const message1 = "Digite: <br/> 1- para fazer um pedido<br/> 2- para ver o cardapio"
	if(message.body) {
		client.sendMessage(message.from, message1);
	}

	if(message.body === "1") {
		client.sendMessage(message.from, "Mensagem 2");
	}
});


app.post("/sendMessage", async (req,res) => {

	const { users, message } = req.body;
	for (const user of users) {
		const phoneNumber = `${user.number}@c.us`;
		const newMessage = message.replace('{name}', user.name); 
		try {
			await client.sendMessage(phoneNumber, newMessage);
			console.log(`Mensagem enviada para ${phoneNumber}`);
			await new Promise(resolve => setTimeout(resolve, delay));
			
		} catch (err) {
			console.error(`Erro ao enviar mensagem para ${phoneNumber}:`, err);
			
			return res.status(400).send({status: 400, message: "Ouve um erro ao enviar a mensagem" });
		}
	}
	res.status(200).json({status:200, message: "Enviando mensagens com sucesso"});
	
})

client.on('ready', () => {
	console.log('Conectado ao provedor');
});


client.initialize();
app.listen(port, () => console.log(`-- servidor rodando na porta ${port} --`));

