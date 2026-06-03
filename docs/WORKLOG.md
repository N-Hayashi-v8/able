# WORKLOG

<!-- markdownlint-disable MD024 -->

> これまでの作業内容を日付ごとに記録するファイル。**新しい日付を一番上に追記する**。過去のエントリは編集しない。

---

## 2026-06-02

### やったこと

- プレスリリース一覧ページ `pages/news.html` 新規作成
  - 器（head/header/footer/`p-page-title`）は `company.html` 流用、英字 `RELEASE`
  - `p-press`: 全幅14remの絞り込み帯（背景 `img/release/filter_bg.png`、`__filter-band` > `__filter-inner`）＋ 年プルダウン（`<select>` + 擬似要素の緑シェブロン）＋ カード一覧（日付 + 会社名 + 本文 + PDFタグ、`_news.scss` 踏襲）
  - ダミー含む10件。各 `<li>` に `data-year` 付与（2024×4 / 2023×3 / 2022×3）
  - 年プルダウンの絞り込みJS `setupPressFilter()` 実装（`is-hidden` トグル、`all` で全件、change と初期表示の両方で適用）
  - アイテム hover 背景 `$color-bg-hover`(#eee)、文字 padding `3rem 3rem 4rem 3.4rem`（border・背景は `__inner` 全幅のまま）
- プライバシーポリシー `pages/privacy.html` 新規作成（`p-privacy`、リード＋見出し付き条項 `__section` 繰り返し、本文はダミー）
- カスタマーハラスメント基本方針 `pages/customer-harassment.html` 新規作成（`p-customer-harassment`、privacy と同型・同値の別ブロック）
- 電子公告 `pages/notice.html` 新規作成（`p-notice`）
  - Figma 実物に合わせ「`c-section-heading` 見出し（決算公告…）＋ 会社グループ（会社名 `h3` ＋ 行リスト）」構造、`company-overview` と同じ「inner 左端見出し + 24rem インデント / 幅104rem」流儀
  - 行 = 期（`__period`、黒）＋ リンク（`__link`、`$color-link-pdf`）＋ PDFアイコン（`__icon`）
  - 実データ反映（エイブルHD / パーソナルエステートラボ / エイブル引越サービス の各期・KB）
- 導線リンクの繋ぎ込み（`href="#"` → 実ページ）
  - フッターサブナビ4項目（プライバシーポリシー / カスハラ / 電子公告 / プレスリリース）を index ＋ 全子ページで実ページへ
  - index・各子ページの「プレスリリースを見る」ボタン → `news.html`
  - `company.html` section3「電子公告はこちら」ボタン → `notice.html`
  - index トップの「グループ／サステナビリティについて詳しく見る」ボタンの `#` 繋ぎ漏れを修正（→ group.html / sustainability.html）
- PAGE TOP（共通フローティングUI）`c-pagetop` を全9ページに実装
  - `<footer>` 後ろに `<button class="c-pagetop">`（上向き矢印アイコン＋`PAGE`/`TOP` の2行、Barlow 700 / 16px）
  - `position: fixed` 右下固定。既定 `opacity:0; visibility:hidden`、`scrollY > 300`（暫定）で `.is-visible` を付けて opacity＋translateY でふわっと出現
  - JS `setupPageTop()`: 表示トグル＋フッター被り回避（`footer` が画面に入った分＋余白だけ `bottom` を持ち上げ）＋クリックで `scrollTo({top:0, behavior:'smooth'})`
  - 矢印は `c-button` の線＋barb流儀を縦向きに（擬似要素）

### 決定事項

- プレスリリースの絞り込みタブは、ボタン群ではなくネイティブ `<select>` ＋ 擬似要素シェブロン方式（JSなしでも開閉成立、`change` に素直に繋がる）
- 絞り込みは `data-year` 属性 + `is-hidden` クラストグル。JSは `setupPressFilter()` に汎用化（`setupCurrentNav()` と同じ流儀）
- 「すべて」option を先頭・既定にして全件表示。年選択でその年のみ表示
- ポリシー系2ページ（privacy / kasuhara）は見出し付き条項の独立ブロックとして別々に実装。SCSSはほぼ重複だが、3つ目の同型が出たら共通ブロック `p-policy` への一本化を検討（`c-section-heading` で実施した「3箇所目で共通化」と同じ判断軸）
- 電子公告は会社グループ単位のリスト。見出しは共通 `c-section-heading`、リンク色は用途どおり `$color-link-pdf`、各行は期＋リンクで「行全体ではなくリンク部分のみ `<a>`」
- ページタイトルの英字スロットは、ポリシー／公告系では「エイブルグループ」表記（ユーザー指定）
- PAGE TOP は component 層 `c-pagetop` とし、`<footer>` 後ろ＋`position: fixed` で全ページ共通配置。フッター被り回避は CSS だけでは難しいため JS で `bottom` を動的調整する方式を採用
- 採用情報ページはコミット漏れで消失（履歴・stash・作業ツリーいずれにも無し）。画像 `img/recuruit/` のみ初回コミットに残存。ゼロから作り直す（2026-06-03 訂正: 消失は誤り。0601 の作業が別マシンの作業ツリーに未コミットで残存していたため、2026-06-03 にコミット復旧。作り直しは不要）

### 触ったファイル

- `pages/news.html`（新規）
- `pages/privacy.html`（新規）
- `pages/customer-harassment.html`（新規）
- `pages/notice.html`（新規）
- `scss/object/project/_press.scss`（新規）
- `scss/object/project/_privacy.scss`（新規）
- `scss/object/project/_customer-harassment.scss`（新規）
- `scss/object/project/_notice.scss`（新規）
- `scss/object/component/_pagetop.scss`（新規 / PAGE TOP）
- `scss/style.scss`（`@use` 追加: press / privacy / customer-harassment / notice / component/pagetop）
- `js/script.js`（`setupPressFilter()` ＋ `setupPageTop()` 追加、DOMContentLoaded で呼び出し）
- `img/release/filter_bg.png`（ユーザー配置）
- `index.html`（プレスリリース / プライバシーポリシー / カスハラ / 電子公告リンク、グループ・サステナビリティボタンの繋ぎ込み、PAGE TOP 追加）
- `pages/company.html` / `group.html` / `philosophy.html` / `sustainability.html`（フッターサブナビ4項目のリンク繋ぎ込み、company は section3 ボタンも。全ページに PAGE TOP 追加）
- `pages/news.html` / `privacy.html` / `customer-harassment.html` / `notice.html`（新規ページにも PAGE TOP 追加）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- 新規4ファイル（`_press` / `_privacy` / `_customer-harassment` / `_notice`）の `// 暫定` 値を Figma 実測で確定
- ダミー本文（privacy / kasuhara / news の一部 / notice の英字スロット）を Figma 実テキストに差し替え
- `p-press` と `p-notice` でカード行スタイルが重複。共通コンポーネント化（例 `c-media-row`）の検討候補
- プレスリリース「1ページ最大10件」のページネーションUIは未実装（現状は各年≤4件のため不要）
- `p-notice` の行ホバー / リンクホバーの要否が Figma から未確認
- `c-pagetop` の暫定値（出現閾値 300px / `right`・`bottom` 4rem / フッター手前余白 40px / 矢印 barb の向き）を Figma で確定
- レスポンシブ未対応（継続）

---

## 2026-06-01

### やったこと

- 採用情報ページ `pages/recruit.html` を新規作成（`company.html` を雛形に head / header / footer / `p-page-title` 流用）
  - `<title>`「採用情報｜エイブル株式会社-模写」、英字 `RECRUIT`、breadcrumb 末尾「採用情報」
- サイト内「採用情報」リンク（`href="#"`）を全6ページのヘッダー/フッターで設定（`index.html` は `pages/recruit.html`、下層は `recruit.html`）
- `p-recruit-mv`（全幅リード画像、`p-sus-mv` 同型）新規。画像は `img/recuruit/img_lead (1) 1.png`
- `p-recruit-jobs` セクション実装（リード文 + 企業2社 + 採用種別カード）
  - ユーザーの手書きHTMLを BEM 整理。繰り返し構造を `ul/li` 化（`__companies > __company`、`__cards > __card`）
  - リード文: `max-width: 91rem` 中央寄せ / `1.8rem` / `line-height: 1.78`、セクション `padding-top: 9rem`
  - 社カード（`__company`）: 白背景 / `min-height: 45rem`（450px、固定せず下限）/ `padding: 6rem 8rem` / 左揃え（`align-items: flex-start`）
  - 最初の社カードのみ `--bar` modifier で上端左に黒装飾線（`4rem × 0.4rem`）
  - `__company-head`: ロゴ `14.4rem`（144.95px→144px）+ 社名 `3.2rem` / 700、gap 2.4rem（暫定）
  - `__cards`: flex wrap / `gap: 5rem`（右余白90pxになる逆算値）
  - `__card-link`: `240 × 180` 固定 / 緑枠 `1px solid $color-key` / 緑文字 `2.4rem` / 700 / 中央寄せ / **hover で色反転**（背景緑・文字白、transition付き）
  - フッターとの間隔は `padding-bottom: 15rem`

### 決定事項

- 採用情報ページのプレフィックスは `p-recruit-`（MV は `p-recruit-mv`、本体は `p-recruit-jobs`）
- 採用種別カードは padding 駆動をやめ `240 × 180` 固定サイズ + flex 中央寄せに変更（見栄え優先。height 固定はユーザー指定で policy より優先）
- 最初の社カードの装飾線は `:first-child`（DOM位置依存）ではなく BEM modifier `--bar` で明示（SDGs の `--col-4` と同流儀）
- セクション下端の余白は `margin-bottom` ではなく `padding-bottom`。`main` に padding/border が無いため子の `margin-bottom` が margin collapsing で `main` 外へ抜け、余白がグレーでなく白（フッター背景）になる問題を回避
- カード右余白90px は「白カード1280px・カード240px・左右padding80px」前提で `gap = 50px（5rem）` から逆算（`960 + 50×3 = 1110`、余り10px + 右padding80px = 90px）

### 触ったファイル

- `pages/recruit.html`（新規作成、`<main>` 全実装）
- `index.html`、`pages/philosophy.html`、`pages/group.html`、`pages/sustainability.html`、`pages/company.html`（採用情報リンク差し替え）
- `scss/object/project/_recruit-mv.scss`（新規）
- `scss/object/project/_recruit-jobs.scss`（新規）
- `scss/style.scss`（`@use` 2件追加: recruit-mv / recruit-jobs）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- `_recruit-jobs.scss` の `// 暫定` 値: `__company-head` gap（2.4rem）/ `__cards` margin-top（4rem）/ `__companies` gap（4rem）・margin-top（6rem）/ 装飾線の横幅（4rem）。Figma 実測で確定する作業が残る
- `__card-link` の `height` 固定（180px）はレスポンシブ時に再検討（min-height 化等）
- ロゴ `alt=""` のまま（装飾扱い、社名が隣接 `h2` にあるため許容）
- レスポンシブ未対応（持ち越し）
- PAGE TOP 未実装（持ち越し）

---

## 2026-05-29

### やったこと

- `pages/sustainability.html` の全セクション SCSS 実装（5ファイル新規）
  - `_sus-mv.scss`（全幅MV画像）
  - `_sus-sdgs.scss`（見出し緑センター + リード + 概念図 + 3カラムカード + SDGsアイコン grid）
  - `_sus-action.scss`（左 sticky ナビ24rem + 右コンテンツ104rem、`p-group-list` 流儀踏襲）
  - `_sus-action-group.scss`（見出し / visual / action / item の構造、`c-section-heading` + 英字4rem+日本字2rem の2段）
  - `_sus-bnr.scss`（CSRバナー、Figma実値で `max-width: 80rem` / `padding-top: 8.4rem`）
- SDGsアイコンのレイアウト調整
  - `__icons` を `display: grid` 化、デフォルト 3カラム
  - Innovation のみ `__icons--col-4` modifier で 4カラム化（HTMLにクラス追加）
- sec2 ビジュアルの SDGsアイコン重ね位置
  - 当初 `bottom: -2rem; right: 4rem;`（右下）で実装 → 写真中央下にめり込む形（`left: 50%; transform: translateX(-50%)`）に変更
- アイテム画像幅: 24rem → 10rem に変更
- サステナビリティ section1 見出しは `c-section-heading`（左揃え黒）と仕様が違う（緑センター）ため、HTMLから `c-section-heading` クラスを除去し `p-sus-sdgs__heading` 独自スタイルに切り出し
- JS の現在地ハイライトを汎用関数 `setupCurrentNav({ rootSelector, cardSelector, navItemSelector })` に切り出し（`p-group-list` 専用 → 多ページ対応）
  - `p-group-list` と `p-sus-action` の両方で再利用
- 会社案内ページ `pages/company.html` を新規作成
  - 雛形は `sustainability.html` 踏襲（head / header / footer / `p-page-title`）
  - `<title>`「会社案内｜エイブル株式会社-模写」、英字 `COMPANY`、breadcrumb 末尾「会社案内」
- サイト内「会社案内」リンク（href="#"のまま）を5ページ8箇所すべて設定
  - `index.html` ヘッダー/フッター → `pages/company.html`
  - `pages/philosophy.html` / `pages/group.html` / `pages/sustainability.html` のヘッダー/フッター → `company.html`
  - `pages/company.html` 自身のヘッダー/フッター → `company.html`
- 会社案内ページ `<main>` 本体の HTML骨組み + SCSS 実装（3セクション）
  - `p-company-overview`（会社概要）: `dl > div.__row > dt+dd` 構造、5行（商号 / 設立 / 役員 / グループ事業内容 / 所在地+map）
    - 役員は `__officer-role` + `__officer-name` の2カラム
    - 事業内容は縦並びリスト
    - 所在地に Google Maps iframe 埋め込み（住所「東京都港区元赤坂1-5-5」）
  - `p-company-group`（グループ会社一覧）: 2カラム × 5行 grid、10社カード
    - 各カード上端に短い装飾線（4rem × 0.4rem 黒、`::before`）
    - 会社名 + ↗ アイコン（緑、`$color-key`）
    - dl で 事業内容 / 所在地
  - `p-company-notice`（電子公告）: 見出し（`c-section-heading`、inner 左端）+ ボタン（中央寄せ）
    - ボタンは `c-button` 流用、Figma実値で `width: 57.6rem`（577→576px丸め）、`justify-content: center` でテキスト中央揃え
- 会社概要 / グループ会社一覧の本文は「左余白24rem + コンテンツ幅104rem」のインデント運用を採用（philosophy / sustainability section1 と同じ流儀）

### 決定事項

- サステナビリティ section1 の見出し（緑センター + 下装飾線）は `c-section-heading`（左揃え黒 + 上装飾線）とは別仕様。`p-sus-sdgs__heading` で独自に書き、`c-section-heading` クラスはHTMLから除外
- SDGsアイコン配置は `display: grid` + modifier（`--col-3` / `--col-4`）で扱う。`:nth-child` 依存ではなく BEM modifier で明示
- SDGsアイコンを写真に重ねる位置は「写真の横中央・下端から少し下に飛び出す」配置（`left: 50%; transform: translateX(-50%); bottom: -2rem;`）
- 現在地ハイライトJSは汎用関数 `setupCurrentNav()` 化。新しいページで同じ仕組みを使いたいときは引数で対象セレクタを渡すだけ
- 会社案内ページのコンテンツ部は「inner 左端の見出し + 24rem インデントしたコンテンツ（幅104rem）」レイアウト
- 会社案内 section3 のボタン位置は Figma だと中途半端な位置だったため、見出し左 + ボタン中央 のレイアウトに変更。ボタン内のテキストも `justify-content: center` で中央揃え
- 会社案内 section2 のカード装飾線は `p-group-list` と同じ「短い黒線（`::before`）」流儀を踏襲、サイズだけ調整（4rem × 0.4rem）
- 会社案内 section2 の ↗ アイコンは全カードに付与（個別精査は後日）
- Google Maps 埋め込みは `maps.google.com/maps?q=住所&output=embed` 形式（API キー不要の暫定）、本番は Embed API キー取得が推奨
- Figma実値の丸めは引き続き「4の倍数優先・近い方を選ぶ」運用。今回確定: bnr 800px=80rem / 1042px=104rem / 240px=24rem / 577px=576px=57.6rem / 84px=8.4rem

### 触ったファイル

- `pages/sustainability.html`（`p-sus-sdgs__heading` から `c-section-heading` 除去、`__icons--col-4` modifier 追加、会社案内リンク差し替え）
- `pages/company.html`（新規作成、head/header/footer/page-title/`<main>` 3セクション + Google Maps iframe）
- `pages/philosophy.html`、`pages/group.html`（会社案内リンク差し替え）
- `index.html`（会社案内リンク2箇所差し替え）
- `scss/object/project/_sus-mv.scss`（新規）
- `scss/object/project/_sus-sdgs.scss`（新規）
- `scss/object/project/_sus-action.scss`（新規）
- `scss/object/project/_sus-action-group.scss`（新規）
- `scss/object/project/_sus-bnr.scss`（新規）
- `scss/object/project/_company-overview.scss`（新規）
- `scss/object/project/_company-group.scss`（新規）
- `scss/object/project/_company-notice.scss`（新規）
- `scss/style.scss`（`@use` 8件追加: sus-mv / sus-sdgs / sus-action / sus-action-group / sus-bnr / company-overview / company-group / company-notice）
- `js/script.js`（`setupCurrentNav()` 汎用関数化、`p-group-list` と `p-sus-action` の両方で呼び出し）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- 各SCSSファイルの `// 暫定` 値多数（特に `_sus-sdgs.scss` / `_sus-action.scss` / `_sus-action-group.scss` / `_company-overview.scss` / `_company-group.scss` / `_company-notice.scss` の上下padding・gap・フォントサイズ）。Figma 実測で順次確定する作業が残る
- サステナビリティ Diversity / Social の本文は判読困難箇所を文意で補完した状態のまま（持ち越し）
- `__item-source` のリンク化方針未確定（持ち越し）
- 会社案内 section2 の ↗ アイコンは全カードに付与済み。ロゴ有無等の規則がデザイン上ある場合は要精査
- 会社案内 section1 の Google Maps は `?q=&output=embed` 形式の暫定。本番は Embed API キー取得が推奨
- `pages/group.html` のロゴ画像 `src=""` のまま（10社分、ユーザーが手動で差し替え予定）
- レスポンシブ未対応（持ち越し）
- PAGE TOP 未実装（持ち越し）

---

## 2026-05-27

### やったこと

- `pages/sustainability.html` の `<main>` 全セクションの HTML 骨組みを実装（MV / SDGs / 取り組み3群 / CSR バナーの計5セクション）
- 新規ブロック命名（プレフィックス `p-sus-`）
  - `p-sus-mv`（全幅 MV 画像、`__inner` 持たず）
  - `p-sus-sdgs`（見出し + リード + 概念図 + 下段3カラム）
    - 下段3カラムは `__cards` > `__card` > (`__card-en` / `__card-title` / `__icons` > `__icon`) 構造
  - `p-sus-action`（左ナビ sticky + 右コンテンツ、`p-group-list` の流儀を踏襲）
    - `__nav` / `__nav-list` / `__nav-item` / `__nav-en` / `__nav-title`
    - `__body` の中に各テーマブロックを並べる
  - `p-sus-action-group`（sec2 の Innovation / Diversity / Social の各テーマ塊を独立ブロックに切り出し）
    - `__heading`（`c-section-heading` 併用） / `__en` / `__title`
    - `__visual` > `__photo` + `__sdgs`（写真上に SDGs アイコン重ね）
    - `__action`（ACTION 番号 + 説明）と `__item`（個別アイテム）は HTML 上フラット並列
    - `__action-num` > `__action-label`(ACTION) + `__action-number`(01/02)、`__action-desc`
    - `__item` > `__item-img` + `__item-body` > `__item-title` / `__item-text` / `__item-source`
  - `p-sus-bnr`（CSR リンクバナー、画像1枚を `<a>` でラップ）
- セクションタイトル装飾線は既存 `c-section-heading` を sec1 見出し / sec2 各テーマ見出しの計4箇所で再利用
- sec2 左ナビのアンカーリンク用に各テーマブロックへ `id="innovation"` / `id="diversity"` / `id="social"` を付与（次回 IntersectionObserver で現在地ハイライト用にも使う想定）
- Innovation セクションの本文は Figma から正確に書き起こし、Diversity / Social は判読困難箇所を文意で補完（次回原文差し替え予定）
- 全 `<img>` の `src` を実画像ファイルに当て込み（ユーザー作業）
  - SDGs アイコンファイル名を `sdgs/NN.png`（2桁ゼロパディング）形式に整理

### 決定事項

- サステナビリティ下層ページ用のブロックプレフィックスは `p-sus-` とする（既存トップページの `p-sustainability` との衝突回避 + フルプレフィックスより短く書ける）
- sec2 の各テーマ塊（Innovation / Diversity / Social）は `p-sus-action-group` として独立ブロックに切り出す。`p-sus-action` 内部に閉じ込めると階層が4段超になるため
- ACTION ブロック（番号+説明）と詳細アイテム（`__item`）は HTML 上フラット並列にする。入れ子にしないことで、ISMS 認証取得のような「ACTION 番号を持たない単独アイテム」を素直に書ける + 階層を浅く保てる
- sec2 のレイアウト方針は `p-group-list` の流儀を全面踏襲（左ナビ sticky + 右コンテンツ + 現在地ハイライト + スムーズスクロール + `scroll-margin-top` で固定ヘッダー隠れ対策）
- SDGs アイコンのファイル名は `sdgs/NN.png` の2桁ゼロパディング形式に統一

### 触ったファイル

- `pages/sustainability.html`（`<main>` の MV〜CSR バナーまで全セクション実装）
- `img/sustainability/sdgs/` 配下のアイコンファイル名整理（ユーザー作業）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新）

### 未解決

- 全セクションの SCSS 未実装（次回着手）
- Diversity / Social の本文は判読困難箇所を文意で補完してある（次回 Figma 原文に差し替え予定）
- `__item-source` のリンク化方針未確定（出典名の右に ↗ アイコンが付くデザインなら `<a>` ラップに変更）
- sec2 の左ナビ現在地ハイライト用 JS は未実装（`p-group-list` の流儀踏襲予定）
- レスポンシブ未対応（持ち越し）
- PAGE TOP 未実装（持ち越し）

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
- `pages/sustainability.html` 新規作成（philosophy.html / group.html と同じ流儀: head / header / footer 流用、`<title>` と各種ナビリンクを差し替え）
- サイト内「サステナビリティ」リンク（`href="#"`のまま）を6箇所すべて設定
  - `index.html` ヘッダーナビ / フッターナビ → `pages/sustainability.html`
  - `pages/philosophy.html` / `pages/group.html` のヘッダーナビ / フッターナビ → `sustainability.html`
- `sustainability.html` の `<main>` 冒頭を実装
  - `p-page-title`（既存流用、英字 SUSTAINABILITY / 日本字「サステナビリティ」、breadcrumb 末尾も差替）
  - MV 画像セクション（`<section><img></section>` のクラス未付与の暫定状態）
- WORKLOG.md のリンター警告解消（ファイル冒頭に MD024 抑制ディレクティブ追加、2026-05-15 エントリの H3 直下に空行追加）

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
- `js/script.js`(IntersectionObserver + scrollend + ナビクリックハンドラを追記）
- `pages/sustainability.html`（新規作成、p-page-title + MV 画像セクションまで実装）
- `index.html`（サステナビリティリンク2箇所を設定）
- `pages/group.html`（サステナビリティリンク2箇所を設定）
- `css/style.css`（Live Sass Compiler で自動生成）
- `docs/TODO.md`、`docs/WORKLOG.md`（更新。WORKLOG.md は併せてリンター警告解消）

### 未解決

- `_group-list.scss` / `_group-lead.scss` 内の `// 暫定` 値を Figma 実測で確定する作業が残る
- ロゴ画像 `src=""` のまま（10社分、ユーザーが手動で差し替え予定）
- ナビ項目 / カードの `:hover` 状態未実装（デザイン指定があれば追加）
- `scrollend` イベントは Safari 18.2+ など新しい環境のみ対応。古いブラウザ向けに setTimeout フォールバックを足すかは保留
- レスポンシブ未対応（持ち越し）
- PAGE TOP 未実装（持ち越し）
- `pages/sustainability.html` の MV セクションがクラス未付与の暫定状態（次回着手時に命名 + SCSS 化）
- `pages/sustainability.html` の MV 以降のセクション未実装

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
