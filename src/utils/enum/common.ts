/** http请求头的content-type类型*/
export enum EnumContentType {
  json = 'application/json',
  formUrlencoded = 'application/x-www-form-urlencoded',
  formData = 'multipart/form-data'
}

/**
 * localStorage或sessionStorage缓存的key
*/
export enum EnumStorageKey {
  /** 
   * 主题颜色
   */
  'theme-color' = '__THEME_COLOR__',
  /**
   * 平台用户token
   */
  'platform-token' = '__PLATFORM-TOKEN__',
  /**
   * 连锁店token
   */
  'chain-token' = '__CHAIN-TOKEN__',
  /**
   * 商户token
   */
  'store-token' = '__STORE-TOKEN__',
  /** 
   * 平台用户信息
   */
  'platform-user-info' = '__PLATFORM_USER_INFO__',
  /**
   * 连锁店用户信息
   */
  'chain-user-info' = '__CHAIN_USER_INFO__',
  /** 
   * 商户信息
   */
  'store-user-info' = '__STORE_USER_INFO__',
  /** 
   * 多页签路由信息
   */
  'multi-tab-routes' = '__MULTI_TAB_ROUTES__',
  /**
   * 验证码key
   */
  'verifyCodeId' = '__VERIFY_CODE_ID__'
}


/** 数据类型 */
export enum EnumDataType {
  number = '[object Number]',
  string = '[object String]',
  boolean = '[object Boolean]',
  null = '[object Null]',
  undefined = '[object Undefined]',
  object = '[object Object]',
  array = '[object Array]',
  date = '[object Date]',
  regexp = '[object RegExp]',
  set = '[object Set]',
  map = '[object Map]',
  file = '[object File]'
}
