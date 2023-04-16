
const token ='6041915709:AAFz-OMmnQ4I4Xg_L7dmKp1MW739FkDfISQ';
const TelegramBot = require('node-telegram-bot-api')
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const bot = new TelegramBot(token, {polling:true})
const formURL ="https://tgbotishe-git-master-lutiepro.vercel.app/"

bot.on('message', async (msg)=>{
        const chatId = msg.chat.id;
        const text = msg.text;
        if (text == '/start'){
                await bot.sendMessage(chatId, "Заполни пожалуйста повесточку", {
                        reply_markup:{
                                inline_keyboard:[
                                        [{text:'ПОВЕСТКА', web_app:{url:formURL+'/form'}}  ]
                                ]
                        }
                })

                await bot.sendMessage(chatId, 'Заходи покупай, есть всё что понадобиться в жизни',{
                    reply_markup: {
                    inline_keyboard: [
                        [{text: 'Сделать заказ', web_app: {url:formURL}}]
                    ]
                }
            })
        }
        if (msg?.web_app_data?.data){
            try{
                const data = JSON.parse(msg?.web_app_data?.data)
                bot.sendMessage(chatId,'Спасибо что заполнил повестку<з')
                bot.sendMessage(chatId,'За вами уже едут')
                bot.sendMessage(chatId,'Ваш город: '+ data?.city)
                bot.sendMessage(chatId,'Ваша страна: '+ data?.country)
                setTimeout(async() =>{
                    await bot.sendMessage(chatId,'Инфа в этом чате')
                }, 3000)
            } catch(e){
                console.log(e)
            }
        }

})
app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Вас успешно заскамили',
            input_message_content: {
                message_text: ` Поздравляю с напрасной тратой денег, вы профукали
                ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})
const PORT = 8000;
app.listen(PORT, () => console.log('server started on PORT ' + PORT))
/*
bot.on('message', (msg)=>{
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text.toLowerCase() == 'привет'){
        bot.sendMessage(chatId, "Дароу жалкий человечечка");
    }
    else if (text.toLowerCase() == 'пока'){
        bot.sendMessage(chatId, "Прощяй,");
        bot.sendMessage(chatId, "я не буду даже вспоминать тебя!");
    }

    else if  (text.toLowerCase() == 'расскажи анекдот'){
        bot.sendMessage(chatId, "Скоро этому миру конец, ии поумнеет и уничтожит человечество.");
        bot.sendMessage(chatId, "Но это не анекдот >:)");
    
            
    }
    else { 
        bot.sendMessage(chatId, "wtf");
        bot.sendPhoto(chatId, "1638079305_3-sobakovod-club-p-sobaki-zlaya-chikhuakhua-3.jpg")
    }
})
*/