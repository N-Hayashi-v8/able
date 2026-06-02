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

// プレスリリース一覧：年プルダウンで絞り込む
// selectSelector: 年を選ぶ <select>
// itemSelector: data-year を持つ一覧アイテム群
function setupPressFilter({ selectSelector, itemSelector }) {
  const select = document.querySelector(selectSelector);
  const items = document.querySelectorAll(itemSelector);
  if (!select || items.length === 0) return;

  const apply = (year) => {
    items.forEach((item) => {
      const hidden = year !== 'all' && item.dataset.year !== year;
      item.classList.toggle('is-hidden', hidden);
    });
  };

  apply(select.value); // 初期表示もプルダウンの選択値に合わせる
  select.addEventListener('change', () => apply(select.value));
}

// PAGE TOP ボタン：最上部で非表示／スクロールで出現／フッターに被らない／押下でゆっくり上部へ
function setupPageTop({ selector }) {
  const btn = document.querySelector(selector);
  if (!btn) return;

  const footer = document.querySelector('.l-footer');
  const showAfter = 300; // 暫定：この px を超えてスクロールしたら表示
  const gap = 40; // 暫定：フッター手前で空ける余白(px) ＝ CSS の bottom 4rem と揃える

  const update = () => {
    btn.classList.toggle('is-visible', window.scrollY > showAfter);

    // フッターが画面に入ったら、その分だけボタンを持ち上げて被りを防ぐ
    if (footer) {
      const overlap = window.innerHeight - footer.getBoundingClientRect().top;
      btn.style.bottom = overlap > 0 ? `${overlap + gap}px` : '';
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // html { scroll-behavior: smooth } によりゆっくりスクロールする
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
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

  // プレスリリース一覧ページ
  setupPressFilter({
    selectSelector: '.p-press__select',
    itemSelector: '.p-press__item',
  });

  // PAGE TOP（全ページ共通）
  setupPageTop({ selector: '.c-pagetop' });
});
