// const {Telegraf} = require("telegraf")
// const bot = new Telegraf();


// bot.use((ctx)=>{
//     ctx.reply('hi human')
// })

// bot.launch()
const express=require('express')
const app=express();
require('dotenv').config()
const server_Port =process.env.PORT;
const {Telegraf} = require('telegraf');
// const mongoose = require("mongoose");
// const User = mongoose.model("User");
const bot = new Telegraf(process.env.Token);


app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello')
})

// mongoose.connect(process.env.DATABASE, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });
  
// mongoose.connection.on("error", (err) => {
//     console.log("Mongoose Connection ERROR: " + err.message);
// });
  
// mongoose.connection.once("open", () => {
//     console.log("MongoDB Connected!");
// });
// //Bring in the models
// require("./models/User");


bot.hears('Start', ctx => {
    // const {id,first_name,username} = ctx.from
    // const userExists = await User.findOne({
    //     id,
    //   });
    
    //   if (userExists) throw "Userexits.";
    
    //   const user = new User({
        
    //   });
    
    //   await user.save();
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id,`Hello ${ctx.chat.first_name} `)
    bot.telegram.sendMessage(ctx.chat.id, `Did you take vaccine? if yes then how many`, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'No', callback_data: '0' },
                ],
                [
                    { text: 'Yes,One', callback_data: '1' },
                ],
                [
                    { text: 'Yes, Two', callback_data: '2' },
                ]
            ]
        }
    })
})

bot.action('0', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Please get vaccinated soon', {
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Are you feeling sick ?', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Yes', callback_data: 'yes' },
                ],
                [
                    { text: 'No', callback_data: 'no' },
                ]
            ]
        }
    })

})
bot.action('yes', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Please share your details, We will reach to you', requestPhoneKeyboard)

})
bot.action('no', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Stay safe, Keep distance')

})


const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My phone number",
                request_contact: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }
};

bot.action('1', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Book your second dose on time', {
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Are you feeling sick ?', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Yes', callback_data: 'yes' },
                ],
                [
                    { text: 'No', callback_data: 'no' },
                ]
            ]
        }
    })
})
bot.action('2', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'You are Hero, Be safe', {
    })
})
bot.command('Bot', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'provide some feedback for improvement.', {

    })
})


bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'please send Start, we welcome you here.', {
    })
})

bot.launch();
app.listen(server_Port,()=>{
    console.log(`Server is rocking the Port:${server_Port}`);
})