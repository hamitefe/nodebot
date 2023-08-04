const {follow, kill} = require("./goal");
function attack(bot, target){
    bot.goal = new kill(target);
}
function follow2(bot, target){
    bot.goal = new follow(target);
}
function dropSelected(bot){

}
function chat(bot, string){
    bot.chat(string);
}
function changeHotbar(bot, slot){
    bot.bot.setQuickBarSlot(parseInteger(slot));
}

function parse(bot, command){
    const args = command.split(' ');
    if (args[0]=="attack"){
        attack(bot, args[1]);
    } else if(args[0]=="follow"){
        follow2(bot, args[1]);
    } else if(args[0]=="dropSelected"){
        dropSelected(bot);
    } else if(args[0]=="chat"){
        chat(bot, args.slice(1).join(' '));
    } else if(args[0]=="sethotbar"){
        changeHotbar(bot, args[1]);
    }
}

module.exports = {
    "attack": attack,
    "follow": follow2,
    "dropSelected": dropSelected,
    "chat": chat,
    "changeHotbar": changeHotbar,
    "parse": parse
}