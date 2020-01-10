var five = require("johnny-five"),
    board, lcd, button;
  
var WebSocketClient = require('websocket').client;
const fs = require('fs');

board = new five.Board({
    port: "COM7"
});

var a, b, c, d;
var cnt = 0;
var negiCnt = 0;


var client = new WebSocketClient();

var isFirstMessage = true;

client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
  console.log('WebSocket Client Connected');

  connection.on('error', function(error) {
      console.log("Connection Error: " + error.toString());
  });
  connection.on('close', function() {
      console.log('WebSocket Client Closed');
  });
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
        console.log("Received: '" + message.utf8Data + "'");
        if (!isFirstMessage) {
          const jsonObject = JSON.parse(message.utf8Data);
            console.log("Comment: " + jsonObject.chat.content);
            var negi = jsonObject.chat.content;
            if (negi === "Y" || negi === "Ｙ") {
                swingNegi();
            }
        } else {
          isFirstMessage = !isFirstMessage;
        }
      }
  });
      
  connection.sendUTF('{"thread":{"version":20061206,"thread":"NXlv<your live id>","service":"LIVE"}}');
});

client.connect('ws://nmsg.nicovideo.jp:2580/websocket', 'msg.nicovideo.jp#json');


board.on("ready", () => {
    a = new five.Led(8);
    b = new five.Led(9);
    c = new five.Led(10);
    d = new five.Led(11);

    a.off();
    b.off();
    c.off();
    d.off();

});


function swingNegi() {
    trueTurn();
}

function trueTurn() {
    var swingTime = 0;
    var id = setInterval(function () {
        if (swingTime > 999) {
            clearInterval(id);
            //setTimeout(falseTurn, 500);
        } else {
            swingTime++;
        }
        switch (cnt) {
            case 0:
                a.on();
                b.on();
                c.off();
                d.off();
                cnt++;
                break;
            case 1:
                a.off();
                b.on();
                c.on();
                d.off();
                cnt++;
                break;
            case 2:
                a.off();
                b.off();
                c.on();
                d.on();
                cnt++;
                break;
            case 3:
                a.on();
                b.off();
                c.off();
                d.on();
                cnt = 0;
                break;
            case 4:
                a.off();
                b.off();
                c.off();
                d.off();
                break;
        }
    }, 5);  
}

function falseTurn() {
    var swingTime = 0;
    var id = setInterval(function () {
        if (swingTime > 999) {
            clearInterval(id);
            console.log("false turn end.");
        } else {
            swingTime++;
        }
        switch (cnt) {
            case 0:
                a.off();
                b.off();
                c.on();
                d.on();
                cnt++;
                break;
            case 1:
                a.off();
                b.on();
                c.on();
                d.off();
                cnt++;
                break;
            case 2:
                a.on();
                b.on();
                c.off();
                d.off();
                cnt++;
                break;
            case 3:
                a.on();
                b.off();
                c.off();
                d.on();
                cnt = 0;
                break;
            case 4:
                a.off();
                b.off();
                c.off();
                d.off();
                break;
        }
    }, 10);
}

