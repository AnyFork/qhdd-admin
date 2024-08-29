<template>
    <n-space align="center" justify="end" class="mb-2">
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getAgreementListInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :row-key="(rowData:order.comment) => `${rowData.id}`" :loading="loading" />
    <!--修改协议-->
    <UpdateAgreement v-if="editModal" v-model:open="editModal" :data="moduleValue" @refresh="getAgreementListInfo"></UpdateAgreement>
    <!--预览协议-->
    <PreviewAgreement v-if="previewModal" v-model:open="previewModal" :data="moduleValue"></PreviewAgreement>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getAgreementListInfo, tableData, loading, columns, editModal,previewModal, moduleValue } = useAgreement()

onMounted(async () => {
    getAgreementListInfo()
})
</script>
