# niconamaLEDPrj

## OverView
ニコニコ生放送で打たれた、特定のコメントによってArduinoのLEDを制御できる。  
コメントLチカ的なの。

## Description
Node jsでサーバーを立てて、そこにArduinoに対する処理を書いてある。  
今回はLチカをしたが、今後ははちゅねミクにコメントでネギを振らせたい。

## How to use
1. Postmanなどを利用して、
```
https://api.cas.nicovideo.jp/v1/services/live/programs/<nico live ID>/threads
```
を使ってchat スレッドIDを取得する。nico live IDは 'lv' から始まるもの。  

2. 取得できたら、nicoclient.jsの下部にある　'Live Chat ID'のところに頭のNXを含めて置き換える。

3. node nicoclient.js　を打って、配信内容を取得する.
