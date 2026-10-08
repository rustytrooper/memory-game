import { el, button } from './dom.js';

export function createModal({ title, content, actions = [] }) {
  let isOpen = false;
  let previousBodyOverflow = '';

  const titleEl = el('h2', { className: 'modal__title' }, title);
  const headerEl = el('div', { className: 'modal__header' }, titleEl);

  const bodyEl = el('div', { className: 'modal__body' });
  appendContent(bodyEl, content);

  const footerEl = el('div', { className: 'modal__footer' });

  for (const action of actions) {
    const btn = button(action.label, {
      className: `btn ${action.primary ? 'btn--primary' : ''}`.trim(),
    });
    if (typeof action.onClick === 'function') {
      btn.addEventListener('click', action.onClick);
    }
    footerEl.appendChild(btn);
  }

  const closeButton = button('Close', { className: 'btn' });
  closeButton.addEventListener('click', () => close());
  footerEl.appendChild(closeButton);

  const modalEl = el(
    'div',
    {
      className: 'modal',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': title,
    },
    [headerEl, bodyEl, footerEl]
  );

  const overlayEl = el('div', { className: 'modal-overlay' }, modalEl);

  overlayEl.addEventListener('click', (event) => {
    if (event.target === overlayEl) {
      close();
    }
  });

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      close();
    }
  }

  function open() {
    if (isOpen) return;
    isOpen = true;

    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.body.appendChild(overlayEl);
    document.addEventListener('keydown', onKeyDown);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;

    document.body.style.overflow = previousBodyOverflow;
    document.removeEventListener('keydown', onKeyDown);
    overlayEl.remove();
  }

  function setContent(newContent) {
    while (bodyEl.firstChild) {
      bodyEl.removeChild(bodyEl.firstChild);
    }
    appendContent(bodyEl, newContent);
  }

  return {
    open,
    close,
    isOpen: () => isOpen,
    setContent,
  };
}

function appendContent(container, content) {
  if (!content) return;
  const list = Array.isArray(content) ? content : [content];
  for (const item of list) {
    if (item instanceof Node) {
      container.appendChild(item);
    }
  }
}
