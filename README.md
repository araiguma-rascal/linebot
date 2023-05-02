# 概要
Google Cloud Platform上で動作するlinebotです。このbotに言葉を投げかけると相田みつをの遺した名言集を返してくれます。

# 目次
- Setup
    - linebotの設定
    - git cloneでローカルディレクトリにダウンロード
    - Google Cloud Platform上にサーバーを構築

# Setup
セットアップは以下の手順で行います。

## Linebotの設定
1. LINE Developersにアクセスして、ビジネスアカウントを取得します。この時個人のアカウントが必要になります。
2. Providerを作成します。
3. Create a Messaging API channelを押し、適当に情報を入力してchannelを作成します。作成に成功するとbotのホーム画面が表示されます。
4. Messaging APIタブに行き、チャネルアクセストークン（長期）を取得します。これを後で使います。
5. Webhookの利用をON、Webhookの再送とエラーの統計情報をOFFにします。

## git cloneでローカルディレクトリにダウンロード
1. アプリを編集したいディレクトリでgit cloneを実行します。
```
git clone <このディレクトリのgit URL>
```
2. `.sample.env`ファイルの名前を`.env`に変更し、環境変数を書き換えます。この環境変数はLINE Developersから取得できます。
```
CHANNEL_ACCESS_TOKEN=<YOUR CHANNEL_ACCESS_TOKEN>
CHANNEL_SECRET=<YOUR CHANNEL_SECRET>
```
3. こちらでローカルの設定は完了です。次はサーバーを構築します。

## Google Cloud Platform上にサーバーを構築
1. [Google Cloud Platformでプロジェクトを作成し、Google Cloud CLIをインストール](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project?hl=ja)してください。
2. cloneしたディレクトリに入ります。app.yamlと同じ階層に入ってください。
3. 以下のコマンドを実行すると、Google Cloudにサービスがデプロイされます。
```
gcloud app deploy
```
4. `Deployed service [default] to [https://hogehoge.appspot.com]`というメッセージが出ていると思うので、このURLをコピーし、LINE DevelopersのwebhookURLに入力し、末尾に`/callback`をつけ、`https://hogehoge.appspot.com/callback`とする。
5. 以上でデプロイ完了です。このbotにメッセージを送ると名言が返ってくるはずです。