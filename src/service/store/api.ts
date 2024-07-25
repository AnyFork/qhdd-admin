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