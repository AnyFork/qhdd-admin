/** seo格式类型 */
declare namespace Seo {
    /** seo的title信息 */
    interface title {
        cn: string
        en: string
        tw: string
    }
    /** seo的keywords信息 */
    interface keywords {
        cn: string
        en: string
        tw: string
    }
    /** seo的description信息 */
    interface description {
        cn: string
        en: string
        tw: string
    }
    /**名词解释 */
    interface definitions {
        cn?: string
        en?: string
        tw?: string
    }
}

/** 列表查询参数格式类型 */
interface query {
    pageNo: Number
    pageSize: Number
    module?: String
    symbol: String
    symbolCn: String,
    type: String
}
/**根据模块名称module和品种标识symbol获取详情的入参 */
interface detailParams {
    module: String
    symbol: String
}

/**新增或修改时入参类型 */
interface seoParams {
    module: String
    symbol: String,
    symbolCn: String,
    title: Seo.title | String
    keywords: Seo.keywords | String
    description: Seo.description | String
    definitions?: Seo.definitions | String
}