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
}

/**
 * 商户模块命名空间
 */
declare namespace store {
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
}