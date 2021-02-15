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
export const getMouthOffset = (year: number, mouth: number, offsetMouth: number) => {
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
    const day = new Date(`${year}, ${mouth}, 1`).getDay()
    return day === 0 ? 7 : day
}

/**
 * 将一维日期数组 转换成 6*7 
 * @param arr 
 */
const formatDateArr = (arr: number[], splitNum = 7) => {
    const result = []
    for (let i = 0; i < arr.length; i += splitNum) {
        result.push(arr.slice(i, i + splitNum))
    }
    return result
}

/**
 * 获取要渲染的某个月份
 * 动画上下切页需要，所以需要算三个月的
 * @param mouth 
 * @param relaNum 
 */
export const getRenderDay = (year: number, mouth: number): number[][][] => {
    // 初始化
    const renderDays: number[][] = new Array(7 * 15)
    let tempDay: number = 1
    let i = 0

    const [prevPrevMouthYear, prevPrevMouthMouth] = getMouthOffset(year, mouth, -2)
    const [prevMouthYear, prevMouthMouth] = getMouthOffset(year, mouth, -1)
    const [nextMouthYear, nextMouthMouth] = getMouthOffset(year, mouth, 1)
    const [nextNextMouthYear, nextNextMouthMouth] = getMouthOffset(year, mouth, 2)

    // 上上一个月有多少天
    const prevPrevMouseNum = getMouseDayNum(prevPrevMouthYear, prevPrevMouthMouth)
    // 上一个月有多少天
    const prevMouseNum = getMouseDayNum(prevMouthYear, prevMouthMouth)
    // 当前月的天数
    const currentMouthNum = getMouseDayNum(year, mouth)
    // 下一个月的天数
    const nextMouthNum = getMouseDayNum(nextMouthYear, nextMouthMouth)

    // -----------------上上一个月的结尾---------------------
    // 这个月周一星期几
    const mouthDayOneWeekNum = getMouseDayOneWeek(prevMouthYear, prevMouthMouth)
    while (i < mouthDayOneWeekNum - 1) {
        renderDays[i++] = [prevPrevMouthYear, prevPrevMouthMouth, prevPrevMouseNum - mouthDayOneWeekNum + tempDay++ + 1]
    }

    // ------------------上一个月的-------------------
    tempDay = 1
    // 上个月份 比如1-31日
    while (tempDay <= prevMouseNum) {
        renderDays[i++] = [prevMouthYear, prevMouthMouth, tempDay++]
    }

    // ------------------渲染这个月的--------------------
    tempDay = 1
    // 这个月份 比如1-31日
    while (tempDay <= currentMouthNum) {
        renderDays[i++] = [year, mouth, tempDay++]
    }

    // ------------------渲染下一个月--------------------
    tempDay = 1
    // 下个月份 比如1-31日
    while (tempDay <= nextMouthNum) {
        renderDays[i++] = [nextMouthYear, nextMouthMouth, tempDay++]
    }

    // ------------------渲染下下一个月开头---------------------
    tempDay = 1
    while (i < 7 * 15) {
        renderDays[i++] = [nextNextMouthYear, nextNextMouthMouth, tempDay++]
    }
    return formatDateArr(renderDays as [], 7)
}


/**
 * 获取要渲染的某个月份 1-12月， 以及下一年的1-4月
 * @param mouth 
 * @param relaNum 
 */
export const getRenderMouth = (year: number): number[][][] => {
    const renderMouth: number[][] = []
    for (let i = 0; i < 12; i++) {
        renderMouth.push([year, i + 1])
    }
    // 下一年的四个月
    for (let i = 0; i < 4; i++) {
        renderMouth.push([year + 1, i + 1])
    }
    return formatDateArr(renderMouth as [], 4)
}


export const getDecadeRange = (year: number) => {
    const startDecade = Math.floor(year / 10)
    const endDecade = startDecade + 1
    return [startDecade * 10, endDecade * 10]
}

/**
 * 
 * @param decade 
 */
export const getRenderYear = (decade: number) => {
    const renderYears = []
    const [startDecade, endDecade] = getDecadeRange(decade)
    for (let i = startDecade - 3; i < endDecade + 3; i++) {
        renderYears.push(i)
    }
    return formatDateArr(renderYears, 4)
}