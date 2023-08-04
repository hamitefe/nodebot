const mineflayer = require("mineflayer");
const pathfinder = require("mineflayer-pathfinder").pathfinder;
const goals = require("./goal");
const commands = require("./commands");

module.exports = {
    "bot": class{
        constructor(botArgs){
            this.username = botArgs["username"];
            this.bot = mineflayer.createBot(botArgs);
            this.goal;
            this.messagesRecieved = [];
            this.errorsRecieved = []; 
            this.isAlive = true;
            this.init();
         }

        async players(){
            return this.bot.players;
        }

        async eyelocation(){
            return this.bot.entity.position.offset(0, this.bot.entity.height, 0);
        }

        attack(player){
          this.goal = new goals.attack(player);
        }

        follow(player){
          this.goal = new goals.follow(player);
        }

        chat(string){
            this.bot.chat(string);
        }

        command(string){
            if (!string){return;}
            if (!string.toString().startsWith(".")){
                this.chat(string);
            } else {
                commands.parse(this.bot, string.substring(1));
            }
        }

        init(){
            this.bot.loadPlugin(pathfinder);
            this.bot.on("messagestr", (str) => {this.messagesRecieved.push(str);})
            this.bot.on("error", (error) => {this.messagesRecieved.push(error.name);})
            this.bot.on("kicked", (reason) => {this.messagesRecieved.push(reason); this.isAlive=false;});
            this.bot.on("physicTick", () => {
                if (!this.goal){return;}
                if (!this.goal.apply){return;}
                this.goal.apply(this.bot);
            })
        }
    }
}