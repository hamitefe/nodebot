const {GoalFollow} = require("mineflayer-pathfinder").goals;

class FollowGoal{
    constructor(target){
        this.target = target;
    }

    apply(bot) {
        if (!bot.players[this.target]){return ;}
        bot.pathfinder.setGoal(new GoalFollow(bot.players[this.target], 3));
    }
}

class KillGoal {
    constructor(target){
        this.target = target;
    }

    apply(bot) {
        if (!bot.bot.players[this.target]){return ;}
        if (!bot.bot.players[this.target]){return;}
        if (bot.eyelocation().distanceTo(bot.bot.players[this.target])<=3.5){
            bot.bot.attack(bot.players[this.target].entity);
            return;
        }

        bot.bot.pathfinder.setGoal(new GoalFollow(bot.bot.players[this.target].entity));
    }
}

module.exports = {
    "follow":FollowGoal,
    "kill":KillGoal
};