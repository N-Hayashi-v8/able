// ハンバーガーメニュー等のJSをここに

// スクロール位置に応じて左ナビの現在地を切り替える汎用関数
// rootSelector: 機能を仕掛けるセクションのセレクタ（対象ページのみ動作させる用）
// cardSelector: スクロール検出対象のカード/セクション群
// navItemSelector: 切り替え対象のナビ項目（href="#id" を持つ <a> を含むこと）
function setupCurrentNav({ rootSelector, cardSelector, navItemSelector }) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const cards = root.querySelectorAll(cardSelector);
  const navItems = root.querySelectorAll(navItemSelector);
  if (cards.length === 0 || navItems.length === 0) return;

  // ナビクリックによる自動スクロール中は Observer の自動切替を停止する
  // （途中通過するカードで is-current が次々発火してアニメーションが暴れるのを防ぐ）
  let isAutoScrolling = false;

  navItems.forEach((item) => {
    const link = item.querySelector('a');
    if (!link) return;
    link.addEventListener('click', () => {
      navItems.forEach((i) => i.classList.toggle('is-current', i === item));
      isAutoScrolling = true;
    });
  });

  // スムーズスクロールが終わったタイミングで通常モードへ復帰
  window.addEventListener('scrollend', () => {
    isAutoScrolling = false;
  });

  const observer = new IntersectionObserver((entries) => {
    if (isAutoScrolling) return;
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
}

document.addEventListener('DOMContentLoaded', () => {
  // グループ企業ページ
  setupCurrentNav({
    rootSelector: '.p-group-list',
    cardSelector: '.p-group-list__card',
    navItemSelector: '.p-group-list__nav-item',
  });

  // サステナビリティページ
  setupCurrentNav({
    rootSelector: '.p-sus-action',
    cardSelector: '.p-sus-action-group',
    navItemSelector: '.p-sus-action__nav-item',
  });
});
