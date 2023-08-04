$("#createbot").click(function (e) { 
    $("#createbotscreen").css("display", "block");
});

$("#botauth").keypress(function (e) { 
    const auths = ["mojang", "microsoft", "offline"]
    const passwordauths = ["mojang", "microsoft"];
    const text = $("#botauth").val()+e.key;
    console.log(text);

    if (!auths.includes(text)){
        $("#botauth").css("color", "rgb(200, 110, 110)");
    } else {
        $("#botauth").css("color", "rgb(110, 110, 110)");
    }

    if (passwordauths.includes(text)){
        $("#botpassword").css("display", "block");
    } else {
        $("#botpassword").css("display", "none");
    }
});
$("#submitbot").click(function (e) { 
    $("#createbotscreen").css("display", "none");
    const username = $("#botname").val();
    const auth = $("#botauth").val();
    const host = $("#bothost").val().split(':')[0];  
    const port = $("#bothost").val().split(':')[1];
    const password = $("#botpassword").val();
    
    if (!username||username==""){
        alert("username must be filled!");
        return;
    }

    if (!["mojang", "microsoft", "offline"].includes(auth)||!auth){
        alert("invalid auth type!")
        return;
    }

    if (host==""||!host){
        alert("host should be filled!")
        return;
    }

    if (["mojang","microsoft"].includes(auth)){
        if (password==""||!password){
            alert("password should be filled!")
            return;
        }
    }

    const data = {"username":username, "host":host, "auth":auth}

    if (["mojang","microsoft"].includes(auth)){
        data["password"] = password;
    }

    if (port!=""&&port){
        data["port"] = port;
    }

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/createbot",
        data: data,
        dataType: "dataType",
        success: function (response) {
            alert(response);
        }
    });
});