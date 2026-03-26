function index_default() {
  let timeout;
  let typeStr = "";
  return {
    getIndex: function(nodeList, char, timeoutLength) {
      typeStr = typeStr.concat(char);
      if (nodeList == null) return -1;
      const lowerTypeStr = typeStr.toLocaleLowerCase();
      let index = [...nodeList].findIndex((el) => el.textContent.toLocaleLowerCase().startsWith(lowerTypeStr));
      if (index === -1) {
        index = [...nodeList].findIndex((el) => el.textContent.toLocaleLowerCase().includes(lowerTypeStr));
      }
      timeout = setTimeout(() => {
        typeStr = "";
      }, timeoutLength);
      return index;
    },
    destroy: function() {
      clearTimeout(timeout);
    }
  };
}
export {
  index_default as default
};
