import { logOutChain } from "@/service/chain/system/login";

/**
 * 连锁店管理员退出登录
 * @returns 
 */
export const useChainLogOut = () => {
    const route = useRouteStore()
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
                    await logOutChain()
                    //清除本地localStorage中的数据
                    clearChainAuthStorage()
                    sessionStorage.clear()
                    route.isInitAuthRoute = false
                    router.replace('/login/chain')
                } catch (err: any) {
                    //@ts-ignore
                    window.$message.error(err.message)
                }
            }
        })
    }
    return { logOut }
}