/**
 * 当前登录用户类型
 * @returns 
 */
export const useLoginType = () => {
    /**
     * 用户登录类型
     */
    const loginUserType = useLocalStorage<loginType>("loginType", 1);

    /**
     * 根节点path
     */
    const rootPath = computed(() => {
        if (loginUserType.value == 1) {
            return import.meta.env.VITE_PLATFORM_ROUTE_HOME_PATH
        } else if (loginUserType.value == 2) {
            return import.meta.env.VITE_STORE_ROUTE_HOME_PATH
        }
    })

    return { loginUserType, rootPath };
}