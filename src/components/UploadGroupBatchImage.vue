<template>
    <div class="flex h-34px">
        <a href="javascript:;" class="file flex">
            <div class="h-32px w-108px flex-row-center gap-1 text-#fff"><Icon icon="ci:cloud-upload" size="18px" color="#fff" />批量上传</div>
            <input type="file" accept="image/*" @change="uploadFiles" multiple />
        </a>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { platformAxios } from '@/utils/axios/platformAxios'
const tokenInfo = getPlatformToken()
const message = useMessage()
const emit = defineEmits<{ refresh: [] }>()

/**
 * 上传文件
 * @param event
 */
const uploadFiles = (event: any) => {
    const files = event.target.files as FileList
    if (files.length == 0) {
        message.error('请选择要上传的文件')
        return
    }
    if (files.length > 10) {
        message.error('最多只能上传10个文件')
        return
    }
    for (var i = 0; i < files.length; i++) {
        if (!/^image\/\w+$/i.test(files[i].type)) {
            message.error('请选择图片格式的文件')
            return
        }
        if (files[i].size > 1024 * 1024 * 5) {
            message.error('请选择单文件不超过5MB的图片')
            return
        }
    }
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
    }
    platformAxios
        .post('/upload/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                satoken: tokenInfo?.tokenValue
            }
        })
        .then((response) => {
            if (response.data && response.data.code == 200) {
                message.success('上传成功')
                emit('refresh')
            }
        })
        .catch((error) => {
            console.error(error)
        })
}
</script>
<style>
.file {
    position: relative;
    display: inline-block;
    background: #18a058;
    border: 1px solid #18a058;
    border-radius: 4px;
    overflow: hidden;
    text-decoration: none;
}
.file input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #37ce7e;
    border-color: #5dd695;
    text-decoration: none;
}
</style>
