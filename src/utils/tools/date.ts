
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
    return dayjs.unix(timestamp).format(format)
}