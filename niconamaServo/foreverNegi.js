var five = require("johnny-five"),
    board, lcd, button;
  

board = new five.Board({
    port: "COM7"
});

var a, b, c, d;
var cnt = 0;
var negiCnt = 0;



board.on("ready", () => {
    a = new five.Led(8);
    b = new five.Led(9);
    c = new five.Led(10);
    d = new five.Led(11);

    a.off();
    b.off();
    c.off();
    d.off();

    swingNegi();
});


function swingNegi() {
    trueTurn();
}

function trueTurn() {
    var swingTime = 0;
    var id = setInterval(function () {
        if (swingTime > 73) {
            clearInterval(id);
            setTimeout(falseTurn, 500);
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
    }, 4);  
}

function falseTurn() {
    var swingTime = 0;
    var id = setInterval(function () {
        if (swingTime > 72) {
            clearInterval(id);
            console.log("false turn end.");
            setTimeout(trueTurn, 500);
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

