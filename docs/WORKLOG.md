# WORKLOG

> これまでの作業内容を日付ごとに記録するファイル。**新しい日付を一番上に追記する**。過去のエントリは編集しない。

---

## 2026-05-26

### やったこと

- `pages/group.html` 新規作成（`philosophy.html` をベースに head / header / footer を流用、`<title>` と各種ナビリンクを差し替え）
- サイト内「グループ企業」リンク（href="#"のまま）を4箇所すべて設定
  - `index.html` ヘッダーナビ / フッターナビ → `pages/group.html`
  - `pages/philosophy.html` ヘッダーナビ / フッターナビ → `group.html`
- `group.html` の `<main>` 本体を実装（4セクション）
  - `p-page-title`（既存流用、英字 GROUP / 日本字「グループ企業」、breadcrumb 末尾も差替）
  - `p-group-lead`（リード見出し+本文、中央寄せ。装飾線は見出し下に `::after`、色は `$color-key` 統一）
  - `p-group-visual`（全幅画像セクション、`__inner` を持たず画面端まで `<img>` 直貼り）
  - `p-group-list`（左24rem ナビ + 右104rem カード列の2カラム、10社分のカード）
- セクションタイトル装飾線の共通化（前日までTODOで予告していた「3箇所目で共通化」を実行）
  - 新規 `c-section-heading` 作成（短い装飾線 1em × 4px + Noto Sans JP Bold 1行）
  - `p-top-message__title` と `p-philosophy-cards__title` から重複コードを削除
  - `pages/philosophy.html` 該当 `<h2>` 2箇所に `c-section-heading` クラスを併用、`p-group-list__title` にも併用
- 現在地ハイライトのJS実装（`js/script.js` に追記）
  - IntersectionObserver で全カードを観測、`rootMargin: -40% 0px -40% 0px`（画面中央20%帯）で発火
  - ナビクリック時は `is-current` をジャンプ適用 + `isAutoScrolling` フラグで Observer 発火を抑制、`scrollend` で通常モード復帰
- 左ナビを `position: sticky; top: 8rem;` でセクション内のみ画面追従させる
- スムーズスクロール対応: `html { scroll-behavior: smooth; }`（`_base.scss`）、各カードに `scroll-margin-top: 8rem` で固定ヘッダー隠れ対策
- 現在地マーカー（緑線）に `transform: scaleX(0→1)` + `transform-origin: left center` で「左→右に展開してフェードイン」アニメーション（`::before` は常時生成し transform で制御）
- id 重複（全カードが id="able"）を一意なスラッグ（able-parking, able-corporate-service, ...）に修正
- `<img>` の `alt` 属性を全カード一律「エイブル」だったのを各社名に修正
- カードの `<sup>&reg;</sup>` を全社一括削除（誤って付けていたため）

### 決定事項

- 装飾線つきタイトルは `c-section-heading`（component層）として共通化する。既存の `c-section-title`（border-top 4px + 英字+日本字の2段）とは別ブロックとして並行運用
- `__title` クラス自体はHTMLに残し（BEM的に「このブロックのタイトル要素」を示す名前として温存／将来の位置調整等の拡張ポイント）、SCSS側は空になるためブロックごと削除する
- `p-group-list` は inner 128rem を「左ナビ24rem + 右カード列104rem」の2カラムに分割
- ナビの現在地マーカー（緑線）は inner の外側まで伸びる短い線とし、`::before` を常に存在させて `transform: scaleX` でアニメーション制御する（is-current 時の生成/破棄では transition が効かないため）
- カードは白背景（`$color-text-white`）、padding 12rem 8rem、カード間 gap 8rem
- カード上端の短い黒装飾線は `::before` の `position: absolute; top: 0; left: 0;` で padding の外側（カード境界上端）に固定
- カード内の `<dl>` は `<div class="__detail-row">` で `<dt>` `<dd>` をラップして flex 横並びにする（HTML仕様上、`dl > div > dt+dd` は許容）
- 現在地検出は IntersectionObserver の `rootMargin: -40% 0px -40% 0px`（画面中央20%帯）方式
- ナビクリック中の途中通過カードでの誤発火は、`isAutoScrolling` フラグで Observer を一時停止 + `scrollend` イベントで復帰する方式で抑制
- 全ページ共通の `html { scroll-behavior: smooth; }` を採用。アンカー着地点は要素側の `scroll-margin-top` で個別調整する流儀にする
- ロゴ画像の `src` は手動差し替え運用とし、HTML上は空のまま出力
- ロゴ無しの社（エイブル引越サービス / パーソナルエステートラボ）は `<img>` 要素自体を省略

### 触ったファイル

- `pages/group.html`（新規作成、`<main>` 全実装）
- `index.html`（グループ企業リンク2箇所を設定）
- `pages/philosophy.html`（グループ企業リンク2箇所を設定、`c-section-heading` クラス追加2箇所）
- `scss/foundation/_base.scss`（`html` に `scroll-behavior: smooth`）
- `scss/object/component/_section-heading.scss`（新規）
- `scss/object/project/_top-message.scss`（`&__title` ブロック削除、c-section-headingへ移譲）
- `scss/object/project/_philosophy-cards.scss`（同上）
- `scss/object/project/_group-lead.scss`（新規）
- `scss/object/project/_group-visual.scss`（新規）
- `scss/object/project/_group-list.scss`（新規）
- `scss/style.scss`（`@use` 4件追加: section-heading / group-lead / group-visual / group-list）
- `js/script.js`（IntersectionObserver + scrollend + ナビクリックハンドラを追記）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- `_group-list.scss` / `_group-lead.scss` 内の `// 暫定` 値を Figma 実測で確定する作業が残る
- ロゴ画像 `src=""` のまま（10社分、ユーザーが手動で差し替え予定）
- ナビ項目 / カードの `:hover` 状態未実装（デザイン指定があれば追加）
- `scrollend` イベントは Safari 18.2+ など新しい環境のみ対応。古いブラウザ向けに setTimeout フォールバックを足すかは保留
- レスポンシブ未対応（持ち越し）
- PAGE TOP 未実装（持ち越し）

---

## 2026-05-22

### やったこと

- サイト内「企業理念」リンク（`href="#"`のまま）を5箇所すべて設定
  - `index.html` ヘッダーナビ / p-philosophy ボタン / フッターナビ → `pages/philosophy.html`
  - `pages/philosophy.html` ヘッダーナビ / フッターナビ → `philosophy.html`（自ページ）
- トップメッセージセクション実装
  - クラス命名を `p-philosophy-page__message-*` → `p-top-message__*` に整理（BEM的にクリーンな独立ブロック化）
  - 新規 `scss/object/project/_top-message.scss` 作成、`scss/style.scss` に `@use` 追加
  - `__figure` を `display: flex; align-items: center; gap: 0` で写真とキャプションを横並び。画像 width 64rem、キャプション width 40rem（Figma 641/401 → 4の倍数に丸め）
  - 写真背景 `#E3E4ED` を `margin-right: calc(50% - 50vw)` で inner の外＝画面右端まで伸ばす
  - キャプション最下行の名前+英字に `__caption-name` / `__caption-en` を付与し、`p:last-child` を `flex-direction: column` で縦並びに
  - フォント値を Figma 実値で確定: 上ブロック 1.8rem/2, 名前 3.6rem/1.5, 英字 Barlow 2.2rem/1.5
  - `__title`「トップメッセージ」上に `::before` で 1em × 4px の装飾線（フォントサイズ連動）
  - `__figure` / `__heading` / `__text` に `margin-left: 24rem` を当て、inner 左端から 24rem 右にインデント（タイトルは inner 左端のまま）
- 企業理念カードセクション（VISION/MISSION/VALUE）実装
  - クラス命名を `p-philosophy-page__list-*` → `p-philosophy-cards__*` に整理（独立ブロック化）
  - VISION本文だけ仕様が違うため `__lead` クラスに分離、MISSIONは `__text`、VALUE は `__bullets`+`__bullet`
  - 新規 `scss/object/project/_philosophy-cards.scss` 作成、`scss/style.scss` に `@use` 追加
  - カード列 width 104rem（Figma 1042 → 1040 に丸め）、`margin-left: 24rem`（トップメッセージと揃え）
  - カード間 border は `__list` 外周 1px + `__item + __item` の `border-top` で 1px 仕切り（重複回避）
  - 緑サブタイトル Barlow 2.6rem / `$color-key` / line-height 1.5
  - VISION本文 Noto Sans JP 3.4rem / line-height 1.8（Figma 61/34=1.794 → 1.8 に丸め）
  - MISSION本文・VALUE項目 Barlow 2rem / line-height 2（`$font-en` で日本語はフォールバック）
  - VALUE項目の「・」は `::before` 擬似要素 + `padding-left: 1em` で折返しインデント揃え
  - カード上下padding 7rem（ユーザー指定）、左右padding 8rem（暫定）

### 決定事項

- 各セクションは BEM 原則に揃え、独立ブロックとして切り出す（`p-top-message`, `p-philosophy-cards`）
- 画面右端まで背景色を伸ばす際は `margin-right: calc(50% - 50vw)` の負margin方式を使う（inner中央寄せ前提）
- 写真ブロックと本文ブロックは inner から `margin-left: 24rem` の左インデントで位置を揃える。タイトルは inner 左端のまま
- VISION本文だけフォント仕様が違うため、`__text` ではなく `__lead` クラスを別に切る
- カード並びの境界線は「外周 border + 内側 border-top」方式で 2px 重複を避ける
- セクションタイトル上の装飾線（1em × 4px の `::before`）は現状2箇所（top-message / philosophy-cards）で重複容認。3箇所目が出たら mixin 化または `c-section-heading` として共通化する
- カード幅 1042px は CLAUDE.md 丸めルールで 1040px (= 104rem) に丸めて採用

### 触ったファイル

- `index.html`（企業理念リンク3箇所を設定）
- `pages/philosophy.html`（main本体のクラス整理、企業理念リンク2箇所を設定、キャプションspanにクラス付与）
- `scss/object/project/_top-message.scss`（新規）
- `scss/object/project/_philosophy-cards.scss`（新規）
- `scss/style.scss`（`@use` を2件追加）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- `_page-title.scss`、`_top-message.scss`、`_philosophy-cards.scss` の各暫定値（セクション上下padding、要素間の縦間隔、カード左右padding 等）を Figma 実測で確定する作業が残る
- レスポンシブ未対応のため、`margin-left: 24rem` 等の固定値はSP時に圧迫する。ブレークポイントで0に戻す予定
- PAGE TOP（共通フローティングUI）未実装（持ち越し）
- フッター/FV/プレスリリースの暫定値（持ち越し）
- 自ページからのナビリンクは現状リロードする。現在地は無リンク化＋`aria-current="page"`運用に変えるか要検討

---

## 2026-05-20

### やったこと

- フッター（`l-footer`）のSCSS実装
  - 全体: 背景白、`padding-top: 6.4rem`、`__inner` max-width 128rem 中央寄せ
  - 上段（`__main`）: 「ロゴ ｜ (ナビ + 関連) の2カラム」構造。`align-items: flex-start` + `gap: 20rem`
  - 右カラム（`__column`）: width 92rem、`flex-direction: column` + `gap: 10.8rem`（ナビ↔関連間）
  - ロゴ: width 16.4rem、`height: auto`
  - 主要ナビ: width 64rem、項目gap 4rem、Noto Sans JP Bold 1.4rem（ヘッダーと同運用）
  - 関連コンテンツ: ラベル左 + リスト右の flex（gap 6rem 暫定）
  - 関連リスト: CSS Grid 2列×6行（`grid-template-columns: repeat(2, 1fr)`）、column-gap 4rem / row-gap 1.6rem（暫定）
  - 関連項目の頭の `-` は `a::before` 疑似要素で表現、`display: flex` + `gap: 0.8rem` で折返し時もインデント揃え
  - 下段（`__bottom`）: `margin-top: 10.4rem` + `border-top: 1px solid $color-border` + 上下padding 2rem、`justify-content: space-between` でサブナビ左 / コピーライト右
  - サブナビ・コピーライト: Noto Sans JP 1.2rem、色 `$color-text-related`（#666666）
- HTML（`index.html`）のフッター構造改修
  - `__inner` ラッパー追加（max-width 中央寄せの基準）
  - `__main` ラッパー追加（ロゴ+右カラムの2カラム）
  - `__column` ラッパー追加（ナビ+関連を縦積み）
  - フッター内ブロックのインデントを階層に合わせて整理
- 子ページの雛形作成: `pages/philosophy.html`
  - `index.html` から head / header / footer のみコピーした最低限の状態
  - 相対パスを `../` 起点に書き換え（css / img / js / ロゴリンク）
  - `<title>` は「企業理念｜エイブル株式会社-模写」に変更、`<main>` は空

### 決定事項

- フッターは「ロゴ ｜ (ナビ + 関連) の2カラム構造」を採用する。当初は単純な縦積みで実装したが、Figma再確認で2カラムに修正
- 関連リストは **2列×6行**。当初 3列×4行で実装したが、Figma目視確認で 2列×6行に修正
- 関連項目の頭の `-` は **`::before` 疑似要素 + flex** で表現する（折返し時のインデント揃え目的）
- 子ページは `pages/` 配下に配置する。css / img / js などへの参照は `../` 起点の相対パスにする
- ボーダー色（#cfcfcf）と関連文字色（#666666）は既存変数 `$color-border` / `$color-text-related` を再利用する

### 触ったファイル

- `scss/layout/_footer.scss`（新規実装）
- `index.html`（フッター部分の HTML 構造を `__inner` / `__main` / `__column` 追加で再構成、インデント整理）
- `pages/philosophy.html`（新規作成: head / header / footer のみのスケルトン）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- フッター内の暫定値多数（関連ラベル↔リスト間 / 関連リスト列・行gap / 関連ラベル font-size / サブナビ項目間 gap / フッター下端 padding）
- `pages/philosophy.html` の `<main>` 本体は未着手（翌日以降）
- FVのキャッチ/本文の位置、プレスリリースのカード内padding（持ち越し）
- p-philosophy / p-group のセクション上下padding値（持ち越し）
- p-philosophy キャッチコピー背景パターンの透過処理（持ち越し）
- レスポンシブ基準とブレークポイント値（持ち越し）

---

## 2026-05-19

### やったこと

- 企業理念セクション（`p-philosophy`）SCSS実装
  - タイトル: 日本語側を `<span>` でラップ、`border-top: 4px solid #111` + `padding-top: 4rem`、英字↔日本字は line-height のみで間隔
  - キャッチコピー: `trip_pattern 1.png` を背景に repeat、width 60rem + margin-right 4rem で右隙間確保、上下padding 2.4rem
  - 本文+ボタン: width 64rem、本文 `max-width: 55rem` で折り返し、段落間 3.4rem、本文↔ボタン 7.2rem、ボタン width 56rem
  - 2カラム配置: `__body` を `display: flex; align-items: flex-start;` で横並び（カラム自然高さ維持）
- グループ企業セクション（`p-group`）SCSS実装
  - 背景に `dot_pattern 1.png` を全幅で repeat
  - `__inner` 128rem 中央寄せ、左 `__content` 38rem + 右 `__img` 90rem（gap 0）
  - 各要素間: タイトル↔リード 4rem / リード↔本文 4rem / 本文↔ボタン 5rem
  - リード width 32rem / 本文 width 28rem（285→280に丸め）/ ボタンは c-button デフォルト 32rem
  - セクション上下padding 12rem
- サステナビリティセクション（`p-sustainability`）SCSS実装
  - 全幅レイアウト、画像（地球儀）が画面左端起点
  - `__inner` flex + gap 8rem、画像 88rem（881→880に丸め）+ `__content` 64rem
  - `__content` に上下padding 15rem（画像上端からタイトル開始位置をずらす）
  - 縦間隔: タイトル↔リード 5.6rem / リード↔本文 4rem / 本文↔ボタン 7.2rem
  - ボタン width 40rem
  - セクション上下padding 13rem
- 共通タイトルコンポーネント `c-section-title` を新規作成（philosophy/group/sustainability で再利用）
  - 構造: `.c-section-title` + `.c-section-title__en` + `.c-section-title__ja`
  - スタイル: border-top 4px solid #111 / padding-top 4rem / 英字 2.8rem Barlow SemiBold / 日本語 5rem Bold
- HTMLのタイトル構造を `c-section-title` 系に統一（philosophy/group/sustainability の3箇所）
- main全体に `background-color: $color-bg` を追加（サイト全体の薄グレー化）
- p-news カードの背景を `$color-bg` → `$color-text-white` に変更（カードを白で浮き出す）

### 決定事項

- inner幅はセクションごとに異なる（p-news 112rem, p-philosophy/p-group 128rem, p-sustainability 全幅）。Figmaのセクション設計に従う
- タイトル部分は共通コンポーネント `c-section-title` として切り出し、3セクションで再利用する（FLOCSSの component 層）
- 各セクションのボタン幅は、`c-button` のデフォルト 32rem を「セクション側で `.c-button` をネスト指定して上書き」する流儀（p-news と同じ）
- 画像 ↔ コンテンツの flex 横並びは `align-items: flex-start` で固定する（デフォルトの stretch では片方が縦に引き伸ばされるため）
- 画像の `height` は固定せず `height: auto`（width で自然に決まる）
- p-philosophy のキャッチコピー右隙間は、当初 `background-clip: content-box` で実装したが、上下paddingの背景も消える問題があり、`width: 60rem` + `margin-right: 4rem` 方式に変更
- p-sustainability は全幅レイアウトとし、画像は画面左端起点。`__content` 側に内側paddingで縦位置調整

### 触ったファイル

- `index.html`（タイトル3箇所を `c-section-title` 系に統一）
- `scss/style.scss`（@use 追加: c-section-title, philosophy, group, sustainability）
- `scss/layout/_main.scss`（`background-color: $color-bg` 追加）
- `scss/object/component/_section-title.scss`（新規）
- `scss/object/project/_news.scss`（カード `__inner` 背景色を白に変更）
- `scss/object/project/_philosophy.scss`（新規作成 → 後にタイトル系を共通化で削除）
- `scss/object/project/_group.scss`（新規）
- `scss/object/project/_sustainability.scss`（新規）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- p-philosophy / p-group のセクション上下padding値が暫定（Figma実測値で要確定）
- p-philosophy キャッチコピー背景パターン（trip_pattern）の透過処理（保留中、必要なら `::before` + opacity 方式で対応予定）
- フッター（`l-footer`）未実装
- FVのキャッチ/本文の位置（前日からの持ち越し）
- プレスリリースのカード内padding（前日からの持ち越し）
- レスポンシブ基準とブレークポイント値（前日からの持ち越し）

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
