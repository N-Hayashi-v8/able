# WORKLOG

> これまでの作業内容を日付ごとに記録するファイル。**新しい日付を一番上に追記する**。過去のエントリは編集しない。

---

## 2026-05-18

### やったこと

- 既存HTMLとFigmaスクリーンショットの照合、構造・セマンティクスの過不足チェック
- HTML修正
  - プレスリリースに「プレスリリースを見る」ボタンを追加
  - FVに `scroll 1.png` を追加、キャッチコピーを `<h2>` から `<h1>` に変更
  - ヘッダー/フッターのロゴ `alt` を `エイブル` に変更
  - プレスリリースのカードを `<div>` から `<ul><li>` に変更
  - 各セクションの英語小見出し（PHILOSOPHY / GROUP / SUSTAINABILITY / RELEASE）を `<h2>` 内の `<span>` に変更
  - ボタン構造を `<a>` 外側パターンで全セクション統一
  - `time` の `datetime` 属性を正規形式（YYYY-MM-DD）に修正
- FLOCSS/BEM 命名を全セクションに適用
  - Layout: `l-header`, `l-footer`
  - Project: `p-mv`, `p-news`, `p-philosophy`, `p-group`, `p-sustainability`
  - Component: `c-button`
- Google Fonts（Barlow / Noto Sans JP）を `<head>` に読み込み追加
- `_variables.scss` に共通変数（色 10種・フォント 2種）を定義
- `_base.scss` 実装（62.5%トリックで 1rem = 10px、body デフォルトに Noto Sans JP）
- `_header.scss` 実装（`position: fixed` の固定ヘッダー、nav スタイル）
- `_main.scss` で `main` に `padding-top: 8rem` を当て、固定ヘッダー分のオフセット確保
- `_mv.scss` 実装（FV：画像 75% + テキスト・scroll を絶対配置）
- `_news.scss` 実装（プレスリリース：カード型、各記事行、PDFタグ）
- `_button.scss` 実装（c-button：緑背景＋疑似要素2つで `⇀` 形矢印）
- `CLAUDE.md` の `CSS/SCSS Policy` に3つのルールを追記

### 決定事項

- フォントサイズは `rem` で書く（`html { font-size: 62.5%; }` で 1rem = 10px）
- Figma の奇数・小数の px 値は近似のキリのいい偶数に丸める（例: 57→56、105.925→106、15→14）。丸めた値は採用前に表で提示する
- 要素の `height` は固定せず、padding と中身で自然に決まる形を優先する（必要なら `min-height` で下限）
- `$font-en` には Noto Sans JP のフォールバックを含めて、混在文字の切替をブラウザ任せにする
- ヘッダーは `position: fixed` で常時上部固定し、`main` 側に `padding-top: 8rem` を当てる
- プレスリリースのボタンはカード右下から `bottom: -4rem` で外側に張り出す
- 共通ボタン `c-button` の矢印は `⇀` 形（`::before` 横線 + `::after` 上 barb の 1px 線、右端を支点に 45° 回転）

### 触ったファイル

- `index.html`（構造修正・class付与・Google Fonts追加）
- `CLAUDE.md`（CSS/SCSS Policy に rem 運用 / 値の丸めルール / height 固定回避 を追記）
- `docs/TODO.md`（記法ルール準拠で更新）
- `docs/WORKLOG.md`（このエントリ追記）
- `scss/foundation/_variables.scss`（色・フォント変数を新規記述）
- `scss/foundation/_base.scss`（62.5%トリック・body デフォルトスタイル）
- `scss/layout/_header.scss`（新規記述）
- `scss/layout/_main.scss`（新規記述）
- `scss/object/component/_button.scss`（新規作成）
- `scss/object/project/_mv.scss`（新規作成）
- `scss/object/project/_news.scss`（新規作成）
- `scss/style.scss`（`@use` 追加：component/button, project/mv, project/news）

### 未解決

- FVのキャッチ/本文の `top` / `left` 位置が暫定値（Figma 実測値の取得待ち）
- プレスリリースのカード内 padding 値が暫定（Figma 実測値の取得待ち）
- 企業理念・グループ企業・サステナビリティ・フッターの SCSS 未実装
- レスポンシブ基準（PC/SP）と共通ブレークポイント値（前日からの持ち越し）

---

## 2026-05-15

### やったこと
- プロジェクト初期化
- FLOCSS準拠のフォルダ構成を作成（`scss/foundation` / `scss/layout` / `scss/object`）
- `index.html` の雛形作成（destyle.css と style.css を読み込み）
- Live Sass Compiler で SCSS → CSS のコンパイル動作確認
- Figma から模写対象の画像を整理し `img/` に配置
- `docs/TODO.md` と `docs/WORKLOG.md` を新規作成
- `CLAUDE.md` に `Project Docs` セクションを追記（TODO/WORKLOG を作業開始時に読む運用ルール）
- `.gitignore` を作成（OS/Editor/Sass map/Claude Code local設定を除外）
- `git init`（初期ブランチ `main`）→ 初回コミット
- GitHub に Privateリポジトリ `able` を作成し、`origin main` へ push 完了

### 決定事項
- CSS方針: **SCSS + FLOCSS**（BEM命名）
- 画像フォルダ名: **`img/`**
- コンパイラ: **Live Sass Compiler**（VSCode拡張）
- 模写対象: Figmaのデザインデータ
- GitHubリポジトリ: **`able`**（Private）
- `.claude/settings.local.json` は git管理しない（マシン固有設定のため）

### 触ったファイル
- `index.html`（新規）
- `scss/style.scss`（新規）
- `scss/foundation/_variables.scss`, `_mixin.scss`, `_base.scss`（新規）
- `scss/layout/_header.scss`, `_main.scss`, `_footer.scss`（新規）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`, `docs/WORKLOG.md`（新規）
- `CLAUDE.md`（`Project Docs` セクション追記）
- `.gitignore`（新規）

### 未解決
- レスポンシブの基準（PC/SPどちらから書くか）
- 共通ブレークポイント値の確定（`_variables.scss` に未定義）

---

## 記法ルール（Claude が保守するときの約束）

- 新しい日付のエントリは **このファイルの一番上**（この「記法ルール」より上、最新エントリのさらに上）に追記する。
- 各日付は H2 見出しで `## YYYY-MM-DD`。
- 中身は固定で次の4節を H3 で書く: **やったこと / 決定事項 / 触ったファイル / 未解決**。
- 該当なしの節は「なし」と書いて節自体は省略しない。
- 過去のエントリは **編集・削除しない**（誤記の修正のみ可。修正時は末尾に `（YYYY-MM-DD 訂正）` を付ける）。
- TODO.md で完了したタスクは、その日のエントリの「やったこと」に書き写してから TODO.md から削除する。
- 箇条書きは `-` を使う（`*` や `・` は使わない）。
