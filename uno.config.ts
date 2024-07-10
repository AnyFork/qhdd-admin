import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
    presets: [presetAttributify(), presetUno()],
    transformers: [
        transformerDirectives(),
    ],
    // 设置shortcuts,只能使用预设的和自定义的规则
    shortcuts: {
        'wh-full': 'w-full h-full',
        'wh-screen': 'w-screen h-screen',
        'flex-row-center': 'flex justify-center items-center',
        'flex-row-between': 'flex justify-between items-center',
        'flex-row-around': 'flex justify-around items-center',
        'flex-row-evenly': 'flex justify-evenly items-center',
        'flex-row-warp': 'flex flex-wrap',
        'flex-row-end': 'flex justify-end items-center',
        'flex-col-center': 'flex flex-col justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        'i-flex-center': 'inline-flex justify-center items-center',
        'i-flex-x-center': 'inline-flex justify-center',
        'i-flex-y-center': 'inline-flex items-center'
    },
    // 自定义规则
    rules: [],
    // 主题配置
    theme: {
        // 继承boxShadow
        boxShadow: {
            box: '0 1px 8px 0 rgba(255, 0, 0, 0.1)',
            item: '0 1px 8px 0 rgba(0, 0, 0, 0.1)'
        },
        colors: {
            // 主题色
            primary: '#0093e1',
            // 文本色
            default: '#333'
        }
    }
})