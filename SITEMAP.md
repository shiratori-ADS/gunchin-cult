# グンチーン教団 公式サイト — サイトマップ / 構造

架空ギャグコンテンツ「グンチーン教団」の公式ホームページ。  
企画書: `Gunchin Cult.md` / 文言・画像の編集: `content/siteContent.json`

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js（App Router） |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4 |
| アニメーション | Framer Motion / GSAP |
| 3D背景 | Three.js + `@react-three/fiber` |
| フォント | Noto Serif JP |

---

## ディレクトリ構造

```text
gunchin-cult/
├── app/                      # ページ（App Router）
│   ├── layout.tsx            # 共通レイアウト・メタデータ
│   ├── globals.css           # グローバルCSS / Tailwind
│   ├── page.tsx              # TOP（/）
│   ├── doctrine/page.tsx     # 教義（/doctrine）
│   ├── scripture/page.tsx    # 経典（/scripture）
│   ├── about/page.tsx        # 教団について（/about）
│   ├── sayings/page.tsx      # お言葉（/sayings）
│   ├── join/page.tsx         # 入信（/join）
│   ├── shop/page.tsx         # グンチーンショップ（/shop）
│   └── news/page.tsx         # お知らせ（/news）
├── components/
│   └── SiteChrome.tsx        # 共通UI（ナビ・フッター・背景・PageShell）
├── content/
│   ├── siteContent.json      # 全ページの文言・画像・ナビ定義
│   └── README.md             # JSON編集ガイド
├── public/
│   └── images/               # 画像アセット
├── .gitignore                # Git除外設定
├── Gunchin Cult.md           # 企画・コンセプト原稿
└── SITEMAP.md                # 本ファイル
```

---

## 公開情報

| 項目 | URL |
|---|---|
| 本番（Vercel） | https://gunchin-cult.vercel.app/ |
| GitHub リポジトリ | https://github.com/shiratori-ADS/gunchin-cult |
| ホスティング | [Vercel](https://vercel.com)（GitHub 連携・自動デプロイ） |

`main` ブランチへ push すると、Vercel が自動でビルド・公開します。

---

## サイトマップ（URL一覧）

| URL | ページ名 | ファイル | ヘッダー | TOPボタン |
|---|---|---|---|---|
| `/` | TOP | `app/page.tsx` | — | — |
| `/doctrine` | 教義 | `app/doctrine/page.tsx` | ○ | ○ |
| `/scripture` | 経典 | `app/scripture/page.tsx` | ○ | ○ |
| `/about` | 教団について | `app/about/page.tsx` | ○ | ○ |
| `/sayings` | お言葉 | `app/sayings/page.tsx` | ○ | ○ |
| `/join` | 入信 | `app/join/page.tsx` | ○ | ○ |
| `/shop` | グンチーンショップ | `app/shop/page.tsx` | ○ | ○ |
| `/news` | お知らせ | `app/news/page.tsx` | ○ | ○ |

### ナビゲーション順

ヘッダーメニュー・TOPボタンは `siteContent.json` の `nav.menuItems` / `hero.buttons` から読み込む。

1. 教義 → `/doctrine`
2. 経典 → `/scripture`
3. 教団について → `/about`
4. お言葉 → `/sayings`
5. 入信 → `/join`
6. グンチーンショップ → `/shop`
7. お知らせ → `/news`

### サイトマップ（ツリー）

```text
/
├── /doctrine          教義（降臨イラスト）
├── /scripture         経典（全6章）
├── /about             教団について
│   ├── グンチーン教団とは
│   ├── 教団年表
│   ├── グンチーン教団歌（タップで歌詞モーダル）
│   ├── グンチーン教団舞踏（タップでイラスト一覧・拡大）
│   └── グン様を祈る正しい作法（タップでイラスト一覧・拡大）
├── /sayings           お言葉（イラスト拡大・▼で補足文展開）
├── /join              入信（成功メッセージ＋信者証）
├── /shop              グンチーンショップ（イラスト拡大・カタログ）
└── /news              お知らせ（イラスト拡大）
```

---

## ページ別 構成・機能

### `/` — TOP

| セクション | 内容 | JSONキー |
|---|---|---|
| 入口演出 | 初回訪問時: エンブレム → クリック → 「チーン／チーン」→ TOP表示 | `brand` |
| ファーストビュー | キャッチコピー・サブコピー・遷移ボタン | `hero` |
| フッター | 共通フッター | `footer` |

**特記事項**

- 初回のみ入口演出。`sessionStorage`（`gunchin-intro-seen`）または `/#top` でスキップ
- TOPは `SiteNav` + ヒーロー + `SiteFooter` のみ（他セクションは各ページへ分離）
- ヘッダーのサイト名テキスト: `/#top`（入口スキップ）
- ヘッダーのエンブレム画像: `/`（入口演出を再再生。`gunchin-intro-seen` を削除）
- TOPボタンは PC / スマホとも縦並び・固定幅（`w-72`）

---

### `/doctrine` — 教義

| セクション | 内容 | JSONキー |
|---|---|---|
| ページタイトル | DOCTRINE / 教義 | `mainDoctrine` |
| メイン教義 | エンブレム → 降臨イラスト → 教義文 | `mainDoctrine` / `mainDoctrine.adventImage` |
| 三大教義 | 3カラムカード（教義文 + 補足文） | `doctrines[]` |

**特記事項**

- `adventImage` がある場合、グン様イラストが上から降臨する演出を表示
- 降臨イラストは正方形枠（`aspect-square`）に `object-cover` で枠いっぱいに表示
- 三大教義は `text`（見出し）と `body`（補足文）を表示

**レイアウト:** `PageShell`（共通ナビ・背景・フッター）

---

### `/scripture` — 経典

| セクション | 内容 | JSONキー |
|---|---|---|
| ページタイトル | SCRIPTURE / グンチーン経典 | `scripture` |
| 章一覧 | 第一章〜第六章（タイトル・本文） | `scripture.chapters[]` |

**特記事項**

- 本文は小さめ（`text-xs` / PCは `text-sm`）で表示
- 第六章は `chant`（「グングン、チーン。」）と `bodyAfter` を追加表示可能

---

### `/about` — 教団について

| セクション | 内容 | JSONキー |
|---|---|---|
| ページタイトル | ABOUT US / 教団について | `timeline.eyebrow` |
| グンチーン教団とは | 紹介文・画像 | `about` |
| 教団年表 | 横スクロールカード（PHASE・日付・タイトル・本文） | `timeline.items[]` |
| グンチーン教団歌 | カード（タップで歌詞モーダル） | `ritualCards[]`（`eyebrow: 教団歌`） |
| グンチーン教団舞踏 | カード（タップでイラスト横スクロール一覧・拡大） | `ritualCards[]`（`eyebrow: 演舞`） |
| グン様を祈る正しい作法 | カード（タップでイラスト横スクロール一覧・拡大） | `ritualCards[]`（`eyebrow: 作法`） |

**特記事項**

- 教団歌カードに `lyrics` フィールドがある場合、クリックで歌詞モーダル（1番・2番・3番対応）を表示
- 演舞・作法カードに `gallery` 配列がある場合、クリックでイラスト一覧を表示（作法はラベル: 心得 / 作法1…）
- 年表の `phase` は JSON で個別編集可能（例: `PHASE 1` / `2026/06/22`）

---

### `/sayings` — お言葉

| セクション | 内容 | JSONキー |
|---|---|---|
| ページタイトル | WORDS / グン様のありがたいお言葉 | `sayings` |
| お言葉一覧 | 3カラムカード（お言葉・補足文など） | `sayings.items[]` |

**各タイルのフィールド**

| フィールド | 表示 | 備考 |
|---|---|---|
| `text` | お言葉（見出し） | 必須 |
| `body` | 補足文 | 小さめ文字。▼で展開 |
| `italic` | 斜体文 | 補足文の下 |
| `churchNote` | 教団註 | 斜体文の下。ある場合のみ下線を表示 |
| `image` / `imageAlt` | イラスト | タップで拡大 |

**特記事項**

- イラストをタップすると拡大表示（ライトボックス）
- `text` の下・右寄せに **▼** ボタン（`body` / `italic` / `churchNote` のいずれかがある場合のみ表示）
- ▼を押すと補足文 → 斜体文 →（教団註がある場合）下線 → 教団註 の順で表示
- `churchNote` が空の場合、下線は表示しない

---

### `/join` — 入信

| セクション | 内容 | JSONキー |
|---|---|---|
| 入信案内 | タイトル・本文・画像 | `join` |
| 入信ボタン | クリックで成功メッセージ表示 | `join.buttonLabel` / `join.successMessage` |
| 信者証 | 成功メッセージの下に表示 | `join.certificate` |

**特記事項**

- 入信成功後、ランダムな信者番号付きの信者証カードを表示
- `certificate.image` を設定すると、カードUIの代わりに画像を表示

---

### `/shop` — グンチーンショップ

| セクション | 内容 | JSONキー |
|---|---|---|
| ページタイトル | GUNCHIN SHOP / グンチーンショップ | `goods` |
| グングッズ一覧 | 商品名・価格・説明・画像 | `goods.items[]` |

**特記事項**

- 価格は商品名の直下に表示
- サムネイルは上基準（`object-top`）。タップで拡大表示
- `detail` の下に「カタログを見る」ボタン（同じ画像をライトボックス表示）

---

### `/news` — お知らせ

| セクション | 内容 | JSONキー |
|---|---|---|
| ページタイトル | NEWS / お知らせ | `news` |
| お知らせ一覧 | 日付・タイトル・本文・画像 | `news.items[]` |

**特記事項**

- 表示順は日付（`YYYY/MM/DD`）の新しい順（JSON内の並び順は不問）
- イラストは全体表示（`object-contain`）。タップで拡大表示

---

## 共通コンポーネント（`components/SiteChrome.tsx`）

| コンポーネント | 役割 | 使用箇所 |
|---|---|---|
| `SiteNav` | 固定ヘッダー・PC横メニュー・SPハンバーガー | TOP + 全サブページ |
| `SiteFooter` | フッター | TOP + 全サブページ |
| `PageShell` | 背景 + ナビ + コンテンツ + フッター | サブページ共通 |
| `Background` | Three.js粒子 + グラデーション背景 | `PageShell` 内 |
| `SectionTitle` | ページ上部の eyebrow + タイトル | 各サブページ |
| `ContentImage` | 画像表示（未設定時は fallback） | 各ページ |
| `renderMultiline` | `\n` 改行対応テキスト表示 | 全ページ |

**ヘッダーのリンク分離**

| 要素 | 遷移先 | 動作 |
|---|---|---|
| エンブレム画像 | `/` | 入口演出を再再生 |
| サイト名テキスト | `/#top` | TOPヒーローへ（入口スキップ） |

**スマホメニュー**

- ハンバーガーメニューは `max-h-[calc(100dvh-7rem)]` + `overflow-y-auto` でスクロール可能
- メニュー項目が多い場合も、パネル内で縦スクロールして閲覧できる

---

## コンテンツ定義（`content/siteContent.json`）

| キー | 用途 |
|---|---|
| `brand` | ロゴ・エンブレム・サイト名 |
| `nav.menuItems` | ヘッダーメニュー |
| `hero` | TOPファーストビュー・遷移ボタン |
| `mainDoctrine` | 教義ページ・メイン教義・降臨イラスト（`adventImage`） |
| `doctrines` | 教義ページ・三大教義（`text` / `body`） |
| `scripture` | 経典ページ（`chapters[]` / `chant` / `bodyAfter`） |
| `about` | 教団について・紹介 |
| `timeline` | 教団について・年表 |
| `ritualCards` | 教団について・教団歌（`lyrics`）/ 演舞・作法（`gallery`） |
| `sayings` | お言葉ページ（`text` / `body` / `italic` / `churchNote`） |
| `goods` | ショップページ |
| `news` | お知らせページ |
| `join` | 入信ページ・成功メッセージ・信者証（`certificate`） |
| `footer` | フッター（全ページ共通） |

詳細な編集方法は `content/README.md` を参照。

---

## 静的アセット

| パス | 用途 |
|---|---|
| `public/images/` | サイト画像（JSONでは `/images/ファイル名` で指定） |
| `public/images/gunchin_emblem.png` | 教団エンブレム（デフォルト） |
| `public/images/gunsama_advent.png` | 教義ページ・降臨イラスト |

---

## 更新の流れ（コミット → push → 公開）

サイトの文言・画像を変更したあと、本番（Vercel）へ反映する手順です。

### 1. ローカルで確認

```powershell
cd C:\Projects\gunchin-cult
npm run dev
```

ブラウザで表示を確認してからコミットします。

### 2. 変更をコミット

```powershell
cd C:\Projects\gunchin-cult

# 変更確認
git status

# ステージング
git add .

# コミット（メッセージは内容に合わせて変更）
git commit -m "お知らせを追加"
```

### 3. GitHub へ push

```powershell
git push origin main
```

push が完了すると、Vercel が自動でビルド・デプロイします（通常 1〜2 分）。

### 4. 本番を確認

https://gunchin-cult.vercel.app/ を開き、変更が反映されているか確認します。

### 補足

- リモート: `origin` → `https://github.com/shiratori-ADS/gunchin-cult.git`
- ブランチ: `main`
- Vercel の環境変数は不要（`siteContent.json` のみで運用）
- 初回のみ Git のユーザー設定が必要:

```powershell
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメール"
```

---

## 更新履歴メモ

本ファイルはサイト構造のスナップショットです。ページ追加・ナビ変更・JSONキー追加・公開手順の変更があった場合は、あわせて更新してください。
