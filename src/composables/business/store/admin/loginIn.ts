import { useMessage } from "naive-ui";
import { getLoginUser, scanLogin } from "@/service/store/system/login";

/**
 * 平台商户登录系统
 * @returns 
 */
export const useStoreLogin = () => {
    const { loginUserType } = useLoginType()
    const message = useMessage();
    const { routerPush } = useRouterPush()
    const userInfo = reactive<{ clerkId: string }>({ clerkId: "1" });
    const imgSrc = ref()
    const intervalRef = ref()
    // 登录反馈状态 0 未登录 1 登录成功 2二维码过期
    const logInOk = ref<0 | 1 | 2>(0)
    // 登录反馈文本
    const loginBackText = ref()
    const { storeInfo, storeInfoFrom } = useStoreInfo()

    /**
     * 扫码登录
     */
    const scanLoginInfo = async () => {
        try {
            const result = await scanLogin()
            console.log(result)
            if (result.status == 200) {
                const scene = (result.headers as any).get("scene_store")
                imgSrc.value = (window.URL || window.webkitURL).createObjectURL(result.data)
                if (intervalRef.value) {
                    clearInterval(intervalRef.value)
                }
                intervalRef.value = setInterval(() => {
                    getLoginUserInfo(scene)
                }, 10000)
            }
        } catch (err: any) {
            message.error(err.message)
        }
    };
    /**
     * 刷新二维码
     */
    const refreshQRCode = async () => {
        logInOk.value = 0
        if (intervalRef.value) {
            clearInterval(intervalRef.value)
        }
        imgSrc.value = null
        await scanLoginInfo()
        message.success("小程序码已刷新!")
    }

    /**
     * 获取登录用户信息
     * @param key 二维码key
     */
    const getLoginUserInfo = async (key: string) => {
        try {
            const { data } = await getLoginUser(key)
            console.log(data)
            if (data.code == 200) {
                logInOk.value = 1
                loginBackText.value = "登录成功"
                if (intervalRef.value) {
                    clearInterval(intervalRef.value)
                }
                setStoreToken(JSON.stringify(data.data.tokenInfo))
                setStoreUserInfo(data.data.clerk)
                loginUserType.value = 2
                storeInfo.value = data.data.clerk?.store
                storeInfoFrom.value = 2
                message.success("登录成功!", {
                    duration: 3000,
                    onLeave: () => {
                        routerPush(import.meta.env.VITE_STORE_ROUTE_HOME_PATH)
                    }
                })
            } else if (data.code == 501) {
                logInOk.value = 2
                loginBackText.value = "二维码已过期，请点击刷新"
                if (intervalRef.value) {
                    clearInterval(intervalRef.value)
                }
            } else {
                logInOk.value = 0
            }
        } catch (err: any) {
            message.error(err.message)
        }
    }

    onUnmounted(() => {
        if (intervalRef.value) {
            clearInterval(intervalRef.value)
        }
    })
    return { userInfo, scanLoginInfo, imgSrc, logInOk, refreshQRCode, loginBackText }
}