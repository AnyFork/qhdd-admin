import { getPlatformSettingsList, updateSettingsInfo } from "@/service/platform/setting"

export const useSettings = () => {
    const configData = ref<setting.result>()
    const message = useMessage()
    const loading = ref(false)

    /**
     * 获取平台配置信息
     */
    const getPlatformSettings = async (module: setting.modules) => {
        try {
            loading.value = true
            console.log(module)
            const { data } = await getPlatformSettingsList(module)
            loading.value = false
            if (data.code == 200) {
                if (data.data && data.data.length > 0) {
                    configData.value = data.data[0] as setting.result
                }
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
     * 修改平台配置信息
     */
    const updateSettings = async (pramas: setting.result) => {
        try {
            loading.value = true
            const { data } = await updateSettingsInfo(pramas)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!')
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    return { configData, getPlatformSettings, message, loading, updateSettings }
}