<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form ref="formRef" :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="登录账号">
                <n-input v-model:value="searchForm.name" clearable placeholder="请输入登录账号" />
            </n-form-item>
            <n-form-item label="登录IP">
                <n-input v-model:value="searchForm.loginIp" clearable placeholder="请输入登录IP" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="logList">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="logList"></TableHeaderOperation>
    </n-space>
    <!-- 登录日志记录数据表格-->
    <n-data-table
        :striped="striped"
        remote
        :size="size"
        :min-height="tableHeight"
        :max-height="tableHeight"
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :on-update:page="pageChange"
        :on-update:page-size="pageSizeChange"
        :row-key="(rowData:system.loginLog) => `${rowData.accId}`"
        :loading="loading"
    />
</template>
<script setup lang="ts">
import { useInstance } from '@/composables'
import { system } from '@/types/api';
import { loginLog } from '@/utils'
import { DataTableColumns, NAvatar } from 'naive-ui'
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const message = useMessage()
const { $axios } = useInstance()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 335)
const loading = ref(false)
const tableData = ref([])
//当前选中的page
const pageRef = ref(1)
//列数据
const columns = ref<DataTableColumns<system.loginLog>>([
    {
        title: '序号',
        key: 'key',
        width: 70,
        render: (rowData: any, index: number) => {
            return `${(pageRef.value - 1) * pagination.pageSize + index + 1}`
        },
        align: 'center'
    },
    {
        title: '登录账号',
        width: 120,
        key: 'spAdminName',
        align: 'center'
    },
    {
        title: '用户图像',
        width: 100,
        key: 'spAdminAvatar',
        render(rowData: any) {
            return h(NAvatar, { src: rowData.spAdminAvatar, round: true }, {})
        },
        align: 'center'
    },
    {
        title: '登录IP',
        key: 'loginIp',
        align: 'center'
    },
    {
        title: '客户端标识',
        key: 'device',
        align: 'center'
    },
    {
        title: '所属系统',
        key: 'system',
        align: 'center'
    },
    {
        title: '登录地',
        key: 'address',
        align: 'center'
    },
    {
        title: '登录时间',
        width: 200,
        key: 'createTime',
        align: 'center'
    }
])
// 查询表单参数
const searchForm = reactive({
    name: '',
    loginIp: ''
})

/**
 * 分页数据配置
 */
const pagination = reactive({
    pageSize: 10,
    itemCount: 1,
    showSizePicker: true,
    pageSizes: [10, 15, 20, 25, 30],
    prefix({ itemCount }: any) {
        return `共${itemCount}条`
    }
})

/**
 * 当页码发生变化时
 * @param page
 */
const pageChange = async (page: number) => {
    pageRef.value = page
    await logList()
}
/**
 * 当pageSize发生变化时触发
 * @param pageSize
 */
const pageSizeChange = async (pageSize: number) => {
    pagination.pageSize = pageSize
    await logList()
}
/**
 * 获取数据列表
 */
const logList = async () => {
    loading.value = true
    const { data } = await $axios.post(
        loginLog,
        { pageNo: pageRef.value, pageSize: pagination.pageSize, ...searchForm },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
    loading.value = false
    if (data) {
        if (data.code == 200) {
            tableData.value = data.data
            pagination.itemCount = data.dataCount
        } else {
            message.error(data.msg)
        }
    }
}
onMounted(() => {
    logList()
})
</script>
