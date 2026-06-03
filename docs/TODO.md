# TODO

> 最終更新: 2026-06-02（本日の作業終了時点）
> 翌日の作業を整理するファイル。完了したものは WORKLOG.md に移して本ファイルからは削除する。

---

## 翌日（次回作業日）にやること

- [ ] 新規4ファイル（`_press` / `_privacy` / `_customer-harassment` / `_notice`）の `// 暫定` 値を Figma 実測で確定
- [ ] ダミー本文の差し替え（`privacy.html` / `customer-harassment.html` / `news.html` の一部 / `notice.html` の英字スロット「エイブルグループ」）
- [ ] `p-press` と `p-notice` のカード行スタイル重複を共通コンポーネント化するか検討（3つ目が出たら実施の判断軸）
- [ ] プレスリリースのページネーション（1ページ最大10件）の要否確認・実装（現状は各年≤4件で不要）
- [ ] `p-notice` の行ホバー / リンクホバーの要否を Figma で確認
- [ ] `c-pagetop`（PAGE TOP）の暫定値を Figma で確定（出現閾値 300px / `right`・`bottom` 4rem / フッター手前余白 40px / 矢印 barb の向き）
- [ ] `pages/sustainability.html` の Diversity / Social 本文テキストを Figma 原文に差し替え（現状は判読困難箇所を文意で補完）
- [ ] `__item-source` のリンク化方針確認（出典名 + ↗アイコンの場合 `<a>` でラップ）
- [ ] `pages/company.html` の section2 ↗ アイコンの規則精査（ロゴ有無等で表示/非表示の出し分けが必要なら対応）
- [ ] `pages/company.html` の Google Maps を Embed API キー方式に差し替え（任意）
- [ ] 各 `_sus-*.scss` / `_company-*.scss` / `_recruit-jobs.scss` の `// 暫定` 値を Figma 実測で確定（recruit: `__company-head` gap / `__cards` margin-top / `__companies` gap・margin-top / 装飾線横幅）
- [ ] `pages/recruit.html` の `__card-link` の固定 `height: 180px` をレスポンシブ時に再検討（min-height 化等）
- [ ] `pages/group.html` のロゴ画像 `src=""` を10社分実画像に差し替え（手動）
- [ ] `_group-list.scss` / `_group-lead.scss` の `// 暫定` 値を Figma 実測で確定
- [ ] `p-group-list` / `p-sus-action` / `p-company-group` のナビ項目 / カードの `:hover` 状態の実装（デザイン指定があれば）

## 近いうちにやること（順不同）

- [ ] フッター内の暫定値を実Figma値で確定
  - 関連ラベル ↔ リスト間 gap（暫定 6rem）
  - 関連リスト column-gap / row-gap（暫定 4rem / 1.6rem）
  - 関連ラベル font-size（暫定 1.4rem）
  - サブナビの項目間 gap（暫定 4rem）
  - フッター下端 padding（未指定）
- [ ] FVのキャッチ/本文の位置を実Figma値で確定（現在は暫定値）
- [ ] プレスリリースのカード内 padding を実Figma値で確定（現在は暫定値）
- [ ] p-philosophy / p-group のセクション上下padding値を実Figma値で確定（暫定値）
- [ ] p-philosophy キャッチコピー背景パターン（trip_pattern）の透過処理（保留中）
- [ ] レスポンシブ対応（PC → SP もしくは SP → PC、方針未決）
- [ ] 自ページからのナビリンクの扱い。現在地は無リンク化 + `aria-current="page"` 運用に変えるか要検討
- [ ] `scrollend` イベント未対応ブラウザへの setTimeout フォールバックの要否判断（現状は Chrome 114+ / Firefox 109+ / Safari 18.2+ のみ動作）

## 保留・要確認

- [ ] レスポンシブの基準（PC基準 or SP基準）をどちらにするか
- [ ] 共通のブレークポイント値（例: 768px / 1024px）を `_variables.scss` に定義

---

## 記法ルール（Claude が保守するときの約束）

- セクション構成は **「翌日にやること」「近いうちにやること」「保留・要確認」** の3つで固定。順番も変えない。
- 各タスクは `- [ ]` チェックボックスで書く。完了したら **このファイルから削除して WORKLOG.md に追記** する（チェック済みのまま残さない）。
- 日付は `YYYY-MM-DD` 形式。
- 「翌日」セクションの日付見出しは、作業日が変わったら必ず更新する。
- 冒頭の「最終更新」も編集時に必ず更新する。
- ユーザーが口頭で挙げたタスクは、勝手に消さず該当セクションに追記する。
