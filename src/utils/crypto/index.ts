import CryptoJS from 'crypto-js'

const CryptoSecret = '__anyfork-admin-docs__'

/**
 * 加密数据
 * @param data - 数据
 */
export const encrypt = (data: any) => {
  const newData = JSON.stringify(data)
  return CryptoJS.AES.encrypt(newData, CryptoSecret).toString()
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  if (originalText) {
    return JSON.parse(originalText)
  }
  return null
}
