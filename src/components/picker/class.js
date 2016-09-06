const trim = (string) => {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') != -1) {
    throw new Error(' className should not contain space');
  }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (` ${el.className} `).indexOf(` ${cls} `) > -1;
  }
};

const addClass = (el, cls) => {
  if (!el) return;
  let curClass = el.className;
  let classes = (cls || '').split(' ');
  let [i, j] = [0, classes.length];

  for (; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ` ${clsName}`;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

const removeClass = (el, cls) => {
  if (!el || !cls) return;
  let classes = cls.split(' ');
  let curClass = ` ${el.className} `;
  let [i, j] = [0, classes.length];
  for (; i< j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(` ${clsName} `, ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
} 

module.exports = {
  hasClass,
  addClass,
  removeClass
}