<template>
    <div class="text-14rpx text-default flex gap-2">
        <div class="w-50px h-50px">
            <n-avatar size="small" round bordered :src="data.avatar" :fallback-src="getAssetsImages('empty-user.png')" class="w-50px h-50px bg-#fff" />
        </div>
        <div class="flex-1">
            <div class="flex-row-between relative">
                <img :src="getAssetsImages(`${data.status}.png`)" class="absolute top-30px right-100px" />
                <div class="flex-row-center gap-4">
                    <span>{{ isAdmin ? data?.mobile : phoneDesensitization(data?.mobile) }}</span>
                    <n-tag type="primary" size="small">{{ data?.store?.title }}</n-tag>
                </div>
                <div class="text-#999 text-12px">评论时间：{{ transformTimestampsToDateString(data?.addtime) }}</div>
            </div>
            <div class="flex-row-between py-1 text-12px">
                <div class="flex-row-center gap-4 text-#999">
                    <div class="flex-row-center">
                        <span>配送:</span>
                        <n-rate :default-value="data?.deliveryService" readonly size="small" class="mx-1 mt-[-2px]" />
                        <span class="text-#ffba00">{{ data?.deliveryService }}分</span>
                    </div>
                    <div class="flex-row-center">
                        <span>商品:</span>
                        <n-rate :default-value="data?.goodsQuality" readonly size="small" class="mx-1 mt-[-2px]" />
                        <span class="text-#ffba00">{{ data?.goodsQuality }}分</span>
                    </div>
                    <span>总分{{ data.score }}</span>
                    <div v-if="data?.deliveryer" class="flex-row-center">
                        <span class="pr-1">配送员:</span>
                        <span class="pr-1">{{ data?.deliveryer?.title }}</span>
                        <span>{{ data?.deliveryer?.mobile }}</span>
                    </div>
                </div>
                <n-tag type="primary" size="small" @click="emit('orderInfo', data.oid)">查看订单</n-tag>
            </div>
            <div class="flex-row-between py-1">
                <div class="flex-row-center gap-4 font-bold text-default">{{ data.note }}</div>
            </div>
            <div class="flex flex-wrap gap-2 py-1">
                <n-image width="100" :src="item" v-for="(item, index) in data.thumbArray" :key="index" />
            </div>
            <div v-if="data.goodsCommentList && data.goodsCommentList?.length > 0" class="flex py-1 text-12px text-#999">
                <span>订单内容：</span>
                <div v-for="(item, index) in data.goodsCommentList" :key="index">
                    <span>{{ item.titleDetail ? `${item.title}(${item.titleDetail})` : item.title }}</span>
                    <span v-if="index < data.goodsCommentList?.length - 1" class="pr-1">,</span>
                </div>
            </div>
            <div v-if="data.goodsCommentList && data.goodsCommentList?.length > 0" class="flex items-center flex-wrap gap-4 py-1 text-12px text-#999">
                <div v-for="(item, index) in data.goodsCommentList" :key="index">
                    <div v-if="item.commentGood != 0" class="flex items-center">
                        <Icon v-if="item.commentGood == 1" icon="solar:like-line-duotone" />
                        <Icon v-if="item.commentGood == -1" icon="mdi:dislike" />
                        <span>{{ item.titleDetail ? `${item.title}(${item.titleDetail})` : item.title }}</span>
                    </div>
                </div>
            </div>
            <div v-if="data.reply" class="p-1 my-1 text-12px text-#666 bg-#cccccc40 text-left">商家回复({{ transformTimestampsToDateString(data.replytime) }})：{{ data.reply }}</div>
            <div class="flex gap-2 py-1">
                <n-button type="primary" class="w-100px" @click="openModal('reply')"> 回复 </n-button>
                <n-button type="success" class="w-100px" @click="openModal('positive')"> 审核通过 </n-button>
                <n-button type="warning" class="w-100px" @click="openModal('negative')"> 审核不通过 </n-button>
                <n-button type="error" class="w-100px" @click="openModal('delete')"> 删除 </n-button>
            </div>
        </div>
    </div>
    <n-modal v-model:show="showModal" preset="dialog" title="温馨提示" positive-text="确认" negative-text="取消" @positive-click="submitCallback">
        <div>
            <div v-if="actions != 'reply'" class="text-12rpx text-default">{{ content }}</div>
            <n-input
                v-else
                v-model:value="reply"
                type="textarea"
                placeholder="请输入回复的内容!"
                maxlength="100"
                show-count
                :autosize="{
                    minRows: 3,
                    maxRows: 5
                }"
            />
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import { phoneDesensitization } from '@/utils/tools/tools'
import { transformTimestampsToDateString } from '@/utils/tools/date'
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
import { Icon } from '@iconify/vue'
const { isAdmin } = useLoginUser()
const { updateCommentInfo, deleteCommentInfo, message } = useComment()
const props = defineProps<{ data: order.comment }>()
const emit = defineEmits<{ refresh: []; orderInfo: [orderId: number] }>()
const showModal = ref(false)
const content = ref()
const actions = ref<'reply' | 'positive' | 'negative' | 'delete'>()
const reply = ref()
/**
 * 打开modal
 */
const openModal = (action: typeof actions.value) => {
    actions.value = action
    if (action == 'delete') {
        content.value = '您确认要删除该评论吗？'
    }
    if (action == 'positive') {
        content.value = '您确认要通过该评论吗？'
    }
    if (action == 'negative') {
        content.value = '您确认要不通过该评论吗？'
    }
    showModal.value = true
}

/**
 * 点击弹框确认按钮触发
 */
const submitCallback = async () => {
    if (actions.value == 'reply') {
        if (reply.value) {
            await updateCommentInfo({ id: props.data.id, reply: reply.value })
            emit('refresh')
        } else {
            message.error('请输入回复内容!')
        }
    }
    if (actions.value == 'delete') {
        await deleteCommentInfo(props.data.id)
        emit('refresh')
    }
    if (actions.value == 'positive') {
        await updateCommentInfo({ id: props.data.id, status: 1 })
        emit('refresh')
    }
    if (actions.value == 'negative') {
        await updateCommentInfo({ id: props.data.id, status: 2 })
        emit('refresh')
    }
}
</script>
