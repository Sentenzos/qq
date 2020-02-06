const replaceHtmlSymbols = (string) => {
  let str = string;

  let entityMap = {
    "&amp;": `&`,
    "&lt;": `<`,
    "&gt;": `>`,
    '&quot;': `"`,
    "&#39;": `'`,
    "&#x2F;": `/`,
    "&nbsp;": ` `
  };

  let keys = Object.keys(entityMap);
  let values = Object.values(entityMap);

  for (let i = 0; i < keys.length; i++) {
    let re = new RegExp(keys[i], 'g');
    str = str.replace(re, values[i]);
  }

  return str
};

export default replaceHtmlSymbols;