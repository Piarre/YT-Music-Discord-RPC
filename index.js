const client = require("discord-rich-presence")("983806983184470086");
const express = require("express");
const axios = require("axios");
const app = express();

var song = "Waiting for";
var artist = "for music...";
var tempTime = "0:00";
(() => {
  client.on("error", () => {
    process.exit(0);
  });
  startRpc();
})();

function startRpc() {
  console.log("Starting express server...");
  update(song, artist);
  app.use(express.json());
  app.post("/", (request, response) => {
    let content = request.body;
    if (
      content.song == undefined ||
      content.song == null ||
      content.imageSong == null ||
      tempTime == content.timeMax.replace(" ", "") ||
      content.timeMax.replace(" ", "") == "0:00"
    ) {
      response.sendStatus(200);
      return;
    }

    if (song == content.song) response.sendStatus(200);

    tempTime = content.timeMax.replace(" ", "");
    song = content.song;

    update(
      `${content.song} by ${content.artist}`,
      content.albumInfo,
      Date.now(),
      timeToMilli(content.timeMax.replace(" ", "")),
      content.imageSong
    );
    response.sendStatus(200);
  });

  app.listen(4024, () =>
    console.log("YT Music RPC started and listening on port 4024.")
  );

  function update(song, artist, timeNow, timeMax, imageSong) {
    client.updatePresence({
      state: artist,
      details: song,
      startTimestamp: timeNow,
      endTimestamp: timeMax,
      largeImageKey: imageSong,
      smallImageKey:
        "https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png",
      instance: true,
    });
  }

  function timeToMilli(time) {
    var temp = Date.now();
    if (time.split(":").length == 2) {
      temp += Math.round(parseFloat(time.split(":")[0]) * 60000);
      temp += Math.round(parseFloat(time.split(":")[1]) * 1000);
    } else if (time.split(":").length == 3) {
      temp += Math.round(parseFloat(time.split(":")[0]) * 3600000);
      temp += Math.round(parseFloat(time.split(":")[1]) * 60000);
      temp += Math.round(parseFloat(time.split(":")[2]) * 1000);
    }
    return temp;
  }
  async function checkEndoint() {
    let res;
    await axios.get(`http://127.0.0.1:6463`).catch(function (error) {
      error.response ? (res = true) : (res = false);
    });
  }
}
