/**
 * 获取指定月份的天数
 * @param year
 * @param month
 */
const getMouseDayNum = (year: number, month: number): number => {
  const date = new Date(year, month, 0);
  return date.getDate();
};

/**
 * 获取下 relaNum个月的月份数
 * @param month
 * @param offsetMouth 可以是负数
 */
export const getMouthOffset = (year: number, month: number, offsetMouth: number) => {
  let _mouth = (month + 12 + (offsetMouth % 12)) % 12;
  _mouth = _mouth == 0 ? 12 : _mouth;

  const offsetYear = offsetMouth > 0 ? Math.floor(offsetMouth / 12) : Math.ceil(offsetMouth / 12);
  let _year = year + offsetYear;
  if ((offsetMouth % 12) + month >= 12) {
    _year++;
  }

  if ((offsetMouth % 12) + month <= 0) {
    _year--;
  }
  return [_year, _mouth];
};

/**
 * 获取这个月第一天是周几
 * @param year
 * @param month
 */
const getMouseDayOneWeek = (year: number, month: number) => {
  const day = new Date(`${year}, ${month}, 1`).getDay();
  return day === 0 ? 7 : day;
};

/**
 * 将一维日期数组 转换成 6*7
 * @param arr
 */
const formatDateArr = (arr: number[], splitNum = 7) => {
  const result = [];
  for (let i = 0; i < arr.length; i += splitNum) {
    result.push(arr.slice(i, i + splitNum));
  }
  return result;
};

/**
 * 获取要渲染的某个月份
 * 动画上下切页需要，所以需要算三个月的
 * @param month
 * @param relaNum
 */
export const getRenderDay = (year: number, month: number): number[][][] => {
  // 初始化
  const renderDays: number[][] = new Array(7 * 6);
  let tempDay: number = 1;
  let i = 0;

  const [prevMouthYear, prevMouthMouth] = getMouthOffset(year, month, -1);
  const [nextMouthYear, nextMouthMouth] = getMouthOffset(year, month, 1);

  // 上上一个月有多少天
  // 上一个月有多少天
  const prevMouseNum = getMouseDayNum(prevMouthYear, prevMouthMouth);
  // 当前月的天数
  const currentMouthNum = getMouseDayNum(year, month);

  // -----------------上一个月的结尾---------------------
  // 这个月周一星期几
  const mouthDayOneWeekNum = getMouseDayOneWeek(year, month);
  while (i < mouthDayOneWeekNum - 1) {
    renderDays[i++] = [prevMouthYear, prevMouthMouth, prevMouseNum - mouthDayOneWeekNum + tempDay++ + 1];
  }

  // ------------------渲染这个月的--------------------
  tempDay = 1;
  // 这个月份 比如1-31日
  while (tempDay <= currentMouthNum) {
    renderDays[i++] = [year, month, tempDay++];
  }

  // ------------------渲染下一个月开头---------------------
  tempDay = 1;
  while (i < 7 * 6) {
    renderDays[i++] = [nextMouthYear, nextMouthMouth, tempDay++];
  }

  return formatDateArr(renderDays as [], 7);
};

/**
 * 获取要渲染的某个月份 1-12月， 以及下一年的1-4月
 * @param month
 * @param relaNum
 */
export const getRenderMouth = (year: number): number[][][] => {
  const renderMouth: number[][] = [];
  for (let i = 0; i < 12; i++) {
    renderMouth.push([year, i + 1]);
  }
  for (let i = 0; i < 4; i++) {
    renderMouth.push([year + 1, i + 1]);
  }
  return formatDateArr(renderMouth as [], 4);
};

export const getDecadeRange = (year: number) => {
  const startDecade = Math.floor(year / 10);
  const endDecade = startDecade + 1;
  return [startDecade * 10, endDecade * 10 - 1];
};

/**
 *
 * @param decade
 */
export const getRenderYear = (decade: number[]) => {
  const renderYears = [];
  const [startDecade, endDecade] = decade;
  let start = 0;
  let end = 0;
  if ((startDecade / 10) % 2 === 0) {
    start = startDecade - 3;
    end = endDecade + 3;
  } else {
    start = startDecade - 6;
    end = endDecade + 2;
  }
  for (let i = start; i <= end; i++) {
    renderYears.push(i);
  }
  return formatDateArr(renderYears, 4);
};

export const TranslateClass = 'TranslateAni';
