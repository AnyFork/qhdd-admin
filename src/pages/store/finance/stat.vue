<template>
    <div class="flex items-center text-18px font-600 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">今日经营数据</div>
    <n-grid x-gap="12" y-gap="12" :cols="5" class="my-2">
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">预计收入</div>
                <div>{{ todayStatData?.todayIncome || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">进行中订单收入</div>
                <div>{{ todayStatData?.goingIncome || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">退款金额</div>
                <div>{{ todayStatData?.refundAmount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">有效订单</div>
                <div>{{ todayStatData?.finishedCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">进行中订单</div>
                <div>{{ todayStatData?.goingCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">退款单数</div>
                <div>{{ todayStatData?.refundCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">营业额</div>
                <div>{{ todayStatData?.businessAmount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">新订单数量</div>
                <div>{{ todayStatData?.newCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">已取消单数</div>
                <div>{{ todayStatData?.cancleCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">退款中订单</div>
                <div>{{ todayStatData?.refundingCount || 0.0 }}</div>
            </div>
        </n-gi>
    </n-grid>
    <div class="flex items-center text-18px font-600 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">历史经营数据</div>
    <!-- 单选按钮 -->
    <div class="flex items-center gap-6 bg-#fff py-2 px-6">
        <div v-for="(item, index) in radios" :key="index">
            <span :class="item.checked ? 'bg-primary text-#fff' : ''" class="cursor-pointer py-2 px-4" @click="radioClick(item.key)">{{ item.text }}</span>
        </div>
        <n-date-picker v-if="radioKey == 4" v-model:value="range" value-format="yyyyMMdd" type="daterange" clearable :on-confirm="confirm" />
    </div>
    <n-grid x-gap="12" y-gap="12" :cols="5" class="my-2">
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">预计收入</div>
                <div>{{ historyStatData?.todayIncome || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">进行中订单收入</div>
                <div>{{ historyStatData?.goingIncome || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">退款金额</div>
                <div>{{ historyStatData?.refundAmount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">有效订单</div>
                <div>{{ historyStatData?.finishedCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">进行中订单</div>
                <div>{{ historyStatData?.goingCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">退款单数</div>
                <div>{{ historyStatData?.refundCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">营业额</div>
                <div>{{ historyStatData?.businessAmount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">新订单数量</div>
                <div>{{ historyStatData?.newCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">已取消单数</div>
                <div>{{ historyStatData?.cancleCount || 0.0 }}</div>
            </div>
        </n-gi>
        <n-gi class="border border-solid border-#f5f5f5 bg-#eeeeee54 rounded">
            <div class="h-108px py-2 px-4">
                <div class="py-4 text-16px font-700">退款中订单</div>
                <div>{{ historyStatData?.refundingCount || 0.0 }}</div>
            </div>
        </n-gi>
    </n-grid>
</template>

<script setup lang="ts">
const { todayStat, todayStatData, historyStat, historyStatData } = useStoreOrder()
const statDayStart = ref()
const statDayEnd = ref()
const range = ref<[number, number]>()
const radioKey = ref(1)
const radioLabel = ref('昨日')
const radios = ref([
    {
        text: '昨日',
        key: 1,
        checked: true
    },
    {
        text: '近7日',
        key: 2,
        checked: false
    },
    {
        text: '近30日',
        key: 3,
        checked: false
    },
    {
        text: '自定义',
        key: 4,
        checked: false
    }
])

/**
 * 单选按钮点击事件
 * @param name
 */
const radioClick = (name: number) => {
    radioKey.value = name
    radios.value.map((item) => {
        if (item.key === name) {
            item.checked = true
            radioLabel.value = item.text
        } else {
            item.checked = false
        }
    })
    if (name == 1) {
        statDayStart.value = transformTimestampsToDateString(Math.round(new Date().getTime() / 1000 - 24 * 60 * 60), 'YYYYMMDD')
        statDayEnd.value = transformTimestampsToDateString(Math.round(new Date().getTime() / 1000 - 24 * 60 * 60), 'YYYYMMDD')
        historyStat(statDayStart.value, statDayEnd.value)
    }
    if (name == 2) {
        statDayStart.value = transformTimestampsToDateString(Math.round(new Date().getTime() / 1000 - 24 * 60 * 60 * 7), 'YYYYMMDD')
        statDayEnd.value = transformTimestampsToDateString(Math.round(new Date().getTime() / 1000 - 24 * 60 * 60), 'YYYYMMDD')
        historyStat(statDayStart.value, statDayEnd.value)
    }
    if (name == 3) {
        statDayStart.value = transformTimestampsToDateString(Math.round(new Date().getTime() / 1000 - 24 * 60 * 60 * 30), 'YYYYMMDD')
        statDayEnd.value = transformTimestampsToDateString(Math.round(new Date().getTime() / 1000 - 24 * 60 * 60), 'YYYYMMDD')
        historyStat(statDayStart.value, statDayEnd.value)
    }
    if (name == 4) {
        statDayStart.value = undefined
        statDayEnd.value = undefined
    }
    console.log(statDayStart.value, statDayEnd.value)
}

/**
 * 时间选择框确认回调
 */
const confirm = (_value: number | [number, number] | null, formattedValue: [string, string] | null) => {
    if (formattedValue) {
        historyStat(Number(formattedValue[0]), Number(formattedValue[1]))
    }
}

onMounted(() => {
    todayStat()
    historyStat()
})
</script>
