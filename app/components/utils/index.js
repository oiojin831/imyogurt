export function groupedByName(data) {
  // data has to have column name "name"
  return data.reduce(function (newData, ele) {
    const { name, ...rest } = ele;
    newData[name] = newData[name] || [];
    newData[name].push(rest);
    return newData;
  }, {});
}
