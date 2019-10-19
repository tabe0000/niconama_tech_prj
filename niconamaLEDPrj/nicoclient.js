#!/usr/bin/env node

// This software includes the work that is distributed in the Apache License 2.0.
// このソフトウェアは、 Apache 2.0ライセンスで配布されている製作物が含まれています。

//Copyright (c) 2012, 2013, 2014 Rick Waldron waldron.rick@gmail.com Licensed under the MIT license. 
//Copyright(c) 2014, 2015 The Johnny - Five Contributors Licensed under the MIT license.


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
      
  connection.sendUTF('{"thread":{"version":20061206,"thread":"NX<live id>","service":"LIVE"}}');
});

client.connect('ws://nmsg.nicovideo.jp:2580/websocket', 'msg.nicovideo.jp#json');
