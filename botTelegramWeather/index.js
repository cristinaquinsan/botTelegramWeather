const TelegramBot = require('node-telegram-bot-api');
const key = require("./botKey")
var axios = require('axios');
var cheerio = require('cheerio');
var urlWeb = 'https://weather.com/es-ES/tiempo/hoy/l/SPXX0047:1:SP';
var ciudad;
var temperatura;
var frase;

const bot = new TelegramBot(key.token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/^\/start/, (msg, match) => {
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    // bot.sendMessage(chatId, chatId + " AAAAAAAAAAAA " + nameUser);
    axios.get(urlWeb).then(response => {
        const $ = cheerio.load(response.data);
        ciudad = $('.today_nowcard-loc-title-wrqpper').text();
        temperatura = $('.today_nowcard-temp span').text();
        frase = $('.today_nowcard-phrase').text();

        bot.sendMessage(chatId, "Ciudad: " + ciudad + "\nTemperatura: " + temperatura + "\n" + frase);
    });
});


