const express = require('express');
const messageRouter = require("./routers/messageRouter");


const cors = require("cors");
const app = express();
app.use(express.json());

const env = require('dotenv');
env.config();
const port = process.env.APP_PORT;  


app.use(cors({
	origin: true
}))


app.listen(port, () => console.log(`-- servidor rodando na porta ${port} --`));

