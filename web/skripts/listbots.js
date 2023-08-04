var bots;

setInterval(() => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/bots",
        success: function (response) {
            bots = JSON.parse(response);
            const botsel = document.getElementById("botlist");
            botsel.innerHTML = "";
            if (!bots){return;}
            bots.forEach((bot) => {
                if (bot==""||!bot){return;}
                const span = document.createElement("span");
                span.id=`bot${bot}`
                const breakline = document.createElement("br");

                span.innerText = bot;
                botsel.appendChild(breakline);
                botsel.appendChild(span);
            });
        }
    });
    
}, 2000);