interface Window {
  $loadingBar?: import('naive-ui').LoadingBarProviderInst
  $dialog?: import('naive-ui').DialogProviderInst
  $message?: import('naive-ui').MessageProviderInst
  $notification?: import('naive-ui').NotificationProviderInst
  _AMapSecurityConfig: {
    securityJsCode: string
  }
}

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void]
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string

/**
 * 当前登录用户类型 1 平台用户  2 商户 3 连锁店
 */
type loginType = 1 | 2 | 3

/**
 * 富文本编辑器组件参数类型
 */
interface defaultEditor {
  /**
   * 富文本组件高度，默认：500
   */
  height?: number
  /**
   * 文本字数限制,默认：10000
   */
  count?: number
  /**
   * 富文本是否禁用，默认false
   */
  disabled?: boolean
  /**
   * 是否允许插入链接，默认true
   */
  link?: boolean
  /**
   * 是否允许网络图片地址,默认true
   */
  webImgUrl?: boolean
  /**
   * 是否允许上传本地图片,默认true
   */
  uploadLocalImg?: boolean
  /**
   * 是否允许上传本地附件,默认true
   */
  uploadLocalFile?: boolean
  /**
   * 是否允许上传网络视频，默认true
   */
  uploadWebVideo?: boolean
  /**
   * 是否允许下载附件
   */
  downLoadFile?: boolean
  /**
   * 本地上传允许上传的格式,['image/*']
   */
  localImgType?: string[]
  /**
   * 本地上传允许附件的格式,['doc','docx','xlsx','xls','txt','zip']
   */
  localFileType?: string[]
  /**
   * 本地图片上传大小，默认：1M
   */
  localImgSize?: number
  /**
   * 本地附件上传大小，默认：5M
   */
  localFileSize?: number
}

