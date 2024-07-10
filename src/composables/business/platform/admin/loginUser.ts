export const platformInfo = () => {
    const currentUser = ref();
    onMounted(() => {
        const user = getPlatformUserInfo()
        currentUser.value = user
    })
    return { currentUser }
}