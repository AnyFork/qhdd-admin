import { encrypto, decrypto } from '../crypto'
/**
 * 设置session值
 * @param key 
 * @param value 
 */
export function setSession(key: string, value: unknown) {
  const json = encrypto(value)
  sessionStorage.setItem(key, json)
}
/**
 * 获取session中的值
 * @param key 
 * @returns 
 */
export function getSession<T>(key: string) {
  const json = sessionStorage.getItem(key)
  let data: T | null = null
  if (json) {
    try {
      data = decrypto(json)
    } catch (e) {
      // 防止解析失败
      console.log(e)
    }
  }
  return data
}

/**
 * 清除sessionStorage的key
 * @param key key
 */
export function removeSession(key: string) {
  window.sessionStorage.removeItem(key)
}

/**
 * 清除sessionStorage
 */
export function clearSession() {
  window.sessionStorage.clear()
}
