import { TreeOption } from "naive-ui";

const treeData: Array<TreeOption> = [{
    label: "全局搜索",
    key: "global-search",
    isLeaf: true
},
{
    label: "全球市场",
    key: "market",
    children: [
        {
            label: "全球股市行情",
            key: "market-global",
            children: [
                {
                    label: "亚洲股市",
                    key: "market_Asia",
                    isLeaf: true
                },
                {
                    label: "欧洲股市",
                    key: "market_Europe",
                    isLeaf: true
                },
                {
                    label: "美洲股市",
                    key: "market_America",
                    isLeaf: true
                },
                {
                    label: "澳洲股市",
                    key: "market_Australia",
                    isLeaf: true
                },
                {
                    label: "其他股市",
                    key: "market_Africa",
                    isLeaf: true
                }
            ]
        }
    ]
},
{
    label: "外汇",
    key: "forex",
    children: [
        {
            label: "主要货币分类",
            key: "forex-type",
            children: [
                {
                    label: "主要国家货币",
                    key: "forex_Main",
                    isLeaf: true
                },
                {
                    label: "次要货币",
                    key: "forex_Sub",
                    isLeaf: true
                },
                {
                    label: "交叉汇率",
                    key: "forex_Cross",
                    isLeaf: true
                },
                {
                    label: "加密货币",
                    key: "forex_Crypto",
                    isLeaf: true
                },
                {
                    label: "人民币",
                    key: "forex_Rmb",
                    isLeaf: true
                }
            ]
        }
    ]
},
{
    label: "商品期货",
    key: "commodities",
    children: [
        {
            label: "期货分类",
            key: "commodities-type",
            children: [
                {
                    label: "贵金属",
                    key: "commodities_Metals",
                    isLeaf: true
                },
                {
                    label: "农业",
                    key: "commodities_Agricultural",
                    isLeaf: true
                },
                {
                    label: "能源",
                    key: "commodities_Energy",
                    isLeaf: true
                },
                {
                    label: "指数",
                    key: "commodities_Index",
                    isLeaf: true
                },
                {
                    label: "产业",
                    key: "commodities_Industrial",
                    isLeaf: true
                },
                {
                    label: "家畜",
                    key: "commodities_Livestock",
                    isLeaf: true
                }
            ]

        }
    ]
},
{
    label: "债券",
    key: "bond",
    children: [
        {
            label: "美洲",
            key: "bond_America",
            isLeaf: true
        },
        {
            label: "亚洲",
            key: "bond_Asia",
            isLeaf: true
        },
        {
            label: "澳大利亚",
            key: "bond_Australia",
            isLeaf: true
        },
        {
            label: "欧洲",
            key: "bond_Europe",
            isLeaf: true
        },
        {
            label: "非洲",
            key: "bond_Africa",
            isLeaf: true
        }
    ]
},
{
    label: "数字货币",
    key: "crypto",
    isLeaf: true
},
{
    label: "宏观数据",
    key: "economic",
    children: [{
        label: "全球国家宏观数据",
        key: "economic_country",
        children: [{
            label: "美洲",
            key: "economic_country_America",
            isLeaf: true
        }, {
            label: "亚洲",
            key: "economic_country_Asia",
            isLeaf: true,
        }, {
            label: "澳洲",
            key: "economic_country_Australia",
            isLeaf: true,
        }, {
            label: "欧洲",
            key: "economic_country_Europe",
            isLeaf: true,
        }]
    },
    {
        label: "国家经济指标",
        key: "economic_main",
        children: [{
            label: "中国",
            key: "economic_china",
            isLeaf: true
        }, {
            label: "澳大利亚",
            key: "economic_Australia",
            isLeaf: true
        }, {
            label: "加拿大",
            key: "economic_Canada",
            isLeaf: true
        }, {
            label: "欧元区",
            key: "economic_Euro Area",
            isLeaf: true
        }, {
            label: "欧盟",
            key: "economic_European Union",
            isLeaf: true
        }, {
            label: "法国",
            key: "economic_France",
            isLeaf: true
        }, {
            label: "德国",
            key: "economic_Germany",
            isLeaf: true
        }, {
            label: "香港",
            key: "economic_Hong Kong",
            isLeaf: true
        }, {
            label: "印度",
            key: "economic_India",
            isLeaf: true
        }, {
            label: "意大利",
            key: "economic_Italy",
            isLeaf: true
        }, {
            label: "日本",
            key: "economic_Japan",
            isLeaf: true
        }, {
            label: "新西兰",
            key: "economic_New Zealand",
            isLeaf: true
        }, {
            label: "俄罗斯",
            key: "economic_Russia",
            isLeaf: true
        }, {
            label: "韩国",
            key: "economic_South Korea",
            isLeaf: true
        }, {
            label: "瑞典",
            key: "economic_Sweden",
            isLeaf: true
        }, {
            label: "台湾",
            key: "economic_Taiwan",
            isLeaf: true
        }, {
            label: "泰国",
            key: "economic_Thailand",
            isLeaf: true
        }, {
            label: "英国",
            key: "ecnocomic_United Kingdom",
            isLeaf: true
        }, {
            label: "美国",
            key: "economic_United States",
            isLeaf: true
        }]
    }, {
        label: "指标分类",
        key: "economic_indicator",
        children: [
            {
                label: "Business/商業",
                key: "economic_Business",
                isLeaf: true
            },
            {
                label: "Climate/氣候",
                key: "economic_Climate",
                isLeaf: true
            },
            {
                label: "Consumer/消費",
                key: "economic_Consumer",
                isLeaf: true
            },
            {
                label: "GDP/國內生產總值",
                key: "economic_GDP",
                isLeaf: true
            },
            {
                label: "Government/政府",
                key: "economic_Government",
                isLeaf: true
            },
            {
                label: "Housing/房地產",
                key: "economic_Housing",
                isLeaf: true
            },
            {
                label: "Labour/勞工",
                key: "economic_Labour",
                isLeaf: true
            },
            {
                label: "Markets/交易",
                key: "economic_Markets",
                isLeaf: true
            },
            {
                label: "Money/貨幣",
                key: "economic_Money",
                isLeaf: true
            },
            {
                label: "Prices/物價",
                key: "economic_Prices",
                isLeaf: true
            },
            {
                label: "Taxes/賦稅",
                key: "economic_Taxes",
                isLeaf: true
            },
            {
                label: "Trade/貿易",
                key: "economic_Trade",
                isLeaf: true
            }
        ]
    }]
},
{
    label: "工具",
    key: "tool",
    children: [{
        label: "汇率换算",
        key: "tool-currencyConverter",
        isLeaf: true
    }, {
        label: "货币代码表",
        key: "tool-currencyCode",
        isLeaf: true
    }, {
        label: "银行外汇牌阶",
        key: "tool-bank",
        isLeaf: true
    }, {
        label: "今日银行人民币兑换汇率对比",
        key: "tool-Rmb-rate",
        isLeaf: true
    }, {
        label: "普通账户点差",
        key: "tool-normalContrast",
        isLeaf: true
    }, {
        label: "ECN账户点差",
        key: "tool-ECNContrast",
        isLeaf: true
    }, {
        label: "隔夜利息",
        key: "tool-rollovers",
        isLeaf: true
    }]
},
{
    label: "利率",
    key: "bank-rate",
    isLeaf: true
}
]
export { treeData }