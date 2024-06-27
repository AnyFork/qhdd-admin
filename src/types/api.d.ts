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
