/** 布局组件的名称 */
export enum EnumLayoutComponentName {
  basic = 'basic-layout',
  blank = 'blank-layout'
}

/** 布局模式 */
export enum EnumThemeLayoutMode {
  'vertical' = '左侧菜单模式',
  'horizontal' = '顶部菜单模式',
  'vertical-mix' = '左侧菜单混合模式',
  'horizontal-mix' = '顶部菜单混合模式'
}

/** 多页签风格 */
export enum EnumThemeTabMode {
  'chrome' = '谷歌风格',
  'button' = '按钮风格'
}

/** 水平模式的菜单位置 */
export enum EnumThemeHorizontalMenuPosition {
  'flex-start' = '居左',
  'center' = '居中',
  'flex-end' = '居右'
}

/** 过渡动画类型 */
export enum EnumThemeAnimateMode {
  'zoom-fade' = '渐变',
  'zoom-out' = '闪现',
  'fade-slide' = '滑动',
  'fade' = '消退',
  'fade-bottom' = '底部消退',
  'fade-scale' = '缩放消退'
}

/**
 * 活动类型
 */
export enum ActivityType {
  mallNewMember = "平台新用户首单立减",
  newMember = "门店新用户立减",
  discount = "满减优惠",
  grant = "下单满赠",
  deliveryFeeDiscount = "满减配送费"
}

/**
 * 活动类型
 */
export const ActivityStatus = {
  0: "已失效",
  1: "进行中",
  2: "待生效"
}


/**
 * 订单状态
 */
export const orderStatus = {
  1: '待确认',
  2: '已确认',
  3: '待配送',
  4: '配送中',
  5: '已完成',
  6: '已取消',
  7: '拼单中'
}
/**
* 退款状态
*/
export const orderRefundStatus = {
  1: "退款发起中",
  2: "退款处理中",
  3: "退款成功",
  4: "退款失败",
  6: "退款申请被驳回",
  7: "退款待审核",
  8: "退款纠纷处理中",
  9: "退款申请取消"
}

/**
* 店铺状态
*/
export const storeStatus = {
  0: "歇业中",
  2: "营业中",
}

