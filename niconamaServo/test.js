var five = require("johnny-five"),
  board, lcd, button;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

var direction = 0;
var angle = 0;




board = new five.Board({
    port: "COM7"
});

var a, b, c, d;
var cnt = 0;

board.on("ready", () => {
    a = new five.Led(8);
    b = new five.Led(9);
    c = new five.Led(10);
    d = new five.Led(11);

    a.off();
    b.off();
    c.off();
    d.off();

    if (process.argv[2] === "0") {
        trueTurn(process.argv[3], false);
    } else if(process.argv[2] === "1"){
        falseTurn(process.argv[3], false);
    } else if (process.argv[2] === "2") {
        trueTurn(process.argv[3], true);
    }

});


function trueTurn(ang, isSwing) {
    var swingTime = 0;
    var id = setInterval(function () {
        if (swingTime > ang) {
            clearInterval(id);
            console.log("true turn end.");
            if (isSwing === true) {
                falseTurn(ang);
            }
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
    }, 4.7);
}

function falseTurn(ang, isSwing) {
    console.log("called");
    var swingTime = 0;
    var id = setInterval(function () {
        if (swingTime > ang*1.25) {
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
    }, 4);
}