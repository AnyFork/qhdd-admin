/**
 * 活动类型
 */
export const activityTypeOptions = [
    {
        label: '平台新用户首单立减',
        value: 'mallNewMember'
    },
    {
        label: '门店新用户立减',
        value: 'newMember'
    },
    {
        label: '满减优惠',
        value: 'discount'
    },
    {
        label: '下单满赠',
        value: 'grant'
    },
    {
        label: '满减配送费',
        value: "deliveryFeeDiscount"
    }
]

/**
 * 订单状态
 */
export const orderStatusOption = [
    {
        label: '待确认',
        value: 1
    },
    {
        label: '已确认',
        value: 2
    },
    {
        label: '待配送',
        value: 3
    },
    {
        label: '配送中',
        value: 4
    },
    {
        label: '已完成',
        value: 5
    },
    {
        label: '已取消',
        value: 6
    }
]

/**
 * 订单支付状态
 */
export const orderPayStatusOption = [
    {
        label: '已支付',
        value: 1
    },
    {
        label: '未支付',
        value: 0
    }
]

/**
 * 订单类型
 */
export const orderTypeOption = [
    {
        label: '普通单',
        value: 1
    },
    {
        label: '预约单',
        value: 0
    }
]

/**
 * 顾客信息
 */
export const customerOption = [
    {
        label: '姓名',
        value: "username"
    },
    {
        label: '电话',
        value: "mobile"
    }
]

/**
 * 退款状态(0=默认无退款,1=退款发起中,2=退款处理中,3=退款成功,4=退款失败,6=退款申请被驳回,7=退款待审核,8=退款纠纷处理中,9=退款申请取消)
 */
export const refundOption = [
    {
        label: '退款发起中',
        value: 1
    },
    {
        label: '退款处理中',
        value: 2
    },
    {
        label: '退款成功',
        value: 3
    },
    {
        label: '退款失败',
        value: 4
    },
    {
        label: '退款申请被驳回',
        value: 6
    },
    {
        label: '退款待审核',
        value: 7
    },
    {
        label: '退款纠纷处理中',
        value: 8
    },
    {
        label: '退款申请取消',
        value: 9
    },
]

/**
 * 配送类型
 */
export const deliveryTypeOption = [
    {
        label: '堂食',
        value: 0
    },
    {
        label: '外卖',
        value: 2
    }
]