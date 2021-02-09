/**
 * 获取指定月份的天数
 * @param year 
 * @param mouth 
 */
const getMouseDayNum = (year: number, mouth: number): number => {
    const date = new Date(year, mouth, 0)
    return date.getDate()
}

/**
 * 获取下 relaNum个月的月份数 
 * @param mouth 
 * @param offsetMouth 可以是负数
 */
const getMouthOffset = (year: number, mouth: number, offsetMouth: number) => {
    let _mouth = (mouth + 12 + offsetMouth % 12) % 12
    _mouth = _mouth == 0 ? 12 : _mouth

    const offsetYear = offsetMouth > 0 ? Math.floor(offsetMouth / 12) : Math.ceil(offsetMouth / 12)
    let _year = year + offsetYear
    if (offsetMouth % 12 + mouth >= 12) {
        _year++
    }

    if (offsetMouth % 12 + mouth <= 0) {
        _year--
    }
    return [_year, _mouth]
}

/**
 * 获取这个月第一天是周几
 * @param year 
 * @param mouth 
 */
const getMouseDayOneWeek = (year: number, mouth: number) => {
    const day = new Date(year, mouth, 1).getDay()
    return day === 0 ? 7 : day
}

/**
 * 将一维日期数组 转换成 6*7 
 * @param arr 
 */
const formatDateArr = (arr: string[]) => {
    const result = []
    for (let i = 0; i < arr.length; i += 7) {
        result.push(arr.slice(i, i + 7))
    }
    return result
}

/**
 * 获取要渲染的日期
 * @param mouth 
 * @param relaNum 
 */
export const getRenderDate = (year: number, mouth: number): string[][] => {
    // 初始化
    const renderDate = new Array(6 * 7)

    // 当前月的天数
    const currentMouthNum = getMouseDayNum(year, mouth)

    // 第一行： 需要用上一个月的跟这个月的拼
    // 上一个月份的年份跟月份
    const [prevMouthYear, prevMouthMouth] = getMouthOffset(year, mouth, -1)
    // 上一个月有多少天
    const prevMouseNum = getMouseDayNum(prevMouthYear, prevMouthMouth)

    // 这个月周一星期几
    const mouthDayOneWeek = getMouseDayOneWeek(year, mouth)

    let tempDay = 1

    // 开始填充这个 6 * 7 的日历矩阵
    let i = 0
    while (i < mouthDayOneWeek - 1) {
        renderDate[i++] = `${prevMouthYear}-${prevMouthMouth}-${prevMouseNum - mouthDayOneWeek - 1 + i}`
    }

    // 这个月份 比如1-31日
    while (tempDay <= currentMouthNum) {
        renderDate[i++] = `${year}-${mouth}-${tempDay++}`
    }
    // 渲染下一个月
    tempDay = 1
    const [nextMouthYear, nextMouthMouth] = getMouthOffset(year, mouth, 1)
    while (i < 6 * 7) {
        renderDate[i++] = `${nextMouthYear}-${nextMouthMouth}-${tempDay++}`
    }

    return formatDateArr(renderDate)
}