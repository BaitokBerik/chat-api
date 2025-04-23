// script.js

// Ничего не трогаем из chat.js: он рендерит сообщения в #chat

// Для <details> — автозакрытие других секций
document.querySelectorAll('aside details').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('aside details')
        .forEach(x => x !== d && (x.open = false));
    }
  });
});

// При желании можно добавить плавную анимацию контента внутри <details> через CSS:
// details > div { transition: max-height .2s ease; overflow: hidden; }

