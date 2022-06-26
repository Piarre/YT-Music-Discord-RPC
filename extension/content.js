chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({
        response: "Message Received! (content)"
    });
	
    setInterval(() => { if(document.getElementsByClassName("byline style-scope ytmusic-player-bar complex-string")[0] != undefined)  sendMessage(); }, 1000);
});

function sendMessage() {
	var songName = document.getElementsByClassName("title style-scope ytmusic-player-bar")[0].innerHTML;
    var artistName = document.getElementsByClassName("byline style-scope ytmusic-player-bar complex-string")[0].innerText.toString().split(/•+/)[0];
    var albumName = document.getElementsByClassName("byline style-scope ytmusic-player-bar complex-string")[0].innerText.toString().split(/•+/)[1];
    var albumDate = document.getElementsByClassName("byline style-scope ytmusic-player-bar complex-string")[0].innerText.toString().split(/•+/)[2];
    var imageSong = document.getElementsByClassName("image style-scope ytmusic-player-bar")[0].src;

    var timeRemaining = document.getElementById("progress-bar").ariaValueMax - document.getElementById("progress-bar").ariaValueNow;
    var minute = Math.floor(timeRemaining/60);
    var seconds = timeRemaining%60;
    var time = `${minute}:${seconds}`;

    chrome.runtime.sendMessage({
        song: songName,
        artist: artistName,
        timeMax: time,
        imageSong: imageSong,
        albumInfo: `${albumName} • ${albumDate}`,
    });
}

