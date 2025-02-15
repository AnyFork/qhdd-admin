// 获取连锁店列表
export const getChainListApi = '/chain/getList'

// 绑定店员
export const bindStoreClerkApi = '/storeClerk/add'
// 修改绑定店员
export const updateBindStoreClerkApi = '/storeClerk/update'
// 解绑店员
export const removeStoreClerkApi = '/storeClerk/delete'
// 店员店铺关联列表
export const storeClerkListApi = '/storeClerk/getList'
// 修改店员账号状态
export const updateStoreAccountStatusApi = '/clerk/update'

// 通过店铺id获取店铺信息
export const getStoreInfoBySidApi = "/store/getById"
// 通过店铺id修改店铺信息
export const updateStoreInfoBySidApi = "/store/update"



// 店员查看商品分类
export const getGoodsCategoryListApi = "/goodsCategory/store/getList"
// 增加商品分类
export const addGoodsCategoryApi = "/goodsCategory/add"
// 修改商品分类
export const updateGoodsCategoryApi = "/goodsCategory/update"
// 删除商品分类
export const removeGoodsCategoryApi = "/goodsCategory/delete"


// 商品列表
export const goodsListApi = "/goods/store/getList"
// 新增商品
export const addGoodsApi = "/goods/add"
// 删除商品
export const removeGoodsApi = "/goods/delete"
// 更新商品
export const updateGoodsApi = "/goods/update"


// 打印机列表
export const printerListApi = "/printer/getList"
// 添加打印机
export const addPrinterApi = "/printer/add"
// 修改打印机
export const updatePrinterApi = "/printer/update"
// 删除打印机
export const removePrinterApi = "/printer/delete"


// 打印机打印日志
export const printerLogsApi = "/printLog/getList"



// 店员登录
export const storeLoginApi = "/accMerchant/login"
// 店员退出系统
export const storeLogOutApi = "/accMerchant/logout"

// 扫码登录
export const scanLoginApi = "/accMerchant/qrCodeLogin"
// 轮训获取用户信息，判断登录状态
export const getLoginUserApi = "/accMerchant/getLoginInfo"


/**
 * 商户参与的活动列表
 */
export const getStoreActivityListApi = "/storeActivity/store/getList"
/**
 * 创建活动
 */
export const addStoreActivityApi = "/storeActivity/add"
/**
 * 更新活动
 */
export const updateActivityApi = "/storeActivity/update"
/**
 * 删除活动
 */
export const deleteActivityApi = "/storeActivity/delete"

/**
 * 商户获取所有订单
 */
export const getAllOrderInfoApi = "/order/store/getList"

/**
 * 商户管理员接单
 */
export const handleOrderInfoApi = "/order/store/handle"

/**
 * 商户取消订单
 */
export const cancelOrderInfoApi = "/order/cancel"

/**
 * 商户打印订单
 */
export const printOderInfoApi = "/order/print"

/**
 *商家通知配送员抢单
 */
export const notifyCollectInfoApi = "/order/store/notifyCollect"

/**
 * 商户与顾客退款沟通
 */
export const chatWithRefundInfoApi = "/orderRefund/consult"

/**
 * 商户同意退款
 */
export const agreeRefundInfoApi = "/orderRefund/store/agree"

/**
 * 商户拒绝退款
 */
export const rejectRefundInfoApi = "/orderRefund/store/reject"

/**
 * 查询订单信息
 */
export const getOrderInfoByIdInfoApi = "/order/getById"

/**
 * 回复催单
 */
export const replyRemindInfoApi = "/order/replyRemind"

/**
 * 商户导出订单
 */
export const exportOrderInfoApi = "/stat/store/orderExport"

/**
 * 今日数据统计
 */
export const todayStatInfoApi = "/stat/store/todayDatas"

/**
 * 历史数据统计
 */
export const historyStatInfoApi = "/stat/store/histDatas"

/**
 * 商家商品销量列表
 */
export const sailedListInfoApi = "/goods/store/getSailedList"

/**
 * 商品销量导出
 */
export const sailedExportInfoApi = "/goods/store/sailedExport"