import { historyStatInfo, todayStatInfo } from "@/service/platform/order"

/**
 * 连锁店订单统计
 */
export const useStatOrder = () => {
    const message = useMessage()
    const loading = ref(false)

    /**
     * 今日订单信息统计
     */
    const todayStatData = ref<stat.todayDataStat>()

    /**
     * 今日订单信息统计
     */
    const historyStatData = ref<stat.todayDataStat>()

    /**
     * 连锁店名下所有店铺今日订单数据,当传sid查询具体店铺数据
     */
    const todayStat = async (sid?: number) => {
        try {
            loading.value = true
            const { data } = await todayStatInfo(sid)
            loading.value = false
            if (data.code == 200) {
                todayStatData.value = data.data
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
    * 连锁店名下所有店铺历史订单数据，当传sid查询具体店铺数据
    */
    const historyStat = async (statDayStart?: number, statDayEnd?: number, sid?: number,) => {
        try {
            loading.value = true
            const { data } = await historyStatInfo(sid, statDayStart, statDayEnd)
            loading.value = false
            if (data.code == 200) {
                historyStatData.value = data.data
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    return {
        loading, message, todayStat, todayStatData, historyStat, historyStatData
    }

}