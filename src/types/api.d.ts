import { system } from '@/types/api';
import { attachmentGroupList } from './../utils/http/api';
// 后端接口返回的数据类型

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
         * 类型 0 平台 1商户，2顾客，3骑手
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
         * 类型(0=品类,1=区域,2=活动)
         */
        type: 0 | 1 | 2
    }
    /**
     * 树形分类类型
     */
    interface rowData extends system.category {
        children?: rowData[]
    }
}

/**
 * 商户模块命名空间
 */
declare namespace store {

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
         * 外卖营业状态(0=休息中,2=营业)
         */
        businessStatus: 0 | 2
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
    }

}