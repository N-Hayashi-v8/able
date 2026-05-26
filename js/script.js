// ハンバーガーメニュー等のJSをここに

// グループ会社一覧ページ: スクロール位置に応じてナビの現在地を切り替える
// 該当ページ以外では p-group-list が存在しないので何もしない（全ページ共通読込）
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.p-group-list__card');
  const navItems = document.querySelectorAll('.p-group-list__nav-item');
  if (cards.length === 0 || navItems.length === 0) return;

  // ナビクリックによる自動スクロール中は Observer の自動切替を停止する
  // （途中通過するカードで is-current が次々発火してアニメーションが暴れるのを防ぐ）
  let isAutoScrolling = false;

  navItems.forEach((item) => {
    const link = item.querySelector('a');
    if (!link) return;
    link.addEventListener('click', () => {
      // クリック対象に即時 is-current をジャンプ適用
      navItems.forEach((i) => i.classList.toggle('is-current', i === item));
      isAutoScrolling = true;
    });
  });

  // スムーズスクロールが終わったタイミングで通常モードへ復帰
  window.addEventListener('scrollend', () => {
    isAutoScrolling = false;
  });

  const observer = new IntersectionObserver((entries) => {
    if (isAutoScrolling) return; // 自動スクロール中は途中通過を無視
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navItems.forEach((item) => {
        const link = item.querySelector('a');
        if (!link) return;
        item.classList.toggle('is-current', link.getAttribute('href') === `#${id}`);
      });
    });
  }, {
    rootMargin: '-40% 0px -40% 0px', // 画面中央20%帯に入ったら発火
  });

  cards.forEach((card) => observer.observe(card));
});
