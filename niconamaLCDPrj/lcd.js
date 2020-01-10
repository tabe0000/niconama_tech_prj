var five = require("johnny-five"),
  board, lcd, button;

var btnCnt = 0;

board = new five.Board({
  port: "COM8"
});

board.on("ready", function() {

  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 20, 
  });

  button = new five.Button(2);
  board.repl.inject({
    button: button
  });

  this.repl.inject({
    lcd: lcd
  });

  button.on("down", function () {
    var cnt = btnCnt.toString();
    console.log("down");
    btnCnt += 1;
    console.log(btnCnt);
    lcd.clear().print("counter: " + cnt);
    lcd.cursor(1, 0);

    lcd.print("nico :) XD");
  });

  button.on("hold", function () {
    btnCnt = 0;
  })

});