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

// 店员登录
export const storeLoginApi = "/accMerchant/login"
// 店员退出系统
export const storeLogOutApi = "/accMerchant/logout"