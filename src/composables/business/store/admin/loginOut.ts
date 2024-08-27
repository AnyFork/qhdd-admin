import { storeLogOut } from "@/service/store/system/login";

/**
 * 平台商户退出登录
 * @returns 
 */
export const useStoreLogOut = () => {
    const route = useRouteStore()
    const router = useRouter()
    console.log(router)
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
                    await storeLogOut()
                    //清除本地localStorage中的数据
                    clearStoreAuthStorage()
                    sessionStorage.clear()
                    route.isInitAuthRoute = false
                    router.replace('/login/store')
                } catch (err: any) {
                    //@ts-ignore
                    window.$message.error(err.message)
                }
            }
        })
    }
    return { logOut }
}