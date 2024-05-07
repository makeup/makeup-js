const sequenceMap = {};
const defaultPrefix = "nid";
const randomPortion = createRandomPortion(3);
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
function createRandomPortion(size) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const allChars = letters + digits;
  let portion = letters[randomNumber(25)];
  for (let i = 1; i < size; i++) {
    portion += allChars[randomNumber(35)];
  }
  return portion;
}
function src_default(el, prefix = defaultPrefix) {
  const separator = prefix === "" ? "" : "-";
  const key = `${prefix}${separator}${randomPortion}`;
  sequenceMap[key] = sequenceMap[key] || 0;
  if (!el.id) {
    el.setAttribute("id", `${key}-${sequenceMap[key]++}`);
  }
  return el.id;
}
export {
  src_default as default
};
