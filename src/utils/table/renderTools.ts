import { Icon } from "@iconify/vue"
import { NTooltip } from "naive-ui"
import { VNode } from "vue"

/**
 * 图片预览地址
 */
export const previewUrl = import.meta.env.VITE_PREVIEW_IMG_PREVIEW


/**
 * 动态渲染tooltip
 * @param trigger 触发节点
 * @param content tooltip 文本
 * @returns 
 */
export const renderTooltip = (trigger: VNode, content: string) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content
    })
}
/**
 * 动态渲染可编辑标识的表格列title
 * @param title 列名称
 * @param content tooltip 文本
 * @returns 
 */
export const renderEditableTitle = (title: string, content: string) => {
    return renderTooltip(h(
        "div",
        {
            style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1px"
            }
        },
        {
            default: () => [
                h('span', {}, { default: () => title }),
                h(Icon, { icon: 'mingcute:edit-line' }, {})
            ]
        }
    ), content)
}