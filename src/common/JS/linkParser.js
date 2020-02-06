
//Инфо для дальнейшей конфигурации.
//Массив принимает функции-парсеры ссылок.
//Функция принимает ссылку и объект с настроками.
//Функция не должна возвращать true, если данная сылка (ресурс) для нее не предназначены.
//Функция возвращает готовый для innerHtml вставки текст.
const parsers = [
  youtube
];


//Главная функция
const linkParser = (string, settings) => {
  let text = string;
  const div = document.createElement('div');
  div.innerHTML = text;
  const anchorsLength = div.getElementsByTagName('a').length;

  for (let i = 0; i < anchorsLength; i++) {
    const aElem = div.getElementsByTagName('a')[i];
    const outer = aElem.outerHTML;
    const link = aElem.innerHTML;

    for (let j = 0; j < parsers.length; j++) {
      //проходит по всем парсерам и ищет совпадение по обработке
      const result = (parsers[i](link, settings));

      if (result) {
        text = text.replace(`${outer}`, `${result}`);
        break
      }
    }
  }
  return text
};

export default linkParser;






//функция-парсер
function youtube (link, settings) {
  if (!/youtube\.com\/watch\?/.test(link)) return;

  const parser = (link) => {
    const {width, height} = settings;
    const match = link.match(/watch\?v=(\w{11})/);
    const src = `https://www.youtube.com/embed/${match[1]}`;

    return `<iframe width=${width} height=${height} src=${src} frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>`

  };

  return parser(link);
}



