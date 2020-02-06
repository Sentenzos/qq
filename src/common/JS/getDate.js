const getDate = (date) => {
  let datesArr = [date.getMinutes(), date.getHours(), date.getDate(), date.getMonth() + 1];

  datesArr = datesArr.map((number) => {
    return number < 10 ? `0${number}` : number;
  });

  return {
    getTime:`${datesArr[1]}:${datesArr[0]}`,
    getDay: datesArr[2],
    getMonth: datesArr[3],
    getFullYear: date.getFullYear(),
    getFullDate: `${datesArr[3]}.${datesArr[2]}.${date.getFullYear()}`
  }
};

export default getDate;