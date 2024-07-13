
interface StorageData {
  value: unknown
  expire: number | null
}

/** 
 * 默认缓存期限为7天
 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7


/**
 * 设置localStorage中key对应的值
 * @param key 
 * @param value 
 * @param expire 
 */
export function setLocal(key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME) {
  const storageData: StorageData = { value, expire: expire !== null ? new Date().getTime() + expire * 1000 : null }
  const json = encrypt(storageData)
  localStorage.setItem(key, json)
}

/**
 * 获取localStorage中key对应的值
 * @param key key
 * @returns 值
 */
export function getLocal<T>(key: string) {
  const json = localStorage.getItem(key)
  if (json) {
    let storageData: StorageData | null = null
    try {
      storageData = decrypt(json)
    } catch (e) {
      // 防止解析失败
      console.log(e)
    }
    if (storageData) {
      const { value, expire } = storageData
      // 在有效期内直接返回
      if (expire === null || expire >= Date.now()) {
        return value as T
      }
    }
    removeLocal(key)
    return null
  }
  return null
}

/**
 * 清除localStorage中的key和值
 */
export function removeLocal(key: string) {
  localStorage.removeItem(key)
}

/**
 * 清除localStorage中的所有值
 */
export function clearLocal() {
  localStorage.clear()
}
