const line = require('@line/bot-sdk');
const express = require('express');
const fs = require('fs');

require('dotenv').config();

const json = fs.readFileSync("quotes.json", "utf-8");
const data = JSON.parse(json);
const datalen = data["quotes"].length;

// アクセストークン、アクセスシークレットを入れる
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// LINE Bot SDK クライアントの作成
const client = new line.Client(config);

// Express APP の作成
const app = express();

app.get('/', (req, res) => {
  res.send('Hello line bot sample!');
});

// ミドルウェアにウェブフックハンドラを登録
// line.middleware は LINE の Webhook からのアクセスを検証する
// X-Line-Signature ヘッダーのないリクエストは処理されない
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// イベントハンドラー
const handleEvent = (event) => {
  //みつをの名言をランダムに返信
  const random = Math.floor(Math.random() * datalen);
  const reply = { type: 'text', text: data["quotes"][random] };

  // リプライ API を用いて返信
  return client.replyMessage(event.replyToken, reply);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});