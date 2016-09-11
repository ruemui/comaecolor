# 概要

## 環境準備

- Node.js の gulp と StyleDocco のグローバルインストールが必要です。
- `npm install` で必要な gulp プラグインをインストールしてください。
- タスク一覧は `gulp --tasks` などで確認してください。

## 生成物

- `src` に格納したものから gulp で次のものを生成します。
	- `code` … Web サイト
	- `styleguide` … スタイルガイド

## 対応ブラウザー

- お客様より提供のあった資料内容に合わせています。
- 詳細は `gulpfile.js` における `build:css` タスクの `autoprefixer` を参照してください。
