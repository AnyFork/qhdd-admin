import { useInstance, useRouterPush } from "@/composables";
import { clearSession, logOutApi, clearLocal } from '@/utils'
import { DialogReactive } from "naive-ui";
export const useLogOut = () => {
    const { $axios } = useInstance();
    const { routerPush } = useRouterPush()
    const message = useMessage()
    const logOut = () => {
        const dialog = window.$dialog?.warning({
            title: '系统温馨提示?',
            content: '您确定要退出系统吗?',
            positiveText: '确定',
            negativeText: '取消',
            loading: false,
            async onPositiveClick() {
                try {
                    await $axios.get(logOutApi)
                    //清除本地localStorage中的数据
                    clearSession()
                    clearLocal()
                    routerPush('/login')
                } catch (err: any) {
                    message.error(err.message)
                }

            }
        }) as DialogReactive
    }
    return { logOut }
}