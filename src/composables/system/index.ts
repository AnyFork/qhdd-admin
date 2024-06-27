import UAParser from 'ua-parser-js'
/**
 * @returns 项目信息
 */
export const useAppInfo = (): SystemInfo.AppInfo => {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env
  return { name, title, desc }
}

/**
 * @returns 获取设备信息
 */
export const useDeviceInfo = (): UAParser.IResult => {
  const parser = new UAParser()
  return parser.getResult()
}
