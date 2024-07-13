<template>
    <div ref="tabRef" class="h-full" :class="[isChromeMode ? 'flex items-end' : 'flex items-center']">
        <PageTab
            v-for="(item, index) in tabArray"
            :key="item.fullPath"
            :mode="theme.tab.mode"
            :active="tab.activeTab === item.fullPath"
            :active-color="theme.themeColor"
            :closable="item.name !== tab.homeTab.name"
            :dark-mode="theme.darkMode"
            :class="{ '!mr-0': isChromeMode && index === tabArray.length - 1, 'mr-10px': !isChromeMode }"
            @click="tab.handleClickTab(item.fullPath)"
            @close="tab.removeTab(item.fullPath)"
            @contextmenu="handleContextMenu($event, item.fullPath)"
        >
            <Icon v-if="item.meta.icon" :icon="item.meta.icon as string" class="inline-block align-text-bottom mr-4px text-16px" />
            {{ item.meta.title }}
        </PageTab>
    </div>
    <context-menu v-model:visible="dropdown.visible" :current-path="dropdown.currentPath" :x="dropdown.x" :y="dropdown.y" />
</template>

<script setup lang="ts">
import { PageTab } from '@soybeanjs/vue-materials'
import { Icon } from '@iconify/vue'
import '@soybeanjs/vue-materials/dist/style.css'

interface Emits {
    (e: 'scroll', clientX: number): void
}

const emit = defineEmits<Emits>()
const theme = useThemeStore()
const tab = useTabStore()
const { openPageUserType } = useLoginUser()
const isChromeMode = computed(() => theme.tab.mode === 'chrome')
const tabArray = ref<typeof tab.tabs>([])
// 获取当前激活的tab的clientX
const tabRef = ref<HTMLElement>()
async function getActiveTabClientX() {
    await nextTick()
    if (tabRef.value && tabRef.value.children.length && tabRef.value.children[tab.activeTabIndex]) {
        const activeTabElement = tabRef.value.children[tab.activeTabIndex]
        const { x, width } = activeTabElement.getBoundingClientRect()
        const clientX = x + width / 2
        setTimeout(() => {
            emit('scroll', clientX)
        }, 50)
    }
}

const dropdown = reactive({
    visible: false,
    x: 0,
    y: 0,
    currentPath: ''
})
function showDropdown() {
    dropdown.visible = true
}
function hideDropdown() {
    dropdown.visible = false
}
function setDropdown(x: number, y: number, currentPath: string) {
    Object.assign(dropdown, { x, y, currentPath })
}

/** 点击右键菜单 */
async function handleContextMenu(e: MouseEvent, fullPath: string) {
    e.preventDefault()
    const { clientX, clientY } = e
    hideDropdown()
    setDropdown(clientX, clientY, fullPath)
    await nextTick()
    showDropdown()
}

watch(
    () => tab.activeTabIndex,
    () => {
        getActiveTabClientX()
    },
    {
        immediate: true
    }
)
watch(
    () => tab.tabs,
    (_a, _b) => {
        if (openPageUserType.value) {
            tabArray.value = tab.tabs.filter((item) => item.fullPath.startsWith(('/' + openPageUserType.value) as string))
        } else {
            tabArray.value = tab.tabs
        }
    },
    { immediate: true }
)
</script>
