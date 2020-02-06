const scrollTo = {
  bottom: {
    element: (elem) => {
      const scrollHeight = elem.scrollHeight; //полная высота с учетом прокрутки и видимой части
      const height = elem.clientHeight; //высота видимой части

      elem.scrollTop = scrollHeight - height; //установка текущей прокрутки
    },
    document: () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      const height = document.documentElement.clientHeight;

      document.documentElement.scrollTop = scrollHeight - height;
    }
  },
  top: {
    element: (elem) => {
      elem.scrollTop = 0;
    }
  },
  document: () => {
    document.documentElement.scrollTop = 0;
  }
};


export default scrollTo;


