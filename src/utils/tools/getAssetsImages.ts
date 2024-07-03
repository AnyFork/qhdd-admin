/**
 * 根据图片名称动态导入assets/images 下面图片
 * @param imageUrl  图片路径
 * @returns 图片地址
 */
export const getAssetsImages = (imageUrl: string): string => {
    const path = `/src/assets/images/${imageUrl}`
    const modules: Record<string, any> = import.meta.glob("@/assets/images/**/*.{png,svg,jpg,jpeg}", { eager: true });
    return modules[path] ? modules[path].default : ''
}