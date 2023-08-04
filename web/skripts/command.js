$("#consoleinput").keypress(function (e) { 
    if (e.key=="Enter"){
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/command",
            data:{
                command: $("#consoleinput").val(),
                username: botID
            },
            dataType: "dataType"
        });
        $("#consoleinput").val("");
    }
});