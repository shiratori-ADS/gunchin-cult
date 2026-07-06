# サイト内容の編集方法

ホームページの文章・商品情報・年表・表示用の絵文字風テキストは `siteContent.json` で編集できます。

- `brand`: ヘッダーのロゴ・エンブレム・サイト名
- `nav`: ヘッダーメニュー（全ページ共通）
- `hero`: ファーストビューのキャッチコピー、サブコピー、ボタン
- `about`: 教団紹介
- `mainDoctrine` / `doctrines`: メイン教義と三大教義
- `timeline`: 教団年表
- `ritualCards`: 作法、教団歌、演舞
- `sayings`: グン様のありがたいお言葉
- `goods`: グングッズ紹介
- `join`: 入信案内とボタン押下後メッセージ
- `footer`: フッター文言（全ページ共通）

ヘッダーメニューの例:

```json
"nav": {
  "menuItems": [
    { "label": "教義を見る", "href": "/doctrine" },
    { "label": "教団について", "href": "/about" }
  ]
}
```

JSON なので、文字列は必ず `"` で囲み、項目の区切りには `,` を入れてください。
改行を入れたい場合は `\n` を使えます。

例:

```json
"body": "1行目の文章です。\n2行目の文章です。\n3行目の文章です。"
```

上のように入力すると、サイトでは3行に分かれて表示されます。

## 画像の指定方法

画像ファイルは `public/images` に入れてください。

例:

```text
public/images/gunsama.png
public/images/gunglass.png
```

`siteContent.json` では、先頭に `/images/` を付けて指定します。

```json
"image": "/images/gunsama.png",
"imageAlt": "光に包まれたグン様"
```

画像を表示しない場合は、`image` を空文字のままにしてください。

```json
"image": "",
"imageAlt": "画像の説明"
```

主な画像指定欄:

- `brand.emblemImage`: ナビやエンブレムの画像
- `brand.deityImage` / `hero.image`: ファーストビュー中央のグン様画像
- `about.image`: 教団紹介の画像
- `mainDoctrine.image`: メイン教義の画像
- `doctrines[].image`: 三大教義カードの画像
- `timeline.items[].image`: 年表カードの画像
- `ritualCards[].image`: 作法・教団歌・演舞カードの画像
- `sayings.items[].image`: ありがたいお言葉カードの画像
- `goods.items[].image`: グッズ画像
- `join.image`: 入信案内の画像
