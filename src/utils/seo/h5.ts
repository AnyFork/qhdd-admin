import { TreeOption } from "naive-ui";

const h5TreeData: Array<TreeOption> = [{
    label: "全局搜索",
    key: "global-search",
    isLeaf: true
},
{
    label: "全球市场",
    key: "h5_market",
    children: [
        {
            label: "亚洲股市",
            key: "h5_market_Asia",
            isLeaf: true
        },
        {
            label: "欧洲股市",
            key: "h5_market_Europe",
            isLeaf: true
        },
        {
            label: "美洲股市",
            key: "h5_market_America",
            isLeaf: true
        },
        {
            label: "澳洲股市",
            key: "h5_market_Australia",
            isLeaf: true
        },
        {
            label: "其他股市",
            key: "h5_market_Africa",
            isLeaf: true
        }
    ]
},
{
    label: "外汇",
    key: "h5_forex_list",
    isLeaf: true
},
{
    label: "商品期货",
    key: "h5_commodities",
    children: [
        {
            label: "贵金属",
            key: "h5_commodities_Metals",
            isLeaf: true
        },
        {
            label: "农业",
            key: "h5_commodities_Agricultural",
            isLeaf: true
        },
        {
            label: "能源",
            key: "h5_commodities_Energy",
            isLeaf: true
        },
        {
            label: "指数",
            key: "h5_commodities_Index",
            isLeaf: true
        },
        {
            label: "产业",
            key: "h5_commodities_Industrial",
            isLeaf: true
        },
        {
            label: "家畜",
            key: "h5_commodities_Livestock",
            isLeaf: true
        }
    ]
},
{
    label: "债券",
    key: "h5_bond",
    children: [
        {
            label: "美洲",
            key: "h5_bond_America",
            isLeaf: true
        },
        {
            label: "亚洲",
            key: "h5_bond_Asia",
            isLeaf: true
        },
        {
            label: "澳大利亚",
            key: "h5_bond_Australia",
            isLeaf: true
        },
        {
            label: "欧洲",
            key: "h5_bond_Europe",
            isLeaf: true
        },
        {
            label: "非洲",
            key: "h5_bond_Africa",
            isLeaf: true
        }
    ]
},
{
    label: "人民币",
    key: "h5_rmb",
    children: [
        {
            label: "主要国家货币",
            key: "h5_forex_Main",
            isLeaf: true
        },
        {
            label: "次要货币",
            key: "h5_forex_Sub",
            isLeaf: true
        },
        {
            label: "交叉汇率",
            key: "h5_forex_Cross",
            isLeaf: true
        },
        {
            label: "加密货币",
            key: "h5_forex_Crypto",
            isLeaf: true
        },
        {
            label: "人民币",
            key: "h5_forex_Rmb",
            isLeaf: true
        }
    ]
},
{
    label: "数字货币",
    key: "h5_Crypto",
    isLeaf: true
},
{
    label: "工具",
    key: "h5_tool",
    children: [{
        label: "汇率换算",
        key: "h5_tool-currencyConverter",
        isLeaf: true
    }, {
        label: "货币代码表",
        key: "h5_tool-currencyCode",
        isLeaf: true
    }, {
        label: "银行外汇牌阶",
        key: "h5_tool-bank",
        isLeaf: true
    }, {
        label: "今日银行人民币兑换汇率对比",
        key: "h5_tool-Rmb-rate",
        isLeaf: true
    }, {
        label: "普通账户点差",
        key: "h5_tool-normalContrast",
        isLeaf: true
    }, {
        label: "ECN账户点差",
        key: "h5_tool-ECNContrast",
        isLeaf: true
    }, {
        label: "隔夜利息",
        key: "h5_tool-rollovers",
        isLeaf: true
    }]
},
{
    label: "国家银行利率",
    key: "h5_bank-rate",
    isLeaf: true
}
]
export { h5TreeData }