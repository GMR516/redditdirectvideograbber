
var redditThings = document.getElementsByClassName("thing");
for (var i = 0; i < redditThings.length; i++) {
    //redditThings[i].style.backgroundColor = "red";
    for (var j = 0; j < redditThings[i].childNodes.length; j++) {
        try {
            var directLink = redditThings[i].childNodes[j].getElementsByClassName("flat-list buttons")[0].getElementsByClassName("first")[0].childNodes[0].href;
            //redditThings[i].childNodes[j].getElementsByClassName("flat-list buttons")[0].style.backgroundColor = "green";
            var directLinkButton = document.createElement("li");
            var directLinkButtonAhref = document.createElement("a");
            directLinkButtonAhref.href = "javascript: getDirectLink(\"" + directLink + "\");";
            var testButtonText = document.createTextNode("direct video link");
            directLinkButtonAhref.appendChild(testButtonText);
            directLinkButton.appendChild(directLinkButtonAhref);
            redditThings[i].childNodes[j].getElementsByClassName("flat-list buttons")[0].appendChild(directLinkButton);
        } catch (Exception) {
            //Spams console with hundreds of errors.
            //console.log("probably an ad: " + Exception);
        }
    }
}

function getDirectLink(inputString) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            try {
                var url = data[0]["data"]["children"][0]["data"]["secure_media"]["reddit_video"]["fallback_url"];
                console.log("TEST: " + url);
                copyTextToClipboard(url);
            } catch (Exception) {
                console.log(Exception);
                var url = data[0]["data"]["children"][0]["data"]["preview"]["reddit_video_preview"]["fallback_url"];
                console.log("TEST: " + url);
                copyTextToClipboard(url);
            }
        }
    };

    xmlhttp.open("GET", inputString + ".json", true);
    xmlhttp.send();
}

function copyTextToClipboard(text) {
    prompt("Copy text and hit return.", text);
}