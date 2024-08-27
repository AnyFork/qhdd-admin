<template>
    <n-upload :show-file-list="false" action="/apis/upload/file" :data="{ groupId: currentGroupId as unknown as string }" :on-finish="finish" :on-before-upload="beforeUpload" :headers="{ satoken: token?.tokenValue }">
        <n-button type="primary">
            {{ text }}
            <template #icon>
                <Icon icon="ci:cloud-upload" />
            </template>
        </n-button>
    </n-upload>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { UploadFileInfo } from 'naive-ui'
const { storeInfoFrom } = useStoreInfo()
const message = useMessage()
const currentGroupId = defineModel<number>('currentGroupId', { required: true })
const { text = '上传' } = defineProps<{ text?: string }>()
const emit = defineEmits<{ refresh: [] }>()
const token = ref()
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
const finish = ({ event }: { event?: ProgressEvent }) => {
    const result = event?.currentTarget as any
    const response = result.response ? JSON.parse(result.response) : ''
    if (response) {
        if (response.code == 200) {
            message.success('上传成功!')
            emit('refresh')
        } else {
            message.error(response.msg)
        }
    } else {
        message.error('文件上传异常!')
    }
}
onMounted(() => {
    const tokenInfo = storeInfoFrom.value == 1 ? getPlatformToken() : getStoreToken()
    token.value = tokenInfo ? JSON.parse(tokenInfo) : undefined
})
</script>
