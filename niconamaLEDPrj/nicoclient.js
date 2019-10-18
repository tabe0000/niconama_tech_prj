#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
const fs = require('fs');

var led;
var blue;
var red;
var green;

var five = require('johnny-five');
var board = new five.Board({
    port: "COM7"
});
board.on('ready', function () {
  blue = new five.Led(13);
  red = new five.Led(12);
  green = new five.Led(11);
  blue.on();
  red.on();
  green.on();
});

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
          if (jsonObject.chat.content === "!G_on") {
            green.on();
          } else if (jsonObject.chat.content === "!G_off") {
            green.off();
          } else if (jsonObject.chat.content === "!B_on") {
            blue.on();
          } else if (jsonObject.chat.content === "!B_off") {
            blue.off();
          } else if (jsonObject.chat.content === "!R_on") {
            red.on();
          } else if (jsonObject.chat.content === "!R_off") {
            red.off();
          }
        } else {
          isFirstMessage = !isFirstMessage;
        }
      }
  });
      
  connection.sendUTF('{"thread":{"version":20061206,"thread":"<Live Chat ID>","service":"LIVE"}}');
});

client.connect('ws://nmsg.nicovideo.jp:2580/websocket', 'msg.nicovideo.jp#json');
