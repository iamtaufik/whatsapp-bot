const qrcode = require('qrcode-terminal');
const dotenv = require('dotenv');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { Configuration, OpenAIApi } = require('openai');
const { generateCommand } = require('./utils/generateCommand');
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.apiKey,
});

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  if (message.body === '.menu') {
    message.reply('*Chat AI* Silahkan kirim pesan dengan command *.ai {apa itu openai}*\n\n_Bot ini merupakan implementasi dari penggunaan OpenAi_\n\n_Taufik_');
  }

  if (message.body === '.ping') message.reply('Pong!');

  if (message.body.startsWith('.ai')) {
    if (message.body === '.ai') return message.reply('Argumen tidak boleh kosng!');
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generateCommand(message.body),
      temperature: 0.9,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    });

    message.reply(completion.data.choices[0].text);
  }
});

client.initialize();
