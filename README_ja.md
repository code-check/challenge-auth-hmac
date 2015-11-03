# データベース API

このチャレンジのゴールはSQLデータベースに接続している。[RESTful][REST]APIを作成することです。

このデータベースは"challeges"と呼ばれるテーブルだけが入っており、以下の列の中のもので構成されています。
 - Id (int, auto increment)
 - Name (string)
 - Description (string)
 - Date (timestamp)

APIはチャレンジを解くために4つのオプションを持ちます。

 - GET, which gets a challenge based on its id
 - DELETE, deletes a challenge based on its id
 - POST, creates a new challenge and returns its id
 - PUT, updates a challenge based on its id


管理者権限へのアクセスを保護するために全てのエンドポイントは"challenge-database-api"となるHMAC権限によって保護されます。
## 仕様
 -全てのAPIのエンドポイントは次の通り:"/api/challenges/[Id]", where [Id] is optional
 - データベースはSQLiteを使用し、ファイルは[database.db](./sql/database.db)です。
 - bodyやリクエスト、レスポンスのいかなるデータもJSONです。
 - HMAC権限のために使われるハッシュはSHA256です。
 - 間違ったHMACダイジェストの場合、権限のない401が返されます。
 - HMACメッセージはセミコロン(;)によって区別されたHTTP動詞とエンドポイントが結合されます。"/api/challenges/;GET"

その他の仕様は[spec](./spec)フォルダの下のJSフォーマット内にあります。

## 追加チャレンジ
[Answer.md](./Answer.md)の中で、あなたなら現在の管理者権限のセキュリティーをより安全にするにはどうするか説明してください（keyは安全な方法で共有されていると仮定し、パスのlengthは無視する）。
もし他の案があれば（HMACではない）それも問題の上に回答してください。

## インフォメーション
 - [HMAC (rfc2104)][HMAC]
 - [REST]

[REST]:https://en.wikipedia.org/wiki/Representational_state_transfer
[HMAC]:https://tools.ietf.org/html/rfc2104
