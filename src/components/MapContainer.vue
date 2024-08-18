<template>
    <n-modal v-model:show="open" preset="card" title="选择坐标" :mask-closable="false" :close-on-esc="false" class="w-1080px">
        <div class="container">
            <div class="h-60px flex-row-between gap-2 px-4">
                <div class="flex-row-center gap-2">
                    <div class="w-90px">关键字查询：</div>
                    <input id="tipinput" class="w-200px h-30px border border-solid border-#ccc outline-none text-12px rounded px-2 text-#333639" placeholder="请输入关键词查询" />
                </div>
                <div class="flex-row-center gap-2">
                    <div class="w-80px">逆地理位置:</div>
                    <n-input v-model:value="address" disabled class="!w-300px" placeholder="经纬度解析地址"></n-input>
                </div>
                <div class="flex-row-center gap-2">
                    <div class="w-90px">坐标结果:</div>
                    <n-input v-model:value="location" disabled placeholder="经纬度地址"></n-input>
                </div>
            </div>
            <div id="map-container" class="map-container"></div>
            <div class="info" id="div">请用鼠标在地图上操作试试</div>
        </div>
        <template #footer>
            <div class="flex justify-end items-center gap-4">
                <n-button @click="open = false" class="!w-100px">关闭</n-button>
                <n-button type="primary" @click="copyLocation" class="!w-100px">确认</n-button>
            </div>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import axios from 'axios'
const open = defineModel<boolean>('show')
const { locationY = 116.397428, locationX = 39.90923 } = defineProps<{ locationY?: number; locationX?: number }>()
const emit = defineEmits<{ location: [{ locationY: number; locationX: number }] }>()
const map = ref()
const marker = ref()
const address = ref('')
const lng = ref(locationY)
const lat = ref(locationX)
const location = computed(() => lng.value + ',' + lat.value)
const AMap = ref()
/**
 * 初始化地图
 */
const initMap = async () => {
    try {
        window._AMapSecurityConfig = {
            securityJsCode: '9a87a4d8a033c1fff71b6f3b06b09768'
        }
        AMap.value = await AMapLoader.load({
            key: 'f085a29f63f9d47fde8042a2d9297fb9',
            version: '2.0',
            plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder', 'AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.CitySearch']
        })
        // 创建AMap实例
        map.value = new AMap.value.Map('map-container', {
            //默认使用 2D 模式
            viewMode: '2D',
            resizeEnable: true,
            zoom: 11
        })
        //输入提示
        const autoOptions = {
            input: 'tipinput'
        }
        const auto = new AMap.value.AutoComplete(autoOptions)
        //构造地点查询类
        const placeSearch = new AMap.value.PlaceSearch({ map: map.value })
        //注册监听，当选中某条记录时会触发
        auto.on('select', (e: { poi: { adcode: any; name: any } }) => {
            //关键字查询查询
            placeSearch.setCity(e.poi.adcode)
            placeSearch.search(e.poi.name)
        })
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.value.addControl(new AMap.value.Scale())
        //在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.value.addControl(new AMap.value.ToolBar())
        // 创建点标记
        marker.value = new AMap.value.Marker({
            icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            position: [lng.value, lat.value],
            offset: new AMap.value.Pixel(-25, -60)
        })
        // 设置地图中心和缩放级别
        map.value.setZoomAndCenter(13, [lng.value, lat.value])
        // 在地图上添加点标记
        map.value.add(marker.value)
        // 绑定地图事件
        bindEvent()
    } catch (e) {
        console.log(e)
    }
}
/**
 * 绑定地图点击事件
 * @param {*} e
 */
const handleMapClick = (e: { lnglat: { lng: number; lat: number } }) => {
    map.value.clearMap()
    marker.value = new AMap.value.Marker({
        icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: [e.lnglat.lng, e.lnglat.lat],
        offset: new AMap.value.Pixel(-25, -60)
    })
    const div = `您在 [ ${e.lnglat.lng},${e.lnglat.lat} ] 的位置单击了地图！`
    document.querySelector('#div')!.innerHTML = div
    map.value.add(marker.value)
    // 发送逆地理编码请求
    const location = `${e.lnglat.lng},${e.lnglat.lat}`
    lng.value = e.lnglat.lng
    lat.value = e.lnglat.lat
    reverseGeocode(location)
}
/**
 * 逆地址解析，通过经纬度获取详细地址信息
 * @param {*} location 经纬度
 */
const reverseGeocode = (location: string) => {
    const url = `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${location}&key=bb71dc5aa6fe6531a6468430d2af881f&radius=1000&extensions=base`
    axios.get(url).then((res) => {
        const result = res.data
        address.value = result.regeocode.formatted_address
    })
}
/**
 * 双击地图触发
 * @param {*} e
 */
const handleMapDblClick = (e: { lnglat: { lng: any; lat: any } }) => {
    // 处理地图双击事件
    const div = `您在 [ ${e.lnglat.lng},${e.lnglat.lat} ] 的位置双击了地图！`
    document.querySelector('#div')!.innerHTML = div
}
/**
 * 鼠标移动触发
 */
const handleMapMove = () => {
    const div = '您移动了您的鼠标！'
    document.querySelector('#div')!.innerHTML = div
}
/**
 * 绑定地图事件
 */
const bindEvent = () => {
    map.value.on('click', handleMapClick)
    map.value.on('dblclick', handleMapDblClick)
    map.value.on('mousemove', handleMapMove)
}
/**
 * 解绑地图事件
 */
const unbindEvent = () => {
    map.value.off('click', handleMapClick)
    map.value.off('dblclick', handleMapDblClick)
    map.value.off('mousemove', handleMapMove)
}
/**
 * 复制坐标
 */
const copyLocation = () => {
    emit('location', { locationY: lng.value, locationX: lat.value })
    open.value = false
}
onMounted(async () => {
    await initMap()
})
onUnmounted(() => {
    unbindEvent()
    map.value.destroy()
})
</script>

<style>
.container {
    position: relative;
    height: 500px;
    display: flex;
    flex-direction: column;
}
#map-container {
    flex: 1;
}

.info {
    padding: 10px;
    div-align: center;
    background-color: #f0f0f0;
}
.amap-sug-result {
    z-index: 10000 !important;
}
:deep(.amap-sug-result) {
    z-index: 10000 !important;
}
</style>
