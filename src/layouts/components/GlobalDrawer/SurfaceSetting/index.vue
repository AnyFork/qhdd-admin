<template>
    <n-divider>界面功能设置</n-divider>
    <setting-Menu label="头部反转色">
        <n-switch v-model:value="theme.header.inverted" />
    </setting-Menu>
    <setting-Menu v-if="theme.layout.mode != 'horizontal'" label="侧边栏反转色">
        <n-switch v-model:value="theme.sider.inverted" />
    </setting-Menu>
    <setting-Menu label="底部反转色">
        <n-switch v-model:value="theme.footer.inverted" />
    </setting-Menu>
    <setting-Menu label="固定头部和多页签">
        <n-switch v-model:value="theme.header.fixedHeaderAndTab" />
    </setting-Menu>
    <setting-Menu label="固定底部">
        <n-switch v-model:value="theme.footer.fixed" />
    </setting-Menu>
    <setting-Menu label="头部高度">
        <n-input-number v-model:value="theme.header.height" :min="headerMin" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="底部高度">
        <n-input-number v-model:value="theme.footer.height" :min="footerMin" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="侧边栏展开宽度">
        <n-input-number v-model:value="theme.sider.width" :min="siderMin" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="侧边栏折叠宽度">
        <n-input-number v-model:value="theme.sider.collapsedWidth" :min="siderCollapsedMin" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="左侧混合侧边栏展开宽度">
        <n-input-number v-model:value="theme.sider.mixWidth" :min="mixWidth" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="左侧混合侧边栏折叠宽度">
        <n-input-number v-model:value="theme.sider.mixCollapsedWidth" :min="mixCollapsedWidth" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="左侧混合子菜单宽度">
        <n-input-number v-model:value="theme.sider.mixChildMenuWidth" :min="mixChildMenuWidth" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="多页签高度">
        <n-input-number v-model:value="theme.tab.height" :min="tabsHeight" size="small" style="width: 120px" />
    </setting-Menu>
    <setting-Menu label="多页签缓存">
        <n-switch v-model:value="theme.tab.isCache" />
    </setting-Menu>
    <setting-Menu label="灰色模式">
        <n-switch v-model:value="colorInvertMode" />
    </setting-Menu>
    <setting-Menu label="色弱模式">
        <n-switch v-model:value="weakMode" />
    </setting-Menu>
</template>

<script setup lang="ts">
defineOptions({ name: 'SurfaceSetting' })
const theme = useThemeStore()
const { colorInvertMode } = useColorInvert()
const { weakMode } = useColorWeak()
const headerMin = theme.header.height
const footerMin = theme.footer.height
const siderMin = theme.sider.width
const siderCollapsedMin = theme.sider.collapsedWidth
const mixCollapsedWidth = theme.sider.mixCollapsedWidth
const mixWidth = theme.sider.mixWidth
const mixChildMenuWidth = theme.sider.mixChildMenuWidth
const tabsHeight = theme.tab.height
</script>
