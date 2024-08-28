<template>
    <n-grid x-gap="10" class="border border-solid border-[#f5f5f5]">
        <n-grid-item span="4">
            <n-flex vertical class="p-2 border-r border-r-solid border-r-[#f5f5f5]">
                <n-button @click="createGroup = true">
                    创建分组
                    <template #icon>
                        <Icon icon="ic:baseline-add" />
                    </template>
                </n-button>
                <n-spin :show="loading">
                    <n-scrollbar :style="{ height: boxHeight - 120 + 'px' }">
                        <n-tree block-line v-model:selected-keys="treeNode" :data="groupArray" :node-props="nodeProps" />
                    </n-scrollbar>
                </n-spin>
            </n-flex>
        </n-grid-item>
        <n-grid-item span="20">
            <n-flex class="p-2" justify="space-between">
                <div v-if="isAdmin" class="flex items-center gap-2">
                    <UploadGroupImage v-model:currentGroupId="currentGroupId" text="本地上传" @refresh="attachmentInfoList"></UploadGroupImage>
                    <UploadGroupBatchImage v-model:currentGroupId="currentGroupId" text="批量上传" btnType="success" @refresh="attachmentInfoList"></UploadGroupBatchImage>
                    <n-button v-if="currentGroupId != 0" type="error" @click="deleteBatch">
                        删除选中
                        <template #icon>
                            <Icon icon="fluent:delete-48-regular" />
                        </template>
                    </n-button>
                    <n-popselect v-model:value="moveGroup.value" :options="selectOption" scrollable trigger="click" :on-update:value="selectChange">
                        <n-button type="warning">
                            移动选中
                            <template #icon>
                                <Icon icon="mynaui:move" />
                            </template>
                        </n-button>
                    </n-popselect>
                    <n-button type="error" @click="removeChecked">
                        清除选中
                        <template #icon>
                            <Icon icon="ic:sharp-clear" />
                        </template>
                    </n-button>
                </div>
                <div class="flex items-center">
                    <n-input v-model:value="search" placeholder="输入名称进行搜索" clearable />
                    <n-button type="primary" @click="attachmentInfoList" :loading="loading">搜索 </n-button>
                </div>
            </n-flex>
            <div class="p-2">
                <n-spin size="large" description="Loading" :show="loading">
                    <n-scrollbar v-if="pictures.length > 0" :style="{ height: boxHeight - 120 + 'px' }">
                        <n-grid y-gap="35" x-gap="20" class="border border-solid border-[#f5f5f5] p-2">
                            <n-grid-item span="3" v-for="(item, index) in pictures" :key="'picture' + index" class="flex-col-center">
                                <div class="relative cursor-pointer flex-row-center w-[100px] h-[100px]" @click="checkItem(item)">
                                    <div v-show="item?.checked" class="absolute bg-[#99999980] w-[100px] h-[100px] flex-row-center">
                                        <Icon icon="lets-icons:check-ring" color="var(--primary-color)" :width="30" class="z-10" />
                                    </div>
                                    <div class="absolute top-1 right-1 flex-row-center">
                                        <n-dropdown trigger="hover" :options="options(item)" size="small" placement="bottom-start">
                                            <Icon icon="tdesign:setting" color="var(--primary-color)" :width="20" class="z-10" />
                                        </n-dropdown>
                                    </div>
                                    <img :src="item.url" class="rounded-[6px] w-[100px] h-[100px] border-1 border-solid border-[#f5f5f5]" />
                                </div>
                                <n-ellipsis style="width: 100px; text-align: center">
                                    {{ item.filename }}
                                </n-ellipsis>
                            </n-grid-item>
                        </n-grid>
                    </n-scrollbar>
                    <div v-else class="flex-row-center" :style="{ height: boxHeight - 120 + 'px' }">
                        <n-empty description="暂无数据"></n-empty>
                    </div>
                </n-spin>
            </div>
            <div class="p-2 flex items-center justify-end">
                <n-pagination v-model:page="pagination.page" v-model:page-size="pagination.pageSize" :item-count="pagination.itemCount" :on-update:page="changePage">
                    <template #prefix="{ itemCount }"> 共 {{ itemCount }} 项 </template>
                </n-pagination>
            </div>
        </n-grid-item>
    </n-grid>
    <!-- 创建分组 -->
    <CreateGroup v-if="createGroup" v-model:open="createGroup" @refresh="attachmentGroup"></CreateGroup>
    <!-- 修改分组 -->
    <ModifyGroup v-if="modifyGroup" v-model:open="modifyGroup" :node="modifyGroupNode!" @refresh="attachmentGroup"></ModifyGroup>
    <!-- 修改图片 -->
    <ModifyPicture v-if="modifyPicture" v-model:open="modifyPicture" :node="modifyPictureNode!" @refresh="attachmentInfoList"></ModifyPicture>
</template>
<script setup lang="ts">
const { isAdmin } = useLoginUser()
const {
    loading,
    attachmentGroup,
    removeChecked,
    groupArray,
    changePage,
    search,
    attachmentInfoList,
    pagination,
    pictures,
    nodeProps,
    options,
    Icon,
    modifyGroupNode,
    createGroup,
    modifyGroup,
    modifyPicture,
    modifyPictureNode,
    currentGroup,
    deleteBatch,
    checkItem,
    selectOption,
    moveGroup,
    selectChange
} = usePlatformPictureGroup()
const { height } = useWindowSize()
const boxHeight = computed(() => height.value - 200)
const treeNode = ref(['all'])
const currentGroupId = computed(() => currentGroup.value ?? 0)

onMounted(async () => {
    // 加载分组列表数据
    await attachmentGroup()
    // 默认加载全部分组下面的图片
    attachmentInfoList()
    const nodes = document.querySelectorAll('.n-tree-node-content')
    nodes.forEach((node: Element) => {
        //@ts-ignore
        node.addEventListener('mouseenter', (e: MouseEvent) => {
            console.log('mouseenter')
            //@ts-ignore
            const target = e.target.querySelector('.suffix_btn')
            if (target) {
                target.style.display = ''
            }
        })
        //@ts-ignore
        node.addEventListener('mouseleave', (e: MouseEvent) => {
            console.log('mouseleave')
            //@ts-ignore
            const target = e.target.querySelector('.suffix_btn')
            if (target) {
                target.style.display = 'none'
            }
        })
    })
})
</script>
