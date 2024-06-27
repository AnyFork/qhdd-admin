import { getUserInfo } from '@/utils'
export const useInfo = () => {
    const currentUser = ref();
    onMounted(() => {
        const user = getUserInfo()
        currentUser.value = user
    })
    return { currentUser }
}