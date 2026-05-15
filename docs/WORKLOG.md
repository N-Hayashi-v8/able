# WORKLOG

> これまでの作業内容を日付ごとに記録するファイル。**新しい日付を一番上に追記する**。過去のエントリは編集しない。

---

## 2026-05-15

### やったこと
- プロジェクト初期化
- FLOCSS準拠のフォルダ構成を作成（`scss/foundation` / `scss/layout` / `scss/object`）
- `index.html` の雛形作成（destyle.css と style.css を読み込み）
- Live Sass Compiler で SCSS → CSS のコンパイル動作確認
- Figma から模写対象の画像を整理し `img/` に配置
- `docs/TODO.md` と `docs/WORKLOG.md` を新規作成

### 決定事項
- CSS方針: **SCSS + FLOCSS**（BEM命名）
- 画像フォルダ名: **`img/`**
- コンパイラ: **Live Sass Compiler**（VSCode拡張）
- 模写対象: Figmaのデザインデータ

### 触ったファイル
- `index.html`（新規）
- `scss/style.scss`（新規）
- `scss/foundation/_variables.scss`, `_mixin.scss`, `_base.scss`（新規）
- `scss/layout/_header.scss`, `_main.scss`, `_footer.scss`（新規）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`, `docs/WORKLOG.md`（新規）

### 未解決
- レスポンシブの基準（PC/SPどちらから書くか）

---

## 記法ルール（Claude が保守するときの約束）

- 新しい日付のエントリは **このファイルの一番上**（この「記法ルール」より上、最新エントリのさらに上）に追記する。
- 各日付は H2 見出しで `## YYYY-MM-DD`。
- 中身は固定で次の4節を H3 で書く: **やったこと / 決定事項 / 触ったファイル / 未解決**。
- 該当なしの節は「なし」と書いて節自体は省略しない。
- 過去のエントリは **編集・削除しない**（誤記の修正のみ可。修正時は末尾に `（YYYY-MM-DD 訂正）` を付ける）。
- TODO.md で完了したタスクは、その日のエントリの「やったこと」に書き写してから TODO.md から削除する。
- 箇条書きは `-` を使う（`*` や `・` は使わない）。
