/**
 * 手机号码脱敏
 * @param phone 手机号码
 * @returns 
 */
export const phoneDesensitization = (phone: string) => {
    const reg = /^(\d{3})(\d{4})(\d{4})$/
    return phone.replace(reg, "$1****$3")
}