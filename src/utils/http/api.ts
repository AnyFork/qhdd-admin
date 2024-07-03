// 用户登录
export const loginApi = '/AccAdmin/doLogin'
// 用户注销
export const logOutApi = '/AccAdmin/doExit'
// 用户登录日志
export const loginLog = '/SpAdminLogin/getList'
//用户列表
export const userList = '/admin/getList'
// 删除用户
export const deleteUser = '/admin/deleteByIds'
// 修改密码
export const updatePassword = '/admin/updatePassword'
// 获取角色列表
export const roleList = '/role/getList'
// 新增平台用户
export const addUser = '/admin/add'
// 修改平台用户
export const updateAdmin = '/admin/update'
// 删除平台用户
export const deleteAdmin = '/admin/delete'

// 图片分组列表
export const attachmentGroupList = '/attachmentGroup/getList'
// 添加附件分组
export const addAttachmentGroup = '/attachmentGroup/add'
// 删除分组
export const deleteAttachmentGroup = '/attachmentGroup/delete'
// 修改分组
export const updateAttachmentGroup = '/attachmentGroup/update'


// 获取附件列表
export const attachmentList = '/attachment/getList'
// 修改附件名称
export const updateAttachmentInfo = '/attachment/update'
// 删除图片
export const deleteAttachmentInfo = '/attachment/removeGroup'
// 批量删除图片
export const deleteAttachmentBatch = '/attachment/removeGroupByIds'
// 批量移动图片分组
export const moveAttachmentGroup = '/attachment/setGroupByIds'

// 平台商品分类导航树型数据
export const categoryTree = '/storeCategory/getTree'
// 创建子分类
export const addCategory = '/storeCategory/add'
// 删除分类
export const removeCategory = '/storeCategory/delete'
// 修改分类
export const updateCategory = '	/storeCategory/update'
