import { logOutPlatform } from "@/service/platform/system/login";

/**
 * 平台用户退出登录
 * @returns 
 */
export const usePlatformLogOut = () => {
    const { routerPush } = useRouterPush()
    const message = useMessage()
    const dialog = useDialog()
    const logOut = () => {
        dialog.warning({
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
                    routerPush('/login/platform')
                } catch (err: any) {
                    message.error(err.message)
                }

            }
        })
    }
    return { logOut }
}