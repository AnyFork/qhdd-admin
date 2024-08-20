import { addStoreActivity, getStoreActivityList, updateActivity, deleteActivity } from "@/service/store/activity";

/**
 * 店铺营销活动
 */
export const useStoreActivity = () => {
    const app = useAppStore()
    const { startLoading, endLoading } = useLoading()
    /**
     * loading
     */
    const loading = ref(false)
    /**
     * message
     */
    const message = useMessage()

    /**
     * 活动数据
     */
    const activity = ref<store.activity[]>()

    /**
     * 获取商户参与的活动
     * @param params 
     */
    const getStoreActivityListInfo = async (params: Record<string, any>) => {
        try {
            loading.value = true
            const { data } = await getStoreActivityList(params)
            loading.value = false
            if (data.code == 200) {
                activity.value = data.data as store.activity[]
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message)
            console.log(e)
        }
    }

    /**
     * 创建商户活动
     * @param params 
     */
    const addStoreActivityInfo = async (params: Partial<store.activity>) => {
        try {
            loading.value = true
            const { data } = await addStoreActivity(params)
            loading.value = false
            if (data.code == 200) {
                message.success('创建成功!', {
                    onLeave() {
                        handleRefresh()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message)
            console.log(e)
        }
    }

    /**
    * 更新商户活动
    * @param params 
    */
    const updateActivityInfo = async (params: Partial<store.activity>) => {
        try {
            loading.value = true
            const { data } = await updateActivity(params)
            loading.value = false
            if (data.code == 200) {
                message.success('活动更新成功!', {
                    onLeave() {
                        handleRefresh()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message)
            console.log(e)
        }
    }
    /**
     * 删除商户活动
     * @param params 
     */
    const deleteActivityInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteActivity(id)
            loading.value = false
            if (data.code == 200) {
                message.success('活动删除成功', {
                    onLeave() {
                        handleRefresh()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message)
            console.log(e)
        }
    }
    /**
     * 刷新页面
     */
    const handleRefresh = () => {
        startLoading()
        app.reloadPage()
        setTimeout(() => {
            endLoading()
        }, 1000)
    }

    return { getStoreActivityListInfo, loading, activity, addStoreActivityInfo, message, updateActivityInfo, deleteActivityInfo }

}