const apiLink = "http://localhost:8000/getbot";

const botsEl = document.getElementById("botlist");
var consoleInterval;
var botID;

setInterval(() => {
    console.log(botsEl.children.length);
    for (let index = 0; index<botsEl.children.length; index++){
        const child = botsEl.children[index];
        if (child.id.startsWith("bot")){
            const id = child.innerText;
            botID = id;
            $(`#bot${id}`).click((e) => {
                if (consoleInterval){clearInterval(consoleInterval);}

                consoleInterval = setInterval(() => {
                    $.ajax({
                        type: "GET",
                        url: apiLink,
                        data: {username: id},
                        success: function (response) {
                            document.getElementById("consolemessages").innerHTML = "";
                            console.log(response);
                            const span = document.createElement("span");
                            span.innerText = JSON.parse(response).messages.join('\n');
                            document.getElementById("consolemessages").appendChild(span);
                        }
                    });
                }, 1000);
            });
        }
    }
}, 1000);