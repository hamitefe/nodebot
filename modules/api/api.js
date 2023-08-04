const express = require("express");
const cors = require("cors");
const e = require("express");
const bot = require("../bot/bot").bot;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var bots = []


app.get('/createbot', (req, res) => {
    const args = req.query;
    const mfBot = new bot(req.query);
    mfBot.bot.on("end", () => {bots.splice(bots.indexOf(mfBot));});
    bots.push(mfBot);
});

app.get('/command', (req, res) => {
    const body = req.query;
    bots.forEach(bot2 => {
        if (bot2.bot.username==body.username){
            bot2.command(body.command);
        }
    })

    res.send("ok");
})

app.get('/getbot', (req, res) =>{
    const body = req.query;
    bots.forEach(bot2 => {
        if (bot2.username==body.username){
            res.send(JSON.stringify({
                "messages":bot2.messagesRecieved,
                "status":bot2.isAlive
            }));
        }
    })
    
});

app.get('/bots', (req, res) => {
    var stringArr = [];
    bots.forEach(bot2 => {
        stringArr.push(bot2.username);
    })

    res.send(JSON.stringify(stringArr));
});

app.listen(8000);