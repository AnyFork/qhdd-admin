/**
 * 订单操作类型 replyRemind=回复催单 updateOrder=更改订单 printOrder=打印订单 cancelOrder=取消订单  orderInfo=订单详情 handleOrder=接单 noticeOrder=通知骑手抢单 noticeStoreOrder=通知店铺接单 
 * assignOrder=调度骑手接单 resetAssignOrder=重置订单待抢状态 assignOrderAgain=重新调度 finishOrder=完成订单 
 * arbitratingOrder=介入退单纠纷 overruleRefund=驳回申请 agreeRefund=同意退款 rejectRefund=拒绝退款
 */
type orderAction = 'replyRemind' | 'updateOrder' | 'printOrder' | 'cancelOrder' | 'orderInfo' | 'handleOrder' | 'noticeOrder' | 'noticeStoreOrder' | 'assignOrder' | 'resetAssignOrder' | 'assignOrderAgain' | 'finishOrder'
    | 'arbitratingOrder' | 'overruleRefund' | 'agreeRefund' | 'rejectRefund' | 'readyOk'

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
    /** 返回的token和刷新token */
    interface Token {
        token: string
        refreshToken: string
    }
    /** 返回的用户信息 */
    type UserInfo = Auth.UserInfo
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
    /** 后端返回的路由数据类型 */
    interface Route {
        /** 动态路由 */
        routes: AuthRoute.Route[]
        /** 路由首页对应的key */
        home: AuthRoute.RouteKey
    }
}

declare namespace ApiDemo {
    interface DataWithAdapter {
        dataId: string
        dataName: string
    }
}

/**
 * 平台管理模块命名空间
 */
declare namespace system {
    /**
     * 登录日志
     */
    interface loginLog {
        accId: number
        accToken: string
        address: string
        createTime: string
        device: string
        id: number
        loginIp: string
        spAdminAvatar: string
        spAdminName: string
        system: string
    }
    /**
     * 平台用户信息
     */
    interface adminInfo {
        /**
         * 管理员ID
         */
        id: number
        /**
         * 管理员名称
         */
        name: string
        /**
         * 用户图像
         */
        avatar: string
        /**
         * 用户密码
         */
        password: string
        /**
         * 电话号码
         */
        phone: string
        /**
         * 角色id
         */
        roleId: number
        /**
         * 账号状态（1=正常，2=禁用）
         */
        status: 1 | 2
        /**
         * 创建时间
         */
        createTime: string
        /**
         * 最后登录时间
         */
        loginTime?: string
        /**
         * 登录IP
         */
        loginIp?: string
        /**
         * 登录次数
         */
        loginCount: number
        /**
         * 角色名称
         */
        roleName: string
        /**
         * 新密码
         */
        newPassword: string
    }
    /**
    * 附件分组
    */
    interface attachmentGroup {
        /**
         * 分组id
         */
        id: number
        /**
        * 分组名称
        */
        name: string
        /**
          * 分组类型 0 平台 1 商户
          */
        type: 0 | 1
        /**
         * 所属用户id
         */
        uid: number
        /**
         * 平台id
         */
        uniacid: number
    }
    /**
     * 附件类型
     */
    interface attachment {
        /**
         * 代理ID
         */
        agentid: number
        /**
         * 文件url
         */
        attachment: string
        /**
         * 创建时间
         */
        createtime: number
        /**
         * 顺序
         */
        displayorder: number
        /**
         * 文件名称
         */
        filename: string
        /**
         * 分组id
         */
        groupId: number
        /**
         * 附件id
         */
        id: number
        /**
         * 上传目录
         */
        moduleUploadDir: string
        /**
         * 角色名称
         */
        role: string
        /**
         * 角色id
         */
        roleid: number
        /**
         * 商户门店ID
         */
        sid: number
        /**
         * 类型 0 平台 1商户，2顾客，3配送员
         */
        type: 0 | 1 | 2 | 3
        /**
         * 用户id
         */
        uid: number
        /**
         * 平台id
         */
        uniacid: number
        /**
         * 附件完整地址
         */
        url: string,
        /**
         * 是否选中
         */
        checked: boolean
    }
    /**
     * 平台导航分类
     */
    interface category {
        /**
         * 代理ID
         */
        agentid: number
        /**
         * 平台id
         */
        uniacid: number
        /**
         * 排序
         */
        displayorder: number
        /**
         * 分类id
         */
        id: number
        /**
         * 父分类id
         */
        parentid: number
        /**
         * 分类标题
         */
        title: string
        /**
         * 图标
         */
        thumb: string
        /**
         * 是否显示(1=显示,0=不显示) 
         */
        status: number
        /**
         * 类型(0=品类,1=区域,2=活动,5=商品)
         */
        type: 0 | 1 | 2 | 5
    }
    /**
     * 树形分类类型
     */
    interface rowData extends system.category {
        children?: rowData[]
    }

    /**
     * 广告位
     */
    interface advPosition {
        /**
         * 广告位id
         */
        id: number
        /**
         * 广告位标识
         */
        positionKey: string
        /**
         * 广告位名称
         */
        name: string
        /**
         * 创建时间
         */
        createTime: number
    }

    /**
     * 广告列表
     */
    interface adv {
        /**
         * id
         */
        id: number
        /**
         * 广告位置标识 
         */
        positionKey: string
        /**
         * 图片url
         */
        img: string
        /**
         * 广告类型 1 普通广告 2 弹框广告
         */
        link: "1" | "2"
        /**
         * 广告标题
         */
        title: string
        /**
         * 状态(1 = 上架, 2 = 下架) 
         */
        status: 0 | 1
        /**
         * 顺序
         */
        displayorder: number
        /**
         * 创建时间
         */
        createTime: number
        /**
         * 排序
         */
        sortType: number
        /**
         * 广告内容
         */
        content: string
        /**
         * 广告属性值
         */
        data: string
        /**
         * 广告属性对象
         */
        dataObject: {
            width: number,
            height: number,
            link: string,
            params?: string
        }
    }
}

/**
 * 商户模块命名空间
 */
declare namespace store {

    /**
     * 店铺信息来源，主要用户非平台情况下接口请求token采用方案，1 平台 2 商户 3 连锁店
     */
    type storeFrom = 1 | 2 | 3

    /**
     * 商户属性
     */
    interface storeData {
        /**
         * 商户id
         */
        id?: number
        /**
         * 商户logo
         */
        logo: string
        /**
         * 商户名称
         */
        title: string
        /**
         * 所属区域id
         */
        areaid: number
        /**
         * 状态(1=显示,0=不显示,4=回收站)
         */
        status: 0 | 1 | 4
        /**
         * 是否推荐(1=是,0=否)
         */
        isRecommend: 0 | 1
        /**
         * 知否置顶(1=是,0=否) 
         */
        isStick: 0 | 1
        /**
         * 销量
         */
        sailed: number
        /**
         * 排序
         */
        displayorder: number
        /**
         * 连锁店id
         */
        chainid: number
        /**
         * 入驻时间
         */
        addtime: number
        /**
         * 热度
         */
        click: number
        /**
         * 外卖营业状态(0=歇业中,1=休息中，2=营业中)，0和2为数据库中店铺实际状态，1为运行时状态，营业时间段外，商户未手动更改的状态为1时的状态视为休息中
         */
        businessStatus: 0 | 1 | 2
        /**
         * 连锁店名称
         */
        chainTitle: string,
        /**
         * 主营品类id
         */
        cateParentid1?: number
        /**
         * 所属片区id
         */
        cateParentid2?: number
        /**
         * 门店描述
         */
        description?: string
        /**
         * 门店电话
         */
        telephone?: string
        /**
         * 商户标签列表信息
         */
        categoryList?: category[]
        /**
         * 主营品类和区域分类
         */
        storeCategoryList?: system.category[],
        /**
         * 标签
         */
        serviceLabel: string
        /**
         * 排序方式 (0 = 默认id倒序, 1 = id升序, 2 = addtime升序, 3 = addtime倒序, 4 = displayorder升序, 5 = displayorder倒序, 6 = cateParentid1倒序, 7 = cateChildid1倒序, 8 = cateParentid2倒序, 9 = isInBusiness倒序, 10 = businessStatus倒序, 11 = restCanOrder倒序, 12 = sendPrice倒序, 13 = deliveryPrice倒序, 14 = packPrice倒序, 15 = deliveryTime倒序, 16 = prepareTime倒序, 17 = deliveryType倒序, 18 = serveRadius倒序, 19 =status倒序, 20 = wgDisplayorder倒序, 21 = payment倒序, 22 = sailed倒序, 23 = score倒序, 24 = favor倒序, 25 = firstOrderStatus倒序, 26 = click倒序, 27 = isRecommend倒序, 28 =isStick倒序, 29 =chainid倒序, 30 = deliveryTimes倒序)
         */
        sortType: number
        /**
         * 营业时间
         */
        businessHours: string
        /**
         * 门店实景
         */
        thumbs: string
        /**
         * 详细地址
         */
        address: string
        /**
         * 经度
         */
        locationX: string
        /**
         * 纬度
         */
        locationY: string
        /**
         * 营业资质图片
         */
        qualification: string
        /**
        * 营业资质图片,解析后对象
        */
        qualificationObj: { business: { thumb: string }, service: { thumb: string }, more1: { thumb: string }, more2: { thumb: string } }
        /**
         * 营业执照过期时间
         */
        licenseEndtime: number
        /**
       * 营业执照过期时间
       */
        licenseEndtimeStr: string | null
        /**
         * 餐饮执照过期时间
         */
        foodcertEndtime: number
        /**
       * 餐饮执照过期时间
       */
        foodcertEndtimeStr: string | null
        /**
         * 繁杂的配置
         */
        data: string
        /**
         * 繁杂配置解析后对象
         */
        dataObj: {
            /**
             * 食品安全等级
             */
            food_level?: "A" | "B" | "C" | "非餐饮"
            /**
             * 打印机打印类型
             */
            printer_perms?: Array<"orderplace" | "orderremind" | "ordercancel" | "cancelrefund">
            /**
             * 自动通知配送员的时间
             */
            auto_notice_deliveryer_time?: number
            /**
             * 门店招牌
             */
            picture?: string
            /**
             * 预订单设置
             */
            reserve: {
                /**
                 * 下单时间距离送达时间超过几分钟 属于预定单
                 */
                reserve_time_limit: number
                /**
                 * 距离送达时间几分钟 通知商户备餐
                 */
                notice_clerk_before_delivery: number
            },
            /**
             * 预定单打印时间点(1=支付后立即打印,2=通知商户时打印)
             */
            reserve_order_print_type: number
            /**
             * 包装费计算方式
             */
            pack_price: {
                /**
                 * 1=固定金额,2=按订单金额区间计算
                 */
                type: 1 | 2
                /**
                 * 固定金额值
                 */
                fee: number
                /**
                 * 按区间计算规则
                 */
                rules?: {
                    /**
                     * 开始
                     */
                    start: number
                    /**
                     * 结束
                     */
                    end: number
                    /**
                     * 费用
                     */
                    fee: number
                }[]
            },
            /**
             * 订单确认页送达时间提示语
             */
            order_time_placeholder: string
            /**
             *  订单备注是否必填(1=是,0=否)
             */
            order_note_status: 0 | 1
            /**
             * 订单
             */
            order_form: {
                /**
                 * 提交订单时是否需要选择餐具数量(1=是,0=否)
                 */
                person_num: 0 | 1
            }
            /**
             * 订单确认页公告设置
             */
            orderCreateNotice: {
                /**
                 * 订单确认页公告文本
                 */
                text: string
            },
            /**
             * 平台服务费
             */
            platformServiceFee: {
                /**
                 * 平台服务器支付方式 1 固定金额 2 固定费率  3 固定金额 + 固定费率
                 */
                feePayType: 1 | 2 | 3
                /**
                 * 平台服务费金额
                 */
                feePayMoney: number
                /**
                 * 平台服务费费率
                 */
                feePayPercent: number
            }
        }

        /**
         * 打印机打印设置，0=支付后自动打印,1=接单后自动打印,2=手动打印
         */
        autoPrintOrder?: 0 | 1 | 2
        /**
         * 自动接单方式 0=不自动接单,1=支付后自动接单, 2=打印机出单后自动接单(注:仅喜讯打印机支持,其他打印机不支持)
         */
        autoHandelOrder?: 0 | 1 | 2
        /**
         * 接单后自动通知配送员配送 1=开启,0=关闭
         */
        autoNoticeDeliveryer?: 0 | 1
        /**
         * 是否支持开发票(1=是,0=否)
         */
        invoiceStatus?: 0 | 1
        /**
         * 支付方式(wechat=微信支付,credit=余额支付) 
         */
        payment?: string
        /**
         * 支付方式(wechat=微信支付,credit=余额支付) 
         */
        paymentStr: Array<"wechat" | "credit">
        /**
         * 催单时间间隔
         */
        remindTimeLimit?: number
        /**
         * 可催单开始时间
         */
        remindTimeStart?: number
        /**
         * 自定义催单回复
         */
        remindReply: string
        /**
         * 自定义催单回复
         */
        remindReplyStr: Array<{ text: string }>
        /**
         * 评价回复
         */
        commentReply: string
        /**
         * 评价回复
         */
        commentReplyStr: Array<{ text: string }>
        /**
         * 公告
         */
        notice: string
        /**
         * 进入商品列表提示
         */
        tips: string,
        /**
         * 商户类型（1=外卖,2=商超）
         */
        isWaimai: 1 | 2
        /**
         * 是否预订单，0表示只支持当天订单 非0表示可预定几天的订单，最大支持提前6天下订单。
         */
        deliveryWithinDays: number
        /**
         * 需提前几天预定外卖
         */
        deliveryReserveDays: number
        /**
         * 门店评分
         */
        score: number
        /**
         * 起送费
         */
        sendPrice: number
        /**
         * 配送费
         */
        deliveryPrice: number
        /**
         * 配送时间
         */
        deliveryTime: number
        /**
         * 是否收藏此店铺
         */
        isLoginMemberFavorite: 0 | 1
        /**
         * 可提前几天点外卖
         */
        deliveryWithinDays: number
        /**
         * 需提前几天预定外卖
         */
        deliveryReserveDays: number
        /**
         * 休息是否接单(0=不接单,1=接单)
         */
        restCanOrder: 0 | 1
        /**
         * 子商户号
         */
        subMchId: string
        /**
         * 就餐方式 1 外卖 2 外卖+堂食 3 堂食
         */
        isMeal: 1 | 2 | 3
    }
    /**
     * 商户标签
     */
    interface category {
        /**
         * 标签id
         */
        id?: number
        /**
         * 标签名称
         */
        title: string
        /**
         * 背景颜色
         */
        color: string
        /**
         * 文字颜色
         */
        textColor: string
        /**
         * 类型(TY_store_label=商户标签,TY_delivery_label=配送标签,TY_service_label=服务标签) 
         */
        type: "TY_store_label" | "TY_delivery_label" | "TY_service_label"
        /**
         * 排序
         */
        displayorder: number
        /**
         * 边框颜色
         */
        alias: string
        /**
         * 圆角值
         */
        score: number
    }

    /**
     * 店员
     */
    interface clerk {
        /**
         * 店员id
         */
        id: number
        /**
         * 店员姓名
         */
        title: string
        /**
         * 微信昵称
         */
        nickname: string
        /**
         * 微信图像
         */
        avatar: string
        /**
         * 手机号码
         */
        mobile: string
        /**
         * 添加时间
         */
        addtime: number
        /**
         * 状态(0=禁用,1=启用) 
         */
        status: 0 | 1
        /**
         * 是否删除(0=未删除,1=已删除) 
         */
        isDelete: 0 | 1
        /**
         * 工作状态(1=工作中,0=休息中) 
         */
        workStatus: 0 | 1
        /**
         * 绑定店铺信息
         */
        store: storeData
        /**
         * 绑定关系关联表
         */
        storeClerk: storeClerk
        /**
         * 账号店铺绑定状态 0未绑定 1已绑定
         */
        bindStoreStatus: 0 | 1
    }

    /**
     * 店员店铺绑定关系
     */
    interface storeClerk {
        /**
         * 绑定id
         */
        id: number
        /**
         * 商户ID
         */
        sid: number
        /**
         * 店员ID
         */
        clerkId: number
        /**
         * 角色(clerk=店员,manager=管理员) 
         */
        role: "clerk" | "manager"
        /**
         * 客服状态(1=在线,0=忙碌) 
         */
        kefuStatus: 0 | 1
        /**
         * 消息提醒、语音提醒设置{"accept_wechat_notice":1,"accept_voice_notice":1} 
         */
        extra: string
        /**
         * 状态(1=审核通过,2=审核中,3=审核未通过) 
         */
        status: 1 | 2 | 3
        /**
         * 店员信息
         */
        clerk: clerk
        /**
         * 微信提醒 0关 1开
         */
        weChat: 0 | 1
        /**
         * 语音提醒 0关 1开
         */
        voice: 0 | 1
        /**
         * 绑定时间
         */
        addtime: number
    }
    /**
     * 商品分类
     */
    interface goodsCategory {
        /**
         * 分类描述
         */
        description: string
        /**
         * 排序
         */
        displayorder: number
        /**
         * 结束时间
         */
        endTime: string
        /**
         * 分类id
         */
        id: number
        /**
         * 是否必选 0否 1是
         */
        isRequired: 0 | 1
        /**
         * 是否指定可售时间段(1=指定,0=不指定) 
         */
        isShowtime: 0 | 1
        /**
         * 分类内最低消费金额
         */
        minFee: number
        /**
         * 父分类ID
         */
        parentid: number
        /**
         * 门店id
         */
        sid: number
        /**
         * 开始时间 
         */
        startTime: string
        /**
         * 状态(1=显示,0=不显示) 
         */
        status: 0 | 1
        /**
         * 分类图标
         */
        thumb: string
        /**
         * 分类名称
         */
        title: string
        /**
         * 显示星期
         */
        week: string
        /**
         * 显示星期
         */
        weekStr: number[]
    }

    /**
    * 商品分类树形数据
    */
    interface goodsCategoryTree extends goodsCategory {
        children?: goodsCategoryTree[],
        goodsList?: goods[]
        /**
         * 分类徽记
         */
        badge: {
            show: boolean
            value: number
        }
    }

    /**
     * 商品列表
     */
    interface goods {
        /**
         * 商品id
         */
        id: number;
        /**
         * 商户id
         */
        sid: number;
        /**
         * 分类id
         */
        cid: number | null;
        /**
         * 子分类id
         */
        childId: number
        /**
         * 商品类型(1=外卖 2=商超) 
         */
        type: 1 | 2
        /**
         * 商品名称
         */
        title: string
        /**
         * 现价
         */
        price: number
        /**
         * 原价
         */
        oldPrice: number
        /**
         * 采购价
         */
        caigouPrice: number
        /**
         * 店内价
         */
        tsPrice: string
        /**
         * 餐盒价格
         */
        boxPrice: number
        /**
         * 包装费
         */
        boxCost: number
        /**
         * 是否添加商品规格(1=是,0=否) 
         */
        isOptions: 0 | 1
        /**
         * 是否添加商品加料(1=是,0=否) 
         */
        isMaterials: 0 | 1
        /**
         * 商品单位 
         */
        unitname: string
        /**
         * 最低起购数量
         */
        unitnum: number
        /**
         * 库存 -1 不限制
         */
        total: number
        /**
         * 库存预警 
         */
        totalWarning: number
        /**
         * 每日库存
         */
        totalEveryday: number
        /**
         * 库存更新日期
         */
        totalUpdateday: number
        /**
         * 每日自动补足库存(1=是,0=否) 
         */
        totalAutoUpdate: 0 | 1
        /**
         * 库存更新方式(1=拍下减库存,2=付款减库存,3=用不减库存) 
         */
        totalUpdateType: number
        /**
         * 已卖出数量
         */
        sailed: number
        /**
         * 商品状态(1=上架,0=下架) 
         */
        status: 0 | 1
        /**
         * 设置为热销(1=是,0=否)
         */
        isHot: 0 | 1
        /**
         * 商品图片
         */
        thumb: string
        /**
         * 自定义标签
         */
        label: string
        /**
         * 排序
         */
        displayorder: number
        /**
         * 内容
         */
        content: string
        /**
         * 描述
         */
        description: string
        /**
         * 评价数量
         */
        commentTotal: number
        /**
         * 好评数量
         */
        commentGood: number
        /**
         * 打印标签
         */
        printLabel: string
        /**
         * 商品规格属性 {"0":{"name":"口味","label":{"0":"不辣,"1":"微辣","2":"中辣","3":"特辣"}}} 
         */
        attrs: string
        /**
         * 是否设置可售时间段 
         */
        isShowtime: number
        /**
         * 可售时间段1-开始时间 
         */
        startTime1: string
        /**
        * 可售时间段2-开始时间 
        */
        startTime2: string
        /**
         * 可售时间段1-结束时间 
         */
        endTime1: string
        /**
         * 可售时间段2-结束时间 
         */
        endTime2: string
        /**
         * 可售时间星期 
         */
        week: string
        /**
         * 可售时间段
         */
        weekStr: number[]
        /**
         * 审核状态(1=待审核,2=审核通过,3=审核不通过) 
         */
        auditStatus: 1 | 2 | 3
        /**
         * 审核原因
         */
        auditReason: string
        /**
         * 月销售数量
         */
        sailedMonth: number
        /**
         * 好评百分比
         */
        commentGoodPercent: number
        /**
         * 商品重量
         */
        weight: number
        /**
         * 推荐理由
         */
        recommendReason: string
        /**
         * 每单限购
         */
        orderLimit: number
        /**
         * 总限购
         */
        totalLimit: number
        /**
         * 连锁店id
         */
        chainid: number
        /**
         * 添加类型(store=门店添加,chain=连锁店添加) 
         */
        createType: "store" | "chain"
        /**
         * 价格类型(store=门店价,chain=连锁店价)
         */
        priceType: "store" | "chain"
        /**
         * 连锁店价格
         */
        chainPrice: string
        /**
         * 门店价格
         */
        storePrice: string
        /**
         * 平台排序
         */
        mallDisplayorder: number
        /**
         * 规格标题
         */
        optionTitle: string
        /**
         * 加料标题
         */
        materialTitle: string
        /**
         * 排序方式
         */
        sortType: number
        /**
         * 会员价格
         */
        svipPrice: number
        /**
         *  单点不送(1=是,0=否)
         */
        singleStatus: 0 | 1
        /**
         * 商品规格属性
         */
        goodsOptionsList: Partial<goodsOption>[]
        /**
         * 商品加料属性
         */
        goodsMaterialList: Partial<goodsMaterial>[]
        /**
         * 商品属性
         */
        goodsAttrs: Partial<goodsAttrs>[]
        /**
         * 商超平台分类Id
         */
        plateformCid: number | null
        /**
         * 临时购买数量，用于商品列表临时购买双向绑定
         */
        buy_temp_num: number
    }

    /**
     * 商品规格
     */
    interface goodsOption {
        /**
         * 规格id
         */
        id: number
        /**
         * 商户id
         */
        sid: number
        /**
         * 商品id
         */
        goodsId: number
        /**
         * 规格名称
         */
        name: string
        /**
         * 规格图片
         */
        thumb?: string | string[]
        /**
         * 外卖价
         */
        price: number
        /**
         * 会员价
         */
        svipPrice: number
        /**
         * 库存
         */
        total: number
        /**
         * 库存预警
         */
        totalWarning: number
        /**
         * 每日库存
         */
        totalEveryday: number
        /**
         * 是否每日补足库存(1=是,0=否) 
         */
        totalAutoUpdate: 0 | 1
        /**
         * 重量
         */
        weight: number
        /**
         * 排序
         */
        displayorder: number
        /**
         * 添加类型(store=门店添加,chain=连锁店添加) 
         */
        createType: "store" | "chain"
        /**
         * 价格类型(store=门店价,chain=连锁店价)
         */
        priceType: "store" | "chain"
        /**
         * 是否选中
         */
        checked: boolean
    }

    /**
     * 加料类型
     */
    interface goodsMaterial {
        /**
                * 规格id
                */
        id: number
        /**
         * 商户id
         */
        sid: number
        /**
         * 商品id
         */
        goodsId: number
        /**
         * 规格名称
         */
        name: string
        /**
         * 外卖价
         */
        price: number
        /**
         * 会员价
         */
        svipPrice: number
        /**
         * 库存
         */
        total: number
        /**
         * 库存预警
         */
        totalWarning: number
        /**
         * 每日库存
         */
        totalEveryday: number
        /**
         * 是否每日补足库存(1=是,0=否) 
         */
        totalAutoUpdate: 0 | 1
        /**
         * 重量
         */
        weight: number
        /**
         * 排序
         */
        displayorder: number
        /**
         * 添加类型(store=门店添加,chain=连锁店添加) 
         */
        createType: "store" | "chain"
        /**
         * 价格类型(store=门店价,chain=连锁店价)
         */
        priceType: "store" | "chain",
        /**
         * 是否选中
         */
        checked: boolean
    }

    /**
     * 商品属性
     */
    interface goodsAttrs {
        name: string
        /**
         * 选中的值
         */
        value?: string
        label: string[]
    }

    /**
     * 打印机属性
     */
    interface printer {
        /**
         * 打印机appsecret
         */
        apiKey: string
        /**
         * 设备类型(printer=打印机,label_printer=标签机) 
         */
        deviceType: "printer" | "label_printer"
        /**
         * id
         */
        id: number
        /**
         * 打印类型(1=整单打印,0=分单打印) 
         */
        isPrintAll: 0 | 1
        /**
         * 打印机key 
         */
        key: string
        /**
         * appid
         */
        memberCode: string
        /**
         * 设备名称
         */
        name: string
        /**
         * 	尾部自定义信息 
         */
        printFooter: string
        /**
         * 头部自定义
         */
        printHeader: string
        /**
         * 机器号
         */
        printNo: string
        /**
         * 打印联数(默认1)
         */
        printNums: number
        /**
         * 角色类型
         */
        role: "store"
        /**
         * 自定义二维码连接
         */
        qrcodeLink: string
        /**
         * 店铺id
         */
        sid: number
        /**
         * 是否启用设备(1=启用,0=不启用) 
         */
        status: 0 | 1
        /**
         * 打印机类型(feie=飞鹅,spyun=商鹏) 
         */
        type: "spyun"
        /**
         * 最后更新时间
         */
        updatetime: number,
        /**
         * 二维码类型(delivery_handle=配送员接单二维码,delivery_assign=旧版配送员接单二维码,custom=自定义二维码,ordersn=订单编号条形码) 
         */
        qrcodeType: "custom"

        /**
         * 打印机状态(1在线，0离线)
         */
        onlineStatus: 0 | 1
    }

    /**
     * 打印日志
     */
    interface printerLog {
        /**
         * 打印id
         */
        id: number
        /**
         * 订单id
         */
        orderId: number
        /**
         * 打印机id
         */
        printerId: number
        /**
         * 打印返回数据
         */
        response: string
        /**
         * 打印标签数据
         */
        data: string
        /**
         * 打印时间
         */
        addtime: number
        /**
         * 打印单类型
         */
        type: "waimai"
    }

    /**
     * 评论统计
     */
    interface commentStat {
        /**
         * 高于x%的商家
         */
        highRate: string
        /**
         * 商户-平均分
         */
        scoreAverage: number
        /**
         * 商品-平均分
         */
        goodsQualityAverage: number
        /**
         * 配送-平均分
         */
        deliveryServiceAverage: number
        /**
         * 配送满意度
         */
        deliveryRate: string
        /**
         * 好评数量
         */
        positiveCount: number
        /**
         * 中评数量
         */
        midCount: number
        /**
         * 差评数量
         */
        negativeCount: number
    }

    /**
     * 店铺活动
     */
    interface activity {
        /**
         * 活动id
         */
        id: number
        /**
         * 商户id
         */
        sid: number
        /**
         * 批量商户id
         */
        sids: string
        /**
         * 活动标题
         */
        title: string
        /**
         * 活动类型(mallNewMember=平台新用户首单立减,newMember=门店新用户立减,discount=满减优惠,grant=下单满赠,deliveryFeeDiscount="满减配送费")
         */
        type: "mallNewMember" | "newMember" | "discount" | "grant" | "deliveryFeeDiscount"
        /**
         * 外卖是否参加活动(1=是,0=否)
         */
        isWaimai: 0 | 1
        /**
         * 开始时间
         */
        starttime: number
        /**
         * 结束时间
         */
        endtime: number
        /**
         * 创建时间
         */
        addtime: number
        /**
         * 活动状态(2=待生效,1=进行中,0=已失效) 
         */
        status: 0 | 1 | 2
        /**
         * 活动详情
         */
        data: string
        /**
         * 门店新客立减
         */
        newMember: newMember
        /**
         * 满减活动
         */
        discount: discount[]
        /**
         * 满赠活动
         */
        grant: grant[]
        /**
         * 平台新用户满减
         */
        mallNewMember: mallNewMember
        /**
         * 满减配送费
         */
        deliveryFeeDiscount: discount[]
        /**
         * 门店信息
         */
        store: store.storeData
    }

    /**
     * 门店新客立减
     */
    interface newMember {
        /**
         * 立减金额
         */
        back?: number
        /**
         * 平台承担费用
         */
        plateform_charge?: number
        /**
         * 门店承担费用
         */
        store_charge?: number
    }

    /**
     * 满减活动
     */
    interface discount {
        /**
         * 满多少
         */
        condition?: number
        /**
         * 减多少
         */
        back?: number
        /**
         * 平台承担
         */
        plateform_charge?: number
        /**
         * 代理承担
         */
        agent_charge?: number
        /**
         * 商户承担
         */
        store_charge?: number
    }

    /**
     * 满赠活动
     */
    interface grant {
        /**
         * 满多少
         */
        condition?: number
        /**
         * 赠送什么
         */
        back?: string
    }

    /**
     * 平台新用户活动
     */
    interface mallNewMember {
        /**
         * 减
         */
        back?: number,
        plateform_charge?: number
        /**
         * 代理承担
         */
        agent_charge?: number
        /**
         * 商户承担
         */
        store_charge?: number
    }
}

/**
 * 配送员模块
 */
declare namespace rider {

    /**
     * 配送员信息
     */
    interface riderInfo {
        /**
         * 配送员id
         */
        id: number
        /**
         * 配送员姓名
         */
        title: string
        /**
         * 配送员昵称
         */
        nickname: string
        /**
         * 头像
         */
        avatar: string
        /**
         * 手机号码
         */
        mobile: string
        /**
         * 性别
         */
        sex: string
        /**
         * 年龄
         */
        age: number
        /**
         * 排序
         */
        displayorder: number
        /**
         * 添加时间
         */
        addtime: number
        /**
         * 工作状态(1=接单中,0=休息中) 
         */
        workStatus: 0 | 1
        /**
         * 外卖权限(1=有,0=无) 
         */
        isTakeout: 0 | 1
        /**
         * 集中配送权限(1=有,0=无)
         */
        isStation: 0 | 1
        /**
         * 外卖单数
         */
        orderTakeoutNum: number
        /**
         * 外卖满负荷单数
         */
        collectMaxTakeout: number
        /**
         * 微信订阅消息剩余数量 
         */
        wxappNoticeNum: number
        /**
         * 转单权限
         */
        permTransfer: string
        /**
         * 转单权限对象
         */
        permTransferObj: {
            /**
             * 外卖转单 0 禁止 1 允许
             */
            status_takeout: 1
            /**
             * 外卖转单上限，配送员在遇到特殊情况下可申请转单，设置每天最多可转几次单。0为不限制
             */
            max_takeout: 0
        }
        /**
         * 取消订单权限
         */
        permCancel: string
        /**
         * 取消订单权限对象
         */
        permCancelObj: {
            /**
             * 取消外卖单 1 允许 0 禁止
             */
            status_takeout: 0 | 1
        },
        /**
         * 账户设置
         */
        account: string
        /**
         * 状态(1=正常,2=删除 3=审核) 
         */
        status: 1 | 2 | 3
    }
}


/**
 * 购物车模块
 */
declare namespace goodCar {

    /**
     * 单个店铺购物车
     */
    interface storeCar {
        /**
         * id
         */
        id: number
        /**
         * 商户ID
         */
        sid: number
        /**
         *  用户ID
         */
        uid: number
        /**
         * 数量
         */
        num: number
        /**
         * 餐盒费
         */
        boxPrice: string
        /**
         * 价格
         */
        price: number
        /**
         *  原价
         */
        originalPrice: string
        /**
         * 采购价
         */
        caigouPrice: number
        /**
         * 购物车商品信息
         */
        data: string
        /**
         * 创建时间
         */
        addtime: number
        /**
         * 支付时间
         */
        paytime: number
        /**
         * 是否购买会员
         */
        isBuysvip: 0 | 1
        /**
         * 是否提交
         */
        issubmit: 0 | 1
        /**
         * 重量
         */
        weight: number
        /**
         * 包装费
         */
        boxCost: string
        /**
         * 购物车商品对象
         */
        dataArray: storeCarGoodsAttr[]
        /**
         * 店铺信息
         */
        store: store.storeData
        /**
         * 订单信息
         */
        orderCartDataList: storeCarGoodsAttr[]
        /**
         * 活动信息
         */
        usedActivityMap: {
            /**
             * 满减配送费
             */
            deliveryFeeDiscount: store.discount
            /**
             * 门店新客
             */
            newMember: store.newMember
            /**
             * 满减
             */
            discount: store.discount
            /**
             * 平台新客
             */
            mallNewMember: store.mallNewMember
            /**
             * 满赠
             */
            grant: store.grant
            /**
             * 活动减免（除配送费）总金额  （不包含减免配送费）
             */
            discountExceptDeliveryFee: number
            /**
             * 活动减配送费总金额
             */
            discountDeliveryFee: number
        }
        /**
         * 用户可使用红包数目
        */
        usedRedpacketList: activity.redPacketAll[]
    }
    interface storeCarGoodsAttr {
        /**
         * 添加时间
         */
        addtime: number
        /**
         * 包装费(目前没用到)
         */
        boxCost: string
        /**
         * 餐盒费
         */
        boxPrice: string
        /**
         * 选择的商品属性,多个以,分隔
         */
        goodsAttrs: string
        /**
         * 商品Id
         */
        goodsId: number
        /**
         * 商品信息-仅包含购物车计算相关的属性
         */
        goodsInfo: {
            /**
             * 天天特价价格
             */
            bargainPrice: string
            /**
             * 包装费
             */
            boxCost: string
            /**
             * 餐盒费
             */
            boxPrice: string
            /**
             * 用户id
             */
            id: number
            /**
             * 每单限购
             */
            orderLimit: number
            /**
             * 价格
             */
            price: string
            /**
             * 上架状态
             */
            status: 0 | 1
            /**
             * vip价格
             */
            svipPrice: string
            /**
             * 商品缩略图
             */
            thumb: string
            /**
             * 商品名称
             */
            title: string
            /**
             * 总限购
             */
            totalLimit: number
            /**
             * 最小起购数量
             */
            unitnum: number
            /**
            * 商品分类
             */
            cid: number
            /**
             * 单品不送
             */
            singleStatus: 0 | 1
            /**
             * 商品单位
             */
            unitname: string
        }
        /**
         * 选择的商品加料-仅包含购物车计算相关的字段
         */
        goodsMaterialList: {
            /**
             * 商品id
             */
            goodsId: number
            /**
             * 加料id
             */
            id: number
            /**
             * 加料名称
             */
            name: string
            /**
             * 价格
             */
            price: string
            /**
             * 会员价格
             */
            svipPrice: number
        }[]
        /**
         * 选择的商品规格-仅包含购物车计算相关的字段
         */
        goodsOptionsList: {
            /**
             * 商品id
             */
            goodsId: number
            /**
             * 规格id
             */
            id: number
            /**
             * 规格名称
             */
            name: string
            /**
             * 售价
             */
            price: number
            /**
             * vip价格
             */
            svipPrice: number
        }[]
        /**
         * 商品数量
         */
        num: number
        /**
         * 该条目的总价=商品单价*num
         */
        price: number
        /**
         * 商品图片地址
         */
        thumb: string
        /**
         * 商品名称
         */
        title: string
        /**
         * 商品选择的规格、属性、加料信息,以+号连接
         */
        titleDetail: string
        /**
         * 退货商品数量，用于前端商品退货数量统计
         */
        payBackNum: number
        /**
         * 商品评价 0 踩 1 赞 -1 未操作
         */
        commentGood: 0 | 1 | -1
        /**
         * 已退款商品数量
         */
        reufundNum: number

    }
}

/**
 * 订单模块
 */
declare namespace order {
    /**
     * 时间区间类型
     */
    type time = {
        /**
         * 日期格式化形式
         */
        date: string,
        /**
         * 日期时间格式
         */
        time: string,
        /**
         * 日期天数
         */
        day: string,
        /**
         * 日期时间戳
         */
        timestamp: number
    }


    /**
     * 配送时间段
     */
    interface deliveryTime {
        /**
         * 天数
         */
        day: string
        /**
         * 时间区间
         */
        timeList: time[]
    }
    /**
     * 确认订单
     */
    type submitConfirmOrderInfo = {
        /**
         * 配送天数
         */
        deliveryDay: string
        /**
         * 配送时间文字
         */
        deliveryTime: string
        /**
         * 送达时间
         */
        deliverytime: number,
        /**
         * 购物车信息
         */
        orderCart: {
            /**
             * 购物车id
             */
            id: number,
            /**
            * 使用的红包信息
            */
            usedRedpacketList: {
                id: number
            }[]
        },
        memberAddress: {
            /**
             * 地址id
             */
            id: number
        },
        /**
         * 餐具数量
         */
        personNum: number
        /**
         * 备注
         */
        note: string
    }
    /**
     * 订单信息
     */
    interface orderInfo {
        /**
         * 订单id
         */
        id: number,
        /**
         * 商户id
         */
        sid: number,
        /**
         * 用户id
         */
        uid: number
        /**
         *  是否支付(1=已支付,0=未支付)
         */
        isPay: 0 | 1
        /**
         * 订单号
         */
        ordersn: string
        /**
         * 顾客openid
         */
        openid: string
        /**
         * 用户名
         */
        username: string
        /**
         * 用户电话号码
         */
        mobile: string
        /**
         * 支付费用
         */
        price: number
        /**
         * 店铺消息
         */
        store: store.storeData,
        /**
         * 商品信息
         */
        data: string
        /**
         * 商品信息数据
         */
        orderCart: goodCar.storeCar
        /**
         * 订单状态(1=待确认,2=已确认,3=待配送,4=配送中,5=已完成,6=已取消,7=拼单中) 
         */
        status: 1 | 2 | 3 | 4 | 5 | 6 | 7
        /**
         * 下单时间
         */
        addtime: number
        /**
         * 用餐人数
         */
        personNum: number
        /**
         * 配送费
         */
        deliveryFee: number
        /**
         * 配送地址
         */
        address: string
        /**
         * 称谓
         */
        sex: string
        /**
         * 配送天数
         */
        deliveryDay: string
        /**
         * 配送时间
         */
        deliveryTime: string
        /**
         * 配送时间戳
         */
        deliverytime: number
        /**
         * 备注
         */
        note: string
        /**
         * 配送员信息
         */
        deliveryer: rider.riderInfo,
        /**
         * 商户接单时间
         */
        handletime: number
        /**
         * 商户实际备货结束时间
         */
        clerkHandledTime: number
        /**
         * 订单流水序列编号
         */
        serialSn: number
        /**
         * 经度
         */
        locationX: string
        /**
         * 纬度
         */
        locationY: string
        /**
         * 商户最终费用
         */
        storeFinalFee: string
        /**
         * 打印次数
         */
        printNums: number
        /**
         * 催单状态 催单状态(0=无催单,1=催单未处理,2=催单已处理) 
         */
        isRemind: 0 | 1 | 2
        /**
         * 是否退款中(1=退款中,0=不限)
         */
        isRefunding: 1 | 0
        /**
         * 下单开始时间 时间戳
         */
        addtimeStart: number
        /**
         * 下单结束时间 时间戳
         */
        addtimeEnd: number
        /**
         * 姓名，电话，地址模糊查询
         */
        mutiQuery: string
        /**
         * 订单流水记录
         */
        orderStatusLogList: orderStatusLog[]
        /**
         * 订单门牌号
         */
        number: string
        /**
         *  接单方式(0=自己抢单 1=系统派单 2=调度派单 3=转单)
         */
        deliveryCollectType: 0 | 1 | 2 | 3
        /**
         * 送达开始时间
         */
        deliverytimeStart: number | string
        /**
         * 送达结束时间
         */
        deliverytimeEnd: number | string
        /**
         * 配送状态(0=店员通知配送前,3=待抢（店员点击通知配送）,7=待取货(配送员点击抢单),4=配送中(配送员点击确认取货),5=配送完成(配送员点击确认送达),6=订单取消) 
         */
        deliveryStatus: 0 | 3 | 4 | 5 | 6 | 7
        /**
         * 配送员送达时间
         */
        deliverySuccessTime: number
        /**
         * 配送员接单时间
         */
        deliveryAssignTime: number
        /**
         * 配送员到店时间
         */
        deliveryInstoreTime: number
        /**
         * 配送员取餐时间
         */
        deliveryTakegoodsTime: number
        /**
         * 转单状态 1=转单中,0=非转单中
         */
        transferDeliveryStatus: 0 | 1
        /**
         * 是否预订单
         */
        isReserve: 0 | 1
        /**
         * 是否评论
         */
        isComment: 0 | 1
        /**
         * 退款状态(0=默认无退款,1=退款发起中,2=退款处理中,3=退款成功,4=退款失败,6=退款申请被驳回,7=退款待审核,8=退款纠纷处理中,9=退款申请取消)
         */
        refundStatus: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
        /**
         * 是否存在退款(1=是,其他=不限)  
         */
        haveRefund: 0 | 1
        /**
         * 最终费用，顾客实际支付费用
         */
        finalFee: number
        /**
         * 总费用,包含商品费+ 配送费 + 餐盒费 + 包装费
         */
        totalFee: number
        /**
         * 折扣费用,优惠费用
         */
        discountFee: number
        /**
         * 用户本店下单次数
         */
        memberBuyTimes: number
        /**
         * 支付时间
         */
        paytime: number
        /**
         * 配送员id
         */
        deliveryerId: number
        /**
         * 餐盒费
         */
        boxPrice: number
        /**
         * 平台预估收益
         */
        plateformServeFee: number
        /**
         * {Integer}   profitSharing     分账状态(0=不分账,1=待分账,2=分账中,3=已分账)
         */
        profitSharing: 0 | 1 | 2 | 3
        /**
         * 最终退费
         */
        refundFee: number
        /**
         * 退款详情
         */
        orderRefundList: orderRefund[]
        /**
         * 状态开始范围
         */
        statusStart: number
        /**
         * 状态结束范围
         */
        statusEnd: number
        /**
         * 支付，微信订单号
         */
        transactionId: string
        /**
         * 支付-系统内部的订单号
         */
        outTradeNo: string
        /**
         * 打包费
         */
        packFee: number
        /**
         * 商家补贴
         */
        storeDiscountFee: number
        /**
         * 连锁店
         */
        chainid: number
        /**
         * 下单开始时间
         */
        statDayStart: number
        /**
         * 下单结束时间
         */
        statDayEnd: number
        /**
         * 就餐方式 0 堂食 1 自取 2 外卖
         */
        deliveryType: 0 | 1 | 2
    }

    /**
     * 订单交易类型
     */
    interface orderPay {
        /**
         * appId
         */
        appId: string
        /**
         * 随机字符串，长度为32个字符以下
         */
        nonceStr: string
        /**
         * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
         */
        packageVal: string
        /**
         * 签名算法，应与后台下单时的值一致
         */
        signType: string
        /**
         * 签名，具体签名方案参见 微信小程序支付文档
         */
        paySign: string
        /**
         * 即当前的时间。
         */
        timeStamp: string
    }

    /**
     * 顾客到收银台
     */
    interface goToPay {
        /**
         * 订单信息
         */
        order: orderInfo
        /**
         * 店铺信息
         */
        store: store.storeData
        /**
         * 支付截止时间
         */
        payLimitEndTime: number
        /**
         * 支付时间限制：15分钟
         */
        payTimeLimit: number
    }

    /**
     * 订单状态流水
     */
    interface orderStatusLog {
        /**
         * 时间
         */
        addtime: number
        /**
         * id
         */
        id: number
        /**
         * 备注
         */
        note: string
        /**
         * 订单id
         */
        oid: number
        /**
         * 状态 1正常 0异常
         */
        status: 0 | 1
        /**
         * 标题
         */
        title: string
        /**
         * 操作角色
         */
        roleCn: string
        /**
         * 操作角色
         */
        role: string
    }

    /**
     * 外卖订单全局统一配置
     */
    interface talkOutOrderConfig {
        /**
         * 商家接单后至通知配送之前顾客取消订单时间限制，单位分钟
         */
        cancel_after_handle: number
        /**
         * 订单评价-订单评价时间,订单完成超过?天则不能再进行评价,单位分钟
         */
        comment_day_limit: number
        /**
         * 顾客申请退款后自动同意时间 (120分钟),例如:设置为15分钟,那么顾客在申请退款后15分钟内未商户未处理顾客的退款申请, 系统会自动同意顾客的退款申请。设置为0, 则表示不会自动同意
         */
        customer_refund_auto_audittime: number
        /**
         * 配送员接单时间限制  (0=不限制) ,例如:设置为10分钟,那么商家通知配送员接单后,配送员在10分钟内未接单,系统会自动取消该订单.如果没有接单时间限制,请设置为0.该设置仅对"外卖订单"有效.店内订单不受此设置影响
         */
        deliveryer_collect_time_limit: number
        /**
         * 催单时间间隔,分钟 
         */
        deliveryer_remind_time_limit: number
        /**
         * 顾客催单限制-配送员接单多少分钟后顾客才能催单
         */
        deliveryer_remind_time_start: number
        /**
         *  商家接单时间限制  (0=不限制),例如:设置为15分钟,那么顾客支付后,商家在15分钟内未接单,系统会自动取消该订单.如果没有接单时间限制,请设置为0,该设置仅对"外卖订单"有效.店内订单不受此设置影响
         */
        handle_time_limit: number
        /**
         * 支付时间限制 (15分钟),例如:设置为15分钟,那么顾客在提交订单后15分钟内未支付,系统会自动取消该订单。如果没有支付时间限制,请设置为0,该设置仅对"外卖订单"有效.店内订单不受此设置影响
         */
        pay_time_limit: number
        /**
         * 未支付提醒 (5分钟)，例如:设置为5分钟,那么顾客在提交订单后5分钟内未支付,系统会自动发送微信模板消息提醒顾客。如果没有待支付提醒,请设置为0，该设置仅对"外卖订单"有效.店内订单不受此设置影响
         */
        pay_time_notice: number
        /**
         *  顾客取消订单时间限制（单位天、系统默认为1天）
         */
        customer_cancel_timelimit: number
    }

    /**
        * 订单评论类型
        */
    interface addComment {
        /**
         * 订单id
         */
        oid: number
        /**
         * 商户打分
         */
        goodsQuality: number
        /**
         * 配送打分
         */
        deliveryService: number
        /**
         * 评价原因
         */
        note?: string
        /**
         * 图片凭证
         */
        thumbs?: string
        /**
         * 商品评价
         */
        goodsCommentList?: {
            /**
             * 商品id
             */
            goodsId: number
            /**
             * 商品标题
             */
            title: string
            /**
             * 规格标题
             */
            titleDetail: string
            /**
             * 商品赞或踩(commentGood=1为赞,commentGood=-1为踩,commentGood=0为未评论)
             */
            commentGood: 0 | 1 | -1
        }[]
    }
    /**
     * 订单评论
     */
    interface comment {
        /**
         * 评论id
         */
        id: number
        /**
         * 订单id
         */
        oid: number
        /**
         * 用户id
         */
        uid: number
        /**
         * 商家id
         */
        sid: number
        /**
         * 配送员id
         */
        deliveryerId: number
        /**
         * 用户名称
         */
        username: string
        /**
         * 用户图像
         */
        avatar: string
        /**
         * 用户手机
         */
        mobile: string
        /**
         * 商品质量
         */
        goodsQuality: number
        /**
         * 口味评分
         */
        tasteScore: number
        /**
         * 配送评分
         */
        deliveryService: number
        /**
         * 评分
         */
        score: number
        /**
         * 点评信息
         */
        note: string
        /**
         * 上传图片的json字符串
         */
        thumbs: string
        /**
         * 上传图片的数组对象
         */
        thumbArray: string[]
        /**
         * 点餐信息
         */
        data: string
        /**
         * 评论回复
         */
        reply: string
        /**
         * 回复时间
         */
        replytime: number
        /**
         * 审核状态(0=待审核,1=审核通过,2=审核不通过)
         */
        status: 0 | 1 | 2
        /**
         * 是否分享(0=未分析,1=已分享) 
         */
        isShare: 0 | 1
        /**
         * 创建时间
         */
        addtime: number
        /**
         * 生效时间
         */
        entrytime: number
        /**
         * 更新时间
         */
        updatetime: number
        /**
         * 类型(1=真实评价,2=虚拟评价) 
         */
        type: 1 | 2
        /**
         * 连锁店id
         */
        chainid: number
        /**
         * 商户信息
         */
        store: store.storeData
        /**
         * 评价等级(好评=positive,中评=mid,差评=negative) 
         */
        level: "positive" | "negative" | "mid"
        /**
         * 评论商品列表
         */
        goodsCommentList: addComment['goodsCommentList']
        /**
         * 配送员信息
         */
        deliveryer: rider.riderInfo
        /**
         * 开始时间
         */
        addtimeStart: number
        /**
         * 结束时间
         */
        addtimeEnd: number
        /**
         * 配送员名称
         */
        deliveryerTitle: string

    }
    /**
     * 退款信息
     */
    interface payBackList {
        /**
         * 退款商品
         */
        refundGoods: goodCar.storeCarGoodsAttr[]
        /**
         * 退款信息
         */
        refundInfo: {
            /**
             * 退款标题
             */
            title: string
            /**
             * 退款原因
             */
            reason: string
            /**
             * 退款图片
             */
            thumbs: string[]
        },
        /**
         * 取消状态(0=未取消,1=已取消)
         */
        cancelStatus: 0 | 1
        /**
         * 退款金额
         */
        refundFee: number
        /**
         * 包装费
         */
        packFee: number
        /**
         * 配送费
         */
        deliveryFee: number
        /**
         * 是否全退(1=是,0=否);isRefundAll=1时才会退包装费、配送费
         */
        isRefundAll: 0 | 1
    }

    /**
     * 退款详情
     */
    interface orderRefund {
        /**
         * 退款id
         */
        id: number
        /**
         * 商户id
         */
        sid: number
        /**
         * 用户id
         */
        uid: number
        /**
         * 订单id
         */
        orderId: number
        /**
         * 订单编号
         */
        orderSn: string
        /**
         * 退款原因
         */
        reason: string
        /**
         * 费用
         */
        fee: string
        /**
         * 总费用
         */
        totalFee: string
        /**
         * 退款代理费用
         */
        refundAgentServeFee: string
        /**
         * 退款连锁店费用
         */
        refundChainServeFee: string
        /**
         * 服务费
         */
        refundServeFee: string
        /**
         * 平台交易单号
         */
        outTradeNo: string
        /**
         * 平台退款单号
         */
        outRefundNo: string
        /**
         * 状态(1=退款发起中,2=退款处理中,3=退款成功,4=退款失败,6=退款申请被驳回,7=退款待审核,8=退款纠纷处理中,9=退款申请取消) 
         */
        status: 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9
        /**
         * 申请时间
         */
        applyTime: number
        /**
         * 处理时间
         */
        handleTime: number
        /**
         * 完成时间
         */
        successTime: number
        /**
         * 详细退款信息
         */
        data: string
        /**
         * 类型(order=订单退款,goods=部分退款) 
         */
        type: "order" | "goods"
        /**
         * 订单信息
         */
        order: order.orderInfo
        /**
         * 退款步骤
         */
        orderRefundLogList: orderRefundLog[]
        /**
         * 退款商品信息
         */
        refundData: payBackList
    }

    /**
     * 退款记录
     */
    interface orderRefundLog {
        /**
         * id
         */
        id: number
        /**
         * 订单类型(order=订单,errander=跑腿)
         */
        orderType: "order" | "errander"
        /**
         * 退款id
         */
        refundId: number
        /**
         * 商户id
         */
        sid: number
        /**
         * 订单id
         */
        oid: number
        /**
         * // 状态状态(1=商户、配送员、系统发起退款申请或部分退款,2=接受并处理退款,3=退款成功,4=退款失败,5=商户同意退款,6=商户拒绝退单,7=各方协商处理中,8=申请平台客服仲裁,9=退款申请已取消,10=平台客服驳回您的退款申请,11=下单顾客提交部分商品退款待商户审核)
         */
        status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
        /**
         * // 类型(apply=发起退款申请,place=下单顾客提交退款申请,agree=商户同意您的退单申请,cancel=退款申请已取消,arbitrat=申请平台客服仲裁,consult=各方协商处理中,handel=平台接受退款申请,overrule=平台客服驳回您的退款申请,reject=商户拒绝退单,store_audit=等待商户审核,success=退款成功)
         */
        type: "apply" | "place" | "agree" | "cancel" | "arbitrat" | "consult" | "handel" | "overrule" | "reject" | "store_audit" | "success"
        /**
         * 退款描述
         */
        title: string
        /**
         * 备注
         */
        note: string
        /**
         * 添加时间
         */
        addtime: number
        /**
         * 角色
         */
        role: string
        /**
         * 角色名称
         */
        roleCn: string

    }
}

/**
 * 顾客用户模块
 */
declare namespace userInfo {

    /**
     * 用户地址
     */
    interface address {
        /**
         * id
         */
        id: number
        /**
         * 用户id
         */
        uid: number
        /**
         * 真实姓名
         */
        realname: string
        /**
         * 性别(先生、女士) 
         */
        sex: "先生" | "女士"
        /**
         * 手机号码
         */
        mobile: string
        /**
         * 用户名
         */
        name: string
        /**
         * 收货地址
         */
        address: string
        /**
         * 楼牌号
         */
        number: string
        /**
         * 经度
         */
        locationX: number
        /**
         * 纬度
         */
        locationY: number
        /**
         * 是否默认(0=非默认,1=默认) 
         */
        isDefault: 0 | 1
    }

    /**
     * 顾客信息
     */
    interface user {
        /**
         * 用户id
         */
        id: number
        /**
         * 顾客id
         */
        uid: number
        /**
         * 昵称
         */
        nickname: string
        /**
         * 电话号码
         */
        mobile: string
        /**
         * 用户图像
         */
        avatar: string
        /**
         * 用户openId
         */
        openidWxapp: string
        /**
         * 加入时间
         */
        addtime: number
        /**
         * 首次下单成功时间
         */
        successFirstTime: number
        /**
         * 最近下单成功时间
         */
        successLastTime: number
        /**
         * 会员等级
         */
        level: number
        /**
         * 是否可分享社群红包活动页面（1=可分享，0=不可分享）
         */
        isSpread: 0 | 1
        /**
         * 红包信息
         */
        redpacketStat: {
            /**
             * 已获取等级红包总数量 
             */
            getLevelRedpacketCountTotal: number
            /**
             * 可获取等级红包总数量
             */
            levelRedpacketCountTotal: number
            /**
             * 红包总数量
             */
            redpacketCount: number
            /**
             * 未使用-红包总数量
             */
            notUsedRedpacketCount: number
            /**
             * 已使用红包总数量
             */
            usedRedpacketCount: number
            /**
             * 已过期红包总数量
             */
            expiredRedpacketCount: number
        }
        /**
         * 用户累计消费金额
         */
        successPrice: number
    }

    /**
     * 顾客登录返回属性
     */
    interface loginResultApi {

        /**
         * 顾客信息
         */
        members: user

        /**
         * 登录返回token
         */
        tokenInfo: {
            /**
             * token 名称
             */
            tokenName: "satoken"
            /**
             * token值
             */
            tokenValue: string
        }
    }

    /**
     * 用户店铺收藏
     */
    interface storeFavorite {
        /**
         * 收藏id
         */
        id: number
        /**
         * 用户id
         */
        uid: number
        /**
         * 店铺id
         */
        sid: number
        /**
         * 收藏店铺信息
         */
        store: store.storeData
        /**
         * 收藏时间
         */
        addtime: number
    }
}

/**
 * 系统配置
 */
declare namespace setting {

    /**
     * 配置返回数据类型
     */
    interface result {
        /**
         * 模块
         */
        module: modules
        /**
         * 配置
         */
        config: string
        /**
         * 备注
         */
        remark: string
    }

    /**
     * 配置模块
     */
    type modules = "platform_info" | "store_delivery" | "store_serve_fee" | "takeout_order"

    /**
     * 平台基础设置
     */
    interface platform_info {
        /**
         * 平台名称
         */
        platform_name: string
        /**
         * 平台LOGO
         */
        platform_logo: string
        /**
         * 商户排序方式 默认值为1; 1=按照排序大小 2=按照热度排序 3=离我最近 4=销量最高 5=评分最高 6=商户排序规则 7=先按照排序大小，在按照距离 8=先按照排序大小，在按照销量
         */
        store_orderby_type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
        /**
         * 超出商家配送范围是否显示，默认值1； 0 不展示 1 展示
         */
        store_overradius_display: 0 | 1
        /**
         * 顾客端定位地址不在区域范围内时跳转到暂无服务页 默认0; 0否 1是
         */
        not_in_area2noservice: 0 | 1
        /**
         * 配送方名称
         */
        delivery_title: string
    }

    /**
     * 外卖配置
     */
    interface takeout_order {
        /**
          * 通知店员规则
        */
        notify_rule_clerk: {
            /**
             * 下单后多少分钟后通知商户,如需下单后立即通知店员接单，可设置为0; 注意：商家设置了自动接单后，只会通知一次; 注意:通知频率最低为1分钟 如果一个订单只需要通知一次，需要将总通知次数设置为1
             */
            notify_delay: number
            /**
             * 通知频率，几分钟通知一次
             */
            notify_frequency: number
            /**
             * 总共通知次数
             */
            notify_total: number
            /**
             * 通知第几次，电话通知，如需下单后立即电话通知店员接单，可设置为0
             */
            notify_phonecall_time: number
        }
        /**
         * 通知配送员规则
         */
        notify_rule_deliveryer: {
            /**
            * 下单后多少分钟后未接单，通知配送员,
            */
            notify_delay: number
            /**
             * 通知频率，几分钟通知一次
             */
            notify_frequency: number
            /**
             * 总共通知次数
             */
            notify_total: number
            /**
             * 通知第几次，电话通知，如需下单后立即电话通知配送员接单，可设置为0
             */
            notify_phonecall_time: number
        }
        /**
         * 支付时间限制，分钟
         */
        pay_time_limit: number
        /**
         * 未支付提醒
         */
        pay_time_notice: number
        /**
         * 催单时间限制
         */
        deliveryer_remind_time_start: number
        /**
         * 催单时间
         */
        deliveryer_remind_time_limit: number
        /**
         * 订单支付后是否允许顾客修改收货地址
         */
        orderPayAllowCustomerChangeAddress: 0 | 1
        /**
         * 支付后至商户未接单允许顾客取消订单 0 否 1是
         */
        cancel_order_before_accept_order: 0 | 1
        /**
         * 商家接单后至通知配送之前顾客取消订单时间限制
         */
        cancel_after_handle: number
        /**
         * 订单通知配送至订单完成之前顾客取消订单方式 1 整单取消 2 部分退款 3 不允许
         */
        customerCancelOrderTypeBeforeFinish: 1 | 2 | 3
        /**
         * 订单完成后顾客取消订单方式 1 部分退单 2 不允许
         */
        customerCancelOrderTypeAfterOrderFinish: 1 | 2
        /**
         * 顾客申请退款后自动同意时间
         */
        customer_refund_auto_audittime: number
        /**
         * 是否允许商户设置自动接单方式 0 否 1 是
         */
        allowStoreAutoAcceptOrder: 0 | 1
        /**
         * 是否允许商户设置接单后自动通知配送员 0 否 1 是
         */
        allowStoreAutoNotifyDeliveryer: 0 | 1
        /**
         * 商家接单后是否允许商户取消订单 0 否 1 是
         */
        allowStoreCancelOrder: 0 | 1
        /**
         * 商家接单时间限制
         */
        handle_time_limit: number
        /**
         * 订单完成后是否允许商家发起部分退款 0 否 1 是
         */
        allowStorePartRefund: 0 | 1
        /**
         * 商户隐藏后是否可以继续下单 0 否 1 是
         */
        allowOrderAfterStoreHidden: 0 | 1
        /**
         * 配送员接单时间限制,配送员接单时间限制  (0=不限制) 
         */
        deliveryer_collect_time_limit: number
        /**
         * 配送员转单理由,多个理由都会分隔
         */
        deliveryer_transfer_reason: string
        /**
         * 配送员取消订单理由,多个理由都会分隔
         */
        deliveryer_cancel_reason: string
        /**
         * 预订单是否自动通知配送员 0 否 1 是
         */
        preOrder_auto_notify_deliveryer: 0 | 1
        /**
         * 配送员接单后是否通知商户 0 否 1 是
         */
        deliveryer_notify_store: 0 | 1
        /**
         * 外卖订单自动完成时间节点 1 超过商户接单多久后自动完成  2 超过订单预计送达时间多久后自动完成。
         */
        takeout_order_auto_finish_time: 1 | 2
        /**
         * 外卖订单自动完成时间 单位小时
         */
        takeout_order_auto_finish_time_limit: number
        /**
         * 系统/商家/顾客取消订单是否自动退款 0否 1 是
         */
        auto_refund_after_cancel: 0 | 1
        /**
         * 系统/商家/顾客取消订单是否打印订单 0否 1 是
         */
        auto_print_order_after_cancel: 0 | 1
        /**
         * 订单完成后，可评价的时间，单位天
         */
        comment_day_limit: number
        /**
         * 订单完成后，用户可退单天数限制
         */
        customer_refund_time_limit: number
    }


    /**
     * 配送模式
     */
    interface store_delivery {
        /**
         * 配送模式(1=店内配送员,2=平台配送员)
         */
        delivery_mode: 1 | 2
        /**
         * 预计送达时间
         */
        delivery_time: number
        /**
         * 服务半径
         */
        serve_radius: number
        /**
         * 在配送半径外，是否允许下单
         */
        not_in_serve_radius: 0 | 1
        /**
         * 配送费模式(1=固定金额,2=按距离收取,3=按区域收取)
         */
        delivery_fee_mode: 1 | 2 | 3
        /**
         * 起送价
         */
        send_price: number
        /**
         * 满减配送费
         */
        delivery_free_price: number
        /**
         * 配送费
         */
        delivery_fee: number
        /**
         * 配送附加费
         */
        delivery_extra: {
            /**
             * 商家额外承担配送费每单?元
             */
            store_bear_deliveryprice: number
            /**
             * 满金额免配送费由谁承担,plateform=平台,store=商家
             */
            delivery_free_bear: "plateform" | "store"
            /**
             * 平台额外补贴配送员每单?元 
             */
            plateform_bear_deliveryprice: number
            /**
             * 配送时间段 间隔?分钟生成配送时间段  
             */
            delivery_time_interval: number
        },
        /**
         * 预定设置
         */
        reserve: {
            /**
             * 非营业时间下单(0=不可非营业时间下单,1=可非营业时间下单)
             */
            rest_can_order: 0 | 1
            /**
             * 下单时间距离送达时间超过?分钟 属于预定单
             */
            reserve_time_limit: number
            /**
             * 距离送达时间?分钟通知商户备餐
             */
            notice_clerk_before_delivery: number
        }
    }
    /**
     * 服务费
     */
    interface store_serve_fee {
        /**
         * 提现金额最低金额 */
        get_cash_fee_limit: number
        /**
         * 提现金额最高金额
         */
        get_cash_fee_limit_max: number
        /**
         * 提现费率
         */
        get_cash_fee_rate: number
        /**
         * 提现费用最低
         */
        get_cash_fee_min: number
        /**
         * 提现费用最高
         */
        get_cash_fee_max: number
        /**
         * 提现周期
         */
        fee_period: number
        /**
         * 提现到账周期 (0=管理员审核,1=极速到账)
         */
        get_cash_period: 0 | 1
    }
}

/**
 * 平台公告
 */
interface notice {
    /**
     * id
     */
    id: number
    /**
     * 类型(member=默认) 
     */
    type: number
    /**
     * 公告名称 
     */
    title: string
    /**
     * 公告内容
     */
    content: string
    /**
     * 公告排序 
     */
    displayorder: number
    /**
     * 是否启用(1=启用,0=不启用) 
     */
    status: 0 | 1
    /**
     * 添加时间 
     */
    addtime: number
}

/**
 * 协议
 */
interface agreement {
    /**
     * 协议id
     */
    id: number
    /**
     * 协议名称
     */
    name: keyof typeof import('../utils/enum').AgreementType
    /**
     * 协议标题
     */
    title: string
    /**
     * 图文内容
     */
    value: string
    /**
     * 添加时间
     */
    addtime: number
}

/**
 * 连锁店
 */
declare namespace chain {

    /**
     * 连锁店信息来源，主要用户非平台情况下接口请求token采用方案，1 平台 2 连锁店
     */
    type chainFrom = 1 | 2

    /**
     * 连锁店id
     */
    interface chainInfo {
        /**
         * 连锁店id
         */
        id: number
        /**
         * 管理员id
         */
        chainerId: number
        /**
         * 连锁店名称
         */
        title: string
        /**
         * 状态(0=禁用,1=启用) 
         */
        status: 0 | 1
        /**
         * 排序
         */
        displayorder: number
        /**
         * 是否删除(1=已删除,0=未删除) 
         */
        isDelete: 0 | 1
        /**
         * 账户余额
         */
        amount: string
        /**
         * 连锁店logo
         */
        logo: string
        /**
         * 连锁店管理员信息
         */
        chainer?: chainAdmin
    }

    /**
     * 连锁店管理员
     */
    interface chainAdmin {
        /**
         * 管理员id
         */
        id: number
        /**
         * 管理员真实姓名
         */
        realname: string
        /**
         * 管理员手机号码
         */
        mobile: string
        /**
         * 密码
         */
        password: string
        /**
         * 管理员状态
         */
        status: 0 | 1
        /**
         * 排序
         */
        displayorder: number
        /**
         * 0未删除 1已删除 
         */
        isDelete: 0 | 1
    }

}

/**
 * 订单数据统计
 */
declare namespace stat {

    /**
     * 今日订单数据统计
     */
    interface todayDataStat {
        /**
         * 预计收入(统计时间内,商家的实际入账)
         */
        todayIncome: number
        /**
         * 有效订单(统计时间内,已完成状态的订单数量)
         */
        finishedCount: number
        /**
         * 进行中的订单收入
         */
        goingIncome: number
        /**
         * 进行中单数
         */
        goingCount: number
        /**
         * 退款金额(统计时间内,退款金额)
         */
        refundAmount: number
        /**
         * 退款单数(退款金额、或退款状态不为0的订单数量)
         */
        refundCount: number
        /**
         * 营业额(营业时间内,顾客支付金额总和)
         */
        businessAmount: number
        /**
         * 新订单数量
         */
        newCount: number
        /**
         * 退款中单数
         */
        refundingCount: number
        /**
         * 已取消单数
         */
        cancleCount: number
    }
}

/**
 * 会员模块
 */
declare namespace member {
    /**
     * 会员等级
     */
    interface level {
        /**
         * 权益数量
         */
        benefitsCount: number
        /**
         * 权益描述
         */
        benefitsDesp: string
        /**
         * 条件描述
         */
        conditionDesp: string
        /**
         * 条件类型(1=消费金额,2=消费次数)
         */
        conditionType: 1 | 2
        /**
         * 条件值
         */
        conditionValue: number
        /**
         * 创建时间
         */
        createTime: number
        /**
         * 会员id
         */
        id: number
        /**
         * 会员等级
         */
        level: number
        /**
         * 会员等级名称
         */
        levelName: string
        /**
         * 可领取红包金额
         */
        redpacketAmount: number
        /**
         * 可领取红包次数
         */
        redpacketCount: number
        /**
         * 领取红包有效期天数 
         */
        redpacketDayLimit: number
        /**
         * 更新时间
         */
        updateTime: number
        /**
         * 领取红包使用金额限制
         */
        redpacketUseAmountLimit: number
    }
    /**
     * 会员红包
     */
    interface redPacket {
        /**
         * 红包id
         */
        id: number
        /**
         * 用户id
         */
        uid: number
        /**
         * 红包名称
         */
        name: string
        /**
         * 红包金额
         */
        amount: number
        /**
         * 红包类型(member_level=会员尊享,group=社群红包,store=商家红包,score_mall=商城红包,slow=慢必赔,common=通用红包)
         */
        type: "member_level" | "group" | "store" | "score_mall" | "slow" | "common"
        /**
         * 领取红包时的会员等级(会员尊享红包有值) 
         */
        memberLevel: number
        /**
         * 红包状态(1=未使用,2=已使用,3=已失效) 
         */
        status: 1 | 2 | 3
        /**
         * 使用金额限制/满X元可使用 
         */
        useAmountLimit: number
        /**
         * 用户昵称
         */
        nickname: string
        /**
         * 用户真实名称
         */
        realname: string
        /**
         * 用户手机号码
         */
        mobile: string
        /**
         * 备注
         */
        remark: string
        /**
         * 创建时间
         */
        startTime: number
        /**
         * 过期时间
         */
        endTime: number
        /**
         * 领取时间
         */
        useTime: number,
        /**
         * 红包过期天数
         */
        limitDay: number
    }
}

/**
 * 活动模块
 */
declare namespace activity {
    /**
     * 红包活动
     */
    interface redPacket {
        /**
         * 活动id
         */
        id: number
        /**
         * 红包类型(group=社群红包,store=商户红包) 
         */
        type: "group" | "store"
        /**
         * 商户id
         */
        sid?: number
        /**
         * 商户名称(类型为商户红包时需要填写) 
         */
        storeTitle: string
        /**
         * 红包名称
         */
        title: string
        /**
         * 红包金额
         */
        amount?: number
        /**
         * 商户承担金额类型为商户红包时需要填写) 
         */
        storeAmount?: number
        /**
         * 红包使用金额限制 
         */
        useAmountLimit: number
        /**
         * 红包期限天数 
         */
        dayLimit: number
        /**
         * 状态(1=上架,2=下架) 
         */
        status: 1 | 2
        /**
         * 创建日期
         */
        createTime: number
        /**
         * 库存
         */
        total: number
        /**
         * 剩余数量
         */
        remainCount: number
        /**
         * 备注信息
         */
        remark: string
        /**
         * 排序 排序方式 (0 = 默认, 1 = ID, 2 = 红包类型(group=社群红包,store=商户红包), 3 = 商户id(类型为商户红包时需要填写), 4 = 商户名称(类型为商户红包时需要填写), 5 = 红包名称, 6 = 红包金额, 7 = 商户承担金额类型为商户红包时需要填写), 8 = 红包使用金额限制, 9 = 红包期限天数, 10 = 状态(1=上架,2=下架), 11 = 创建日期, 12 = 库存, 13 = 剩余数量, 14 = 备注)
         */
        sortType: number
    }

    /**
    * 所有红包活动
    */
    interface redPacketAll {
        /**
         * 红包id
         */
        id: number
        /**
         * 用户id
         */
        uid: number
        /**
         * 红包名称
         */
        name: string
        /**
         * 红包金额
         */
        amount: number
        /**
         * 红包类型(member_level=会员尊享,group=社群红包,store=商家红包,score_mall=商城红包,slow=慢必赔,common=通用红包)
         */
        type: "member_level" | "group" | "store" | "score_mall" | "slow" | "common"
        /**
         * 领取红包时的会员等级(会员尊享红包有值) 
         */
        memberLevel: number
        /**
         * 红包状态(1=未使用,2=已使用,3=已失效) 
         */
        status: 1 | 2 | 3
        /**
         * 使用金额限制/满X元可使用 
         */
        useAmountLimit: number
        /**
         * 用户昵称
         */
        nickname: string
        /**
         * 用户真实名称
         */
        realname: string
        /**
         * 用户手机号码
         */
        mobile: string
        /**
         * 备注
         */
        remark: string
        /**
         * 创建时间
         */
        startTime: number
        /**
         * 过期时间
         */
        endTime: number
        /**
         * 领取时间
         */
        useTime: number,
        /**
         * 红包过期天数
         */
        limitDay: number
    }

    /**
     * 商城活动
     */
    interface mall {
        /**
         * 活动id
         */
        id: number
        /**
         * 商品类型(redpacket=红包,real=实物) 
         */
        type: "redpacket" | "real"
        /**
         * 名称
         */
        title: string
        /**
         * 实物缩略图
         */
        thumb: string
        /**
         * 兑换积分
         */
        score: number
        /**
         * 状态(1=上架,2=下架)
         */
        status: 1 | 2
        /**
         * 红包金额(类型为红包时需要填写) 
         */
        amount?: number
        /**
         * 红包使用金额限制(类型为红包时需要填写) 
         */
        useAmountLimit: number
        /**
         * 红包期限天数(类型为红包时需要填写) 
         */
        dayLimit: number
        /**
         * 创建日期 
         */
        createTime: number
        /**
         * 库存
         */
        total: number
        /**
         * 已兑换数量
         */
        exchangeCount: number
        /**
         * 备注信息
         */
        remark: string
        /**
         * 排序方式 (0 = 默认, 1 = ID, 2 = 商品类型(redpacket=红包,real=实物), 3 = 商品名称, 4 = 缩略图, 5 = 兑换积分, 6 = 状态(1=上架,2=下架), 7 = 红包金额(类型为红包时需要填写), 8 = 红包使用金额限制(类型为红包时需要填写), 9 = 红包期限天数(类型为红包时需要填写), 10 = 创建日期, 11 = 库存, 12 = 已兑换数量, 13 = 备注)
         */
        sortType: number
    }

    /**
     * 签到规则
     */
    interface signinRule {
        /**
         * 规则id
         */
        id?: number
        /**
         * 单日签到积分(按序逗号分隔) 
         */
        dayScoreSplits?: string
        /**
         * 持续签到积分 
         */
        continueScore?: number
        /**
         * 规则描述
         */
        desp?: string
        /**
         * 创建时间
         */
        createTime?: number
    }

    /**
     * 签到记录
     */
    interface signRecord {
        /**
         * 签到记录id
         */
        id: number
        /**
         * 用户id
         */
        uid: number
        /**
         * 签到状态
         */
        signStatus: string
        /**
         * 起始签到日期 
         */
        signStartTime: number
        /**
         * 结束签到日期 
         */
        signLastTime: number
        /**
         * 年与周 
         */
        yearWeek: number
        /**
         * 签到次数
         */
        signTimes: number
        /**
         * 备注
         */
        remark: string
        /**
         * 连续签到天数
         */
        continueSignDays: number
        /**
         * 签到后是否升级(1=升级,0=未升级)
         */
        isUpgradeLevel: 0 | 1
    }
}