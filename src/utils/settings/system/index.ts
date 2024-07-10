/**
 * @returns 项目信息
 */
export const useAppInfo = (): SystemInfo.AppInfo => {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env
  return { name, title, desc }
}