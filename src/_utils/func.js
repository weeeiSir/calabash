export function getSpan() {
  let s = (document.body.getBoundingClientRect() || {}).width;
  return s > 1500 ? 6 : 8;
}
