
import dayjs from 'dayjs'
dayjs.locale('zh-cn')
dayjs.locale()

/**
 * 时间戳转时间字符串
 * @param timestamp 
 * @param format 
 * @returns 
 */
export const transformTimestampsToDateString = (timestamp: number, format = "YYYY-MM-DD HH:mm:ss") => {
    return timestamp ? dayjs.unix(timestamp).format(format) : timestamp
}

/**
 * 时间戳转时间区间，例如当前时间搓，返回今天和明天时间，格式为：[1735920000000,1736006400000]
 * @returns 
 */
export const transformCurrentTimestampsToRange = (): [number, number] => {
    return [dayjs(dayjs().format('YYYY-MM-DD')).valueOf(), dayjs(dayjs().add(1, 'day').format('YYYY-MM-DD')).valueOf()]
}