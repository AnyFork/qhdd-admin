<template>
    <n-upload action="/apis/upload/avatar" :default-file-list="filePreview" :on-finish="finish" directory-dnd :on-before-upload="beforeUpload" :on-remove="remove" list-type="image-card" :max="1" :headers="{ satoken: token?.tokenValue }">
        <n-upload-dragger class="flex-col-center">
            <Icon icon="icons8:upload-2" width="30" />
            <n-text style="font-size: 12px; color: #999">点击/拖拽</n-text>
        </n-upload-dragger>
    </n-upload>
</template>

<script setup lang="ts">
import { UploadFileInfo } from 'naive-ui'
import { Icon } from '@iconify/vue'
const { storeInfoFrom } = useStoreInfo()
const message = useMessage()
const token = ref()
const url = defineModel<string>('url', { default: '' })
//预览列表
const filePreview = computed<UploadFileInfo[]>(() => {
    return url.value
        ? [
              {
                  id: url.value,
                  name: url.value,
                  status: 'finished',
                  url: url.value
              }
          ]
        : []
})
//文件删除回调
const remove = (_options: { file: UploadFileInfo; fileList: Array<UploadFileInfo> }) => {
    return new Promise((resolve, reject) => {
        window.$dialog?.warning({
            title: '系统温馨提示?',
            content: '你确定要删除图片吗',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick() {
                resolve(true)
                //清空url
                url.value = ''
                message.info('图片已删除,请重新上传!')
                return true
            },
            onNegativeClick() {
                reject(false)
                return true
            }
        })
    })
}
//文件上传前回调
const beforeUpload = (options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
    //文件后缀只能是这五类
    const fileTypes = ['.jpg', '.png', '.jpeg', '.PNG', '.gif']
    //截取文件名的后缀
    const fileSuffix = options.file.fullPath?.substring(options.file.fullPath?.indexOf('.'))
    if (fileSuffix && fileTypes.includes(fileSuffix)) {
        return true
    } else {
        message.warning('只允许上传图片')
        return false
    }
}
/**
 * 上传成功回调
 * @param options
 */
const finish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
    const result = event?.currentTarget as any
    const response = result.response ? JSON.parse(result.response) : ''
    if (response) {
        if (response.code == 200) {
            message.success('上传成功!')
            file.url = response.data
            url.value = response.data
        } else {
            file.status = 'error'
            url.value = ''
            message.error(response.msg)
        }
    } else {
        message.error('文件上传异常!')
    }
}
onMounted(() => {
    let tokenInfo = undefined
    if (storeInfoFrom.value == 1) {
        tokenInfo = getPlatformToken()
    }
    if (storeInfoFrom.value == 2) {
        tokenInfo = getStoreToken()
    }
    if (storeInfoFrom.value == 3) {
        tokenInfo = getChainToken()
    }
    token.value = tokenInfo ? JSON.parse(tokenInfo) : undefined
    console.log(token.value, storeInfoFrom.value)
})
</script>
