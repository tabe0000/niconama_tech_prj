# niconamaLEDPrj

## OverView
ニコニコ生放送で打たれた、特定のコメントによってArduinoのLEDを制御できる。  
コメントLチカ的なの。

## Description
Node jsでサーバーを立てて、そこにArduinoに対する処理を書いてある。  
今回はLチカをしたが、今後ははちゅねミクにコメントでネギを振らせたい。

## How to use
### Arduinoセットアップ
1. ArduinoIDEを開き、COMポートをセットする。このとき、何番のCOMポートにセットしたか覚えておくこと。
2. ArduinoIDE上部にある「ファイル」→「スケッチ例」→「Firmata」→「StandardFirmata」を開いてコンパイル、Arduinoにコピー。
3. nicoclient.js上部にある
``` js
var board = new five.Board({
    port: "COM7" //Arduinoが接続されているCOMポートを指定
});
```
に、先程指定したCOMポートを指定

4. 3で設定したところの下部にLEDの接続ポートがあるのでそれを指定
```js
board.on('ready', function () {
  blue = new five.Led(13);
  red = new five.Led(12);
  green = new five.Led(11);
  blue.on();
  red.on();
  green.on();
});
```
5. 最初はすべて点灯する。

6. 初期状態では「!R_off」と言ったように「! + (色の頭文字の大文字) + _ + (on/off)」といった形でLEDのON・OFFが可能になる。

### ニコ生コメント取得セットアップ
1. ニコ生ID(ニコ生開くと、URLに「lv」から始まる、数字があるのでそれをコピー
2. nicoclient.jsの下部にある　'Live ID'のところに頭のNXを消さずに、lvを含めて置き換える。(例：NXlv322497985)
3. node nicoclient.js　を打って、配信内容を取得する.
4. 初期状態では「!R_off」と言ったように「! + (色の頭文字の大文字) + _ + (on/off)」といった形でLEDのON・OFFが可能になる。
