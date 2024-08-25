// 平台管理员登录
export const loginPlatformApi = '/AccAdmin/doLogin'
// 平台管理员注销
export const logOutPlatformApi = '/AccAdmin/doExit'


// 平台管理员列表
export const platformAdminListApi = '/admin/getList'
// 新增平台管理员用户
export const addPlatformAdminApi = '/admin/add'
// 修改平台管理员用户
export const updatePlatformAdminApi = '/admin/update'
// 删除平台管理员用户
export const deletePlatformAdminApi = '/admin/delete'


// 获取平台管理角色列表
export const platformRoleListApi = '/role/getList'


// 平台管理员登录日志
export const platformLoginLogApi = '/SpAdminLogin/getList'


// 平台商品分类导航树型数据
export const platformCategoryTreeApi = '/storeCategory/getTree'
// 创建子分类
export const addPlatformCategoryApi = '/storeCategory/add'
// 删除分类
export const removePlatformCategoryApi = '/storeCategory/delete'
// 修改分类
export const updatePlatformCategoryApi = '/storeCategory/update'
// 平台分类列表
export const storePlatformCategoryApi = '/storeCategory/getList'


// 图片分组列表
export const attachmentPlatformGroupListApi = '/attachmentGroup/getList'
// 添加附件分组
export const addPlatformAttachmentGroupApi = '/attachmentGroup/add'
// 删除分组
export const deletePlatformAttachmentGroupApi = '/attachmentGroup/delete'
// 修改分组
export const updatePlatformAttachmentGroupApi = '/attachmentGroup/update'


// 获取附件列表
export const attachmentPlatformListApi = '/attachment/getList'
// 修改附件名称
export const updatePlatformAttachmentInfoApi = '/attachment/update'
// 删除图片
export const deletePlatformAttachmentInfoApi = '/attachment/removeGroup'
// 批量删除图片
export const deletePlatformAttachmentBatchApi = '/attachment/removeGroupByIds'
// 批量移动图片分组
export const movePlatformAttachmentGroupApi = '/attachment/setGroupByIds'


// 商户列表
export const storeListPlatformApi = '/store/getList'
// 删除商户
export const removeStorePlatformApi = '/store/delete'
// 修改商户
export const updateStorePlatformApi = '/store/update'
// 创建商户
export const addStorePlatformApi = '/store/add'
// 批量修改商户状态
export const modifyStoreBatchPlatformApi = "/store/batchUpdate"


// 标签列表
export const categoryListPlatformApi = '/category/getList'
// 删除标签
export const deleteCategoryPlatformApi = '/category/delete'
// 创建标签
export const createCategoryPlatformApi = '	/category/add'
// 修改标签
export const modifyCategoryPlatformApi = '/category/update'


// 获取店员列表
export const getClerkPlatformApi = '/clerk/getList'
// 删除店员
export const removeClerkPlatformApi = '/clerk/delete'
// 修改店员
export const updateClerkPlatformApi = '/clerk/update'


// 获取配送员列表
export const getRiderListApi = "/deliveryer/getList"
// 修改配送员
export const updateRiderInfoApi = "/deliveryer/update"
// 删除配送员
export const removeRiderInfoApi = "/deliveryer/delete"


/**
 * 获取顾客评论
 */
export const getCommentListApi = "/orderComment/getList"
/**
 * 修改评论
 */
export const updateCommentApi = "/orderComment/update"
/**
 * 删除评论
 */
export const deleteCommentApi = "/orderComment/delete"


/**
 * 获取顾客列表信息
 */
export const getCustomerListApi = "/members/getList"
/**
 * 获取顾客地址
 */
export const getCustomerAddressListApi = "/address/getList"
/**
 * 广告位列表
 */
export const getAdvPositionListApi = "/adPosition/getList"
/**
 * 新增广告位
 */
export const addAdvPositionApi = "/adPosition/add"

/**
 * 获取广告列表
 */
export const getAdvListApi = "/ad/getList"
/**
 * 新增广告
 */
export const addAdvApi = "/ad/add"
/**
 * 更新广告
 */
export const updateAdvApi = "/ad/update"
/**
 * 删除广告
 */
export const deleteAdvApi = "/ad/delete"
/**
 * 删除广告位
 */
export const deleteAdvPositionApi = "/adPosition/delete"
/**
 * 获取商户活动
 */
export const getStoreActivityListApi = "/storeActivity/getList"
/**
 *  删除商户活动
 */
export const deleteStoreActivityApi = "/storeActivity/delete"
/**
 *  用户批量创建活动
 */
export const addActivityBatchInfoApi = "/storeActivity/addBatch"

/**
 * 查询所有订单信息
 */
export const searchAllOrdersInfoApi = "/order/getList"

/**
 * 平台回复催单
 */
export const replyRemindInfoApi = "/order/replyRemind"

/**
 * 平台修改订单信息
 */
export const updateOrderInfoApi = "/order/update"

/**
 * 平台打印订单
 */
export const printOderInfoApi = "/order/print"

/**
 * 平台取消订单
 */
export const cancelOrderInfoApi = "/order/cancel"

/**
 * 平台查询订单信息
 */
export const getOrderInfoByIdInfoApi = "/order/getById"

/**
 * 平台管理员接单
 */
export const handleOrderInfoApi = "/order/store/handle"

/**
 * 管理员通知配送员抢单
 */
export const notifyCollectInfoApi = "/order/store/notifyCollect"

/**
 * 通知商户接单
 */
export const noticeStoreOrderInfoApi = "/order/admin/notifyStoreHandle"

/**
 * 管理员调度骑手接单
 */
export const assignOrderInfoApi = "/order/deliver/assign"

/**
 * 管理员重新将订单列入待抢列表
 */
export const resetAssignOrderInfoApi = "/order/admin/toDeliveryWait"

/**
 * 管理员完成订单
 */
export const finishSendOrderInfoApi = "/order/deliver/finish"

/**
 * 管理员介入退单纠纷
 */
export const arbitratingOrderInfoApi = "/orderRefund/admin/arbitrating"

/**
 * 平台驳回退款申请
 */
export const overruleRefundInfoApi = "/orderRefund/admin/overrule"

/**
 * 平台同意退款
 */
export const agreeRefundInfoApi = "/orderRefund/store/agree"

/**
 * 平台拒绝退款
 */
export const rejectRefundInfoApi = "/orderRefund/store/reject"