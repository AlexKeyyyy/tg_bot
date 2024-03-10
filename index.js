const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require("./options");

const token = '6887914721:AAFz-rTCnY1Ph1KO3yKveLyuX52XucyU0Fc'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Угадай цифру от 0 до 9')
    chats[chatId] = Math.floor(Math.random() * 10);
    await bot.sendSticker(chatId, 'https://a127fb2c-de1c-4ae0-af0d-3808559ec217.selcdn.net/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/256/2.webp')
    await bot.sendMessage(chatId, 'Угадывай...', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветсвтие'},
        {command: '/info', description: 'Информация о пользователе'},
        {command: '/game', description: 'Начать игру'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://a127fb2c-de1c-4ae0-af0d-3808559ec217.selcdn.net/stickers/be1/98c/be198cd5-121f-4f41-9cc0-e246df7c210d/256/1.webp');
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот AlexKey`);

        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }

        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Меня твоя не понимать.')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data ==='/again')
        {
            return startGame(chatId);
        }
        if (data == chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOptions)
        }
        else {
            return bot.sendMessage(chatId, `Сорян, ты промазал, я загадал цифру ${chats[chatId]}`, againOptions)
        }
    })

}
start()



