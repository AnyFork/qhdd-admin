<template>
    <n-grid x-gap="10" class="border border-solid border-[#f5f5f5]">
        <n-grid-item span="4">
            <n-flex vertical class="p-2 border-r border-r-solid border-r-[#f5f5f5]">
                <n-button>
                    创建分组
                    <template #icon>
                        <Icon icon="ic:baseline-add" />
                    </template>
                </n-button>
                <n-tree block-line :data="data" :default-expanded-keys="defaultExpandedKeys" expand-on-click :node-props="nodeProps" />
            </n-flex>
        </n-grid-item>
        <n-grid-item span="20">右</n-grid-item>
    </n-grid>
</template>
<script setup lang="ts">
import { NButton, NPopover } from 'naive-ui'
import { Icon } from '@iconify/vue'
const folderIcon = h(Icon, { icon: 'fluent:folder-open-20-regular' })
const deleteIcon = h(NPopover, {}, { default: () => '删除', trigger: () => h(Icon, { icon: 'fluent:delete-48-regular' }) })
const editorIcon = h(NPopover, {}, { default: () => '编辑', trigger: () => h(Icon, { icon: 'basil:edit-outline', class: 'mr-1' }) })
const show = ref(false)
const message = useMessage()
const data = [
    {
        label: '全部',
        key: 'all',
        prefix: () => folderIcon
    },
    {
        label: '未分组',
        key: 'none',
        prefix: () => folderIcon,
        suffix: () => {
            return show.value ? [editorIcon, deleteIcon] : ''
        }
    }
]
const defaultExpandedKeys = ref(['40', '41'])
const nodeProps = ({ option }: { option: TreeOption }) => {
    return {
        onmouseover() {
            console.log(option)
            message.info('[hover] ' + option.label)
            show.value = true
        },
        onmouseout() {
            message.info('[leave] ' + option.label)
            option.suffix = () => []
            show.value = false
        },
        onClick() {
            message.info('[Click] ' + option.label)
        }
    }
}
</script>
