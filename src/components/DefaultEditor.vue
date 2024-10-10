<template>
    <div style="border: 1px solid #ccc; width: 100%">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
        <Editor v-model="text" :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" @onMaxLength="onMaxLength" :style="{ height: height + 'px' }" />
    </div>
</template>
<script setup lang="ts">
//@ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor'
const { storeInfoFrom } = useStoreInfo()
const message = useMessage()
const text = defineModel<string>()
const { config = {} } = defineProps<{ config?: defaultEditor }>()
// 参数赋默认值
const { height = 500, disabled = false, count = 10000, link = true, webImgUrl = true, uploadLocalImg = true, uploadWebVideo = true, localImgType = ['image/*'], localImgSize = 1 } = config
// 计算需要排查的菜单key
const excludeKeys = computed(() => {
    const keys: string[] = ['fullScreen', 'uploadVideo']
    // 禁止上传链接
    if (!link) {
        keys.push('insertLink')
    }
    // 禁止上传本地图片
    if (!uploadLocalImg) {
        keys.push('uploadImage')
    }
    // 禁止上传网络图片地址
    if (!webImgUrl) {
        keys.push('insertImage')
    }
    // 禁止上传网络video地址
    if (!uploadWebVideo) {
        keys.push('insertVideo')
    }
    return keys
})
/**
 * 获取token
 */
const getToken = () => {
    let token = undefined
    if (storeInfoFrom.value == 1) {
        token = getPlatformToken()
    }
    if (storeInfoFrom.value == 2) {
        token = getStoreToken()
    }
    if (storeInfoFrom.value == 3) {
        token = getChainToken()
    }
    if (token) {
        const tokenObj = JSON.parse(token)
        return tokenObj.tokenValue
    } else {
        return undefined
    }
}
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>()
// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
    // 排除上传视频功能
    excludeKeys: excludeKeys.value
}
// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入回复内容',
    MENU_CONF: {
        // 上传图片,详细配置参考：https://www.wangeditor.com/v5/menu-config.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%9C%B0%E5%9D%80
        uploadImage: {
            // 服务端地址
            server: `${import.meta.env.VITE_BASIC_API_URL + '/apis/upload/file'}`,
            // 超时时间，5s
            timeout: 5 * 1000,
            // 上传时文件入参名称
            fieldName: 'file',
            headers: { Accept: '*', satoken: getToken() },
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: localImgType,
            // 单个文件的最大体积限制，默认为 1M
            maxFileSize: localImgSize * 1024 * 1024,
            // 上传之前触发
            onBeforeUpload: (file: File) => {
                // 对上传的文件进行格式校验
                console.log(file)
                return file
            },
            // 自定义上传，上传成功后，用户自定义插入文件
            // eslint-disable-next-line @typescript-eslint/ban-types
            customInsert(res: any, insertFn: Function) {
                if (res.code === 200) {
                    const url = res.data || {}
                    if (!url) throw new Error('url is empty')
                    // 插入附件到编辑器
                    insertFn(url, url, url)
                } else {
                    message.error(res.msg)
                    console.error('onError', res)
                }
            }
        }
    }
}
// 文本长度
editorConfig.maxLength = count

// 当达到 maxlength 限制时，触发该回调函数
const onMaxLength = (_editor: IDomEditor): void => {
    message.warning('输入内容超过限制')
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: IDomEditor): void => {
    // 记录 editor 实例，重要！
    editorRef.value = editor
    // 禁用编辑器
    disabled ? editor.disable() : editor.enable()
}
</script>
