# TODO

> 最終更新: 2026-05-22（本日の作業終了時点）
> 翌日の作業を整理するファイル。完了したものは WORKLOG.md に移して本ファイルからは削除する。

---

## 翌日（2026-05-23）にやること

- [ ] `pages/philosophy.html` 各セクションの暫定値を実Figma値で確定
  - p-page-title 周り（breadcrumb の margin-top 4rem / gap 1.6rem 等）
  - p-top-message の縦間隔（title↔body 6rem / figure↔heading 6rem / heading↔text 4rem / セクション上下padding 12rem）
  - p-top-message の `__heading` / `__text` のフォント値と本文幅
  - p-top-message のキャプション内 gap（暫定 1.6rem / 0.8rem）
  - p-philosophy-cards（title↔list 6rem / カード左右padding 8rem / `__en`↔本文 3.2rem / `__bullets` gap 0.8rem）

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
- [ ] PAGE TOP（共通フローティングUI）の実装。`<body>` 直下 + `position: fixed` で全ページ共通配置を想定
- [ ] セクションタイトル装飾線（1em × 4px の `::before`）が3箇所目に出たら mixin/`c-section-heading` 化を検討（現状2箇所で重複）
- [ ] 自ページからのナビリンクの扱い。現在地は無リンク化 + `aria-current="page"` 運用に変えるか要検討

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
