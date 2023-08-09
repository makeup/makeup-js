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

  // to ensure a valid HTML ID (when prefix is empty), first character must be a letter
  let portion = letters[randomNumber(25)];

  // start iterating from 1, as we already have our first char
  for (let i = 1; i < size; i++) {
    portion += allChars[randomNumber(35)];
  }

  return portion;
}

export default function (el, prefix = defaultPrefix) {
  const separator = prefix === "" ? "" : "-";

  // join first prefix with random portion to create key
  const key = `${prefix}${separator}${randomPortion}`;

  // initialise key in sequence map if necessary
  sequenceMap[key] = sequenceMap[key] || 0;

  if (!el.id) {
    el.setAttribute("id", `${key}-${sequenceMap[key]++}`);
  }

  return el.id;
}
