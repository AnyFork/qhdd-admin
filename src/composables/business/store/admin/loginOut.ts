import { storeLogOut } from "@/service/store/system/login";

/**
 * 平台商户退出登录
 * @returns 
 */
export const useStoreLogOut = () => {
    const { routerReplace } = useRouterPush()
    const message = useMessage()
    const dialog = useDialog()
    const route = useRouteStore()
    const logOut = () => {
        dialog.warning({
            title: '系统温馨提示?',
            content: '您确定要退出系统吗?',
            positiveText: '确定',
            negativeText: '取消',
            loading: false,
            async onPositiveClick() {
                try {
                    await storeLogOut()
                    //清除本地localStorage中的数据
                    clearStoreAuthStorage()
                    sessionStorage.clear()
                    route.isInitAuthRoute = false
                    routerReplace('/login/store')
                } catch (err: any) {
                    message.error(err.message)
                }

            }
        })
    }
    return { logOut }
}