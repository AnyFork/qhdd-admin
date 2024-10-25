import { logOutPlatform } from "@/service/platform/system/login";

/**
 * 平台用户退出登录
 * @returns 
 */
export const usePlatformLogOut = () => {
    const router = useRouter()
    const logOut = () => {
        //@ts-ignore
        window.$dialog.warning({
            title: '系统温馨提示?',
            content: '您确定要退出系统吗?',
            positiveText: '确定',
            negativeText: '取消',
            loading: false,
            async onPositiveClick() {
                try {
                    await logOutPlatform()
                    //清除本地localStorage中的数据
                    clearPlatformAuthStorage()
                    sessionStorage.clear()
                    await router.replace('/login/platform')
                    window.location.reload()
                } catch (err: any) {
                    //@ts-ignore
                    window.$message.error(err.message)
                }
            }
        })
    }
    return { logOut }
}