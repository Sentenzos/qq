const updateObjValuesInArr = (itemsArr, itemKey, keyForCompare, arrOfObjForChange) => {
  return itemsArr.map((item) => {
    if (item[itemKey] === keyForCompare) {
      let result = {...item};

      arrOfObjForChange.forEach((objForChange) => {
        let [keyForChange] = Object.keys(objForChange);
        let [newKeyValue] = Object.values(objForChange);
        result[keyForChange] = newKeyValue;
      });
      return result;
    }
    return item
  })
};

export default updateObjValuesInArr;

