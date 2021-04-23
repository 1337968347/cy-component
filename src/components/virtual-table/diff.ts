import { DimensionType } from './interface';
export const createDiff = <T>() => {
  let nowData: T[] = [];

  const diff = (newData: T[], key: DimensionType) => {
    // 只diff比较数组长度相同的
    if (nowData.length === newData.length) {
      const diffedData: T[] = new Array(newData.length);
      const markClearMap = {};
      nowData.map((item, index) => {
        markClearMap[item[key]] = index;
      });

      const diffToAdd = [];
      newData.map(item => {
        const keyIndex = markClearMap[item[key]];
        // 如果上次数组里有这个数据， 就放到上次的位置上
        if (keyIndex !== undefined) {
          diffedData[keyIndex] = item;
          delete markClearMap[item[key]];
        } else {
          diffToAdd.push(item);
        }
      });
      const slotIndexs = Object.keys(markClearMap).map(key => markClearMap[key]);
      diffToAdd.map(item => {
        const slotI = slotIndexs.shift();
        diffedData[slotI] = item;
      });
      nowData = diffedData;
    } else {
      nowData = newData;
    }
    return nowData;
  };

  return {
    diff,
  };
};
