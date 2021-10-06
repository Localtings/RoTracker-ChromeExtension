$(document).ready(function(){
    var status;
    var onlineMessage;
    var offlineMessage;
    var loadAPIFailMessage;

    $.ajax({
        url: "textDisplay.json",
        dataType: "json",
        type: 'get',
        cache: false,
        success: function(data) {
            onlineMessage = data.Online;
            offlineMessage = data.Offline;
            loadAPIFailMessage = data.ErrorAPI;
        }
    });


    function displaySuccess(data, id) {
        if (data.IsOnline == true) {
            status = onlineMessage;
        } else {
            status = offlineMessage + data.LastOnline.substr(0, 10);
        }
        $(id).text(status);  
    }
    function displayFail(id) {
        $(id).text(loadAPIFailMessage);
    }

    $("#btn").click(function(){  
        var rblx_id = document.getElementById("rblx_id").value;
        
        try {
            $.ajax({
                url: "https://api.roblox.com/users/"+rblx_id+"/onlinestatus/",
                dataType: "json",
                type: 'get',
                cache: false,
                success: function(data) {
                    displaySuccess(data, "#text");
                }
            });
        } catch(error) {
            displayFail("#text");
        }
    });
});
