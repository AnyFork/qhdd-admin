<template>
    <div v-if="errorStatus" class="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center bg-gray-200 z-50">
        <div class="text-center text-20px font-bold">授权参数不完整</div>
        <div class="text-center text-18px my-2">无法生成授权二维码</div>
    </div>
    <div v-else class="w-300px m-auto h-screen pt-20">
        <div class="text-26px font-bold text-center">
            <img src="/logo.jpg" alt="授权二维码" class="w-132px" />
        </div>
        <div class="mt-5">
            <div class="text-20px font-bold text-center">微信扫码授</div>
            <img :src="imgUrl" alt="授权二维码" class="w-full" />
        </div>
        <div class="text-center mt-20">
            <div>云喇叭校园配送-将获得以下权限</div>
            <div class="py-2">泉海点点送商品信息</div>
            <div>泉海点点送订单信息</div>
        </div>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import QRCode from 'qrcode'
const message = useMessage()
const route = useRoute()
console.log(route)
const errorStatus = ref(false)
const imgUrl = ref()
const paramsStr = ref()
/**
 * 动态生成二维码
 */
const generateQR = async () => {
    try {
        console.log(import.meta.env.VITE_AUTHO_QRCODE_URL + import.meta.env.VITE_BASE_URL + paramsStr.value)
        imgUrl.value = await QRCode.toDataURL(import.meta.env.VITE_AUTHO_QRCODE_URL + import.meta.env.VITE_BASE_URL + paramsStr.value, { with: 220, height: 220, errorCorrectionLevel: 'H' })
    } catch (err) {
        console.error(err)
    }
}
onMounted(() => {
    const routeParams = Object.keys(route.query)
    if (routeParams.includes('sign') && routeParams.includes('source') && routeParams.includes('state') && routeParams.includes('timestamp')) {
        const source = route.query['source']
        const state = route.query['state']
        const timestamp = route.query['timestamp']
        const sign = route.query['sign']
        paramsStr.value = `/auth?params=source-${source},state-${state},timestamp-${timestamp},sign-${sign}`
        generateQR()
    } else {
        message.error('授权参数不完整')
        errorStatus.value = true
    }
})
</script>
