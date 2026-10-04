function applyProps(element, props) {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;

    if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }
}

function appendChildren(element, children) {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;

    if (Array.isArray(child)) {
      appendChildren(element, child);
    } else if (child instanceof Node) {
      element.appendChild(child);
    } else {
      element.appendChild(document.createTextNode(String(child)));
    }
  }
}

export function el(tag, props = {}, children = []) {
  const element = document.createElement(tag);
  applyProps(element, props);
  appendChildren(element, Array.isArray(children) ? children : [children]);
  return element;
}

export function img(src, alt, props = {}) {
  return el('img', { src, alt, ...props });
}

export function button(label, props = {}) {
  return el('button', { type: 'button', ...props }, label);
}