import { FormInst, useMessage, FormRules } from "naive-ui";
import { loginPlatform } from "@/service/platform/system/login";
/**
 * 平台用户登录系统
 * @returns 
 */
export const usePlatformLogin = () => {
    const { loginUserType } = useLoginType()
    const message = useMessage();
    const { routerPush } = useRouterPush()
    const userInfo = ref<{
        userAccount: string;
        userPassword: string;
    }>({
        userAccount: "",
        userPassword: ""
    });
    const formRef = ref<FormInst | null>(null);
    const loading = ref(false)
    const formRules: FormRules = {
        userAccount: [
            {
                required: true,
                message: "请输入账号",
                trigger: ["input", "blur"]
            },
        ],
        userPassword: [
            {
                required: true,
                message: "请输入密码",
                trigger: ["input", "blur"]
            },
        ]
    };

    /**
     * 表单校验
     * @param e 
     */
    const handleValidateButtonClick = (e: MouseEvent) => {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (!errors) {
                loading.value = true
                loginForm()
            }
        });
    }

    /**
     * 提交表单，进行登录
     */
    const loginForm = async () => {
        try {
            const { data } = await loginPlatform(userInfo.value.userAccount, userInfo.value.userPassword)
            if (data) {
                if (data.code == 200) {
                    setPlatformToken(JSON.stringify(data.data.tokenInfo))
                    setPlatformUserInfo(data.data.admin)
                    loginUserType.value = 1
                    message.success("登录成功!", {
                        onLeave: () => {
                            routerPush(import.meta.env.VITE_PLATFORM_ROUTE_HOME_PATH)
                        }
                    })
                } else {
                    message.error(data.msg, {
                        onLeave: () => {
                            loading.value = false
                        }
                    })
                }
            }
        } catch (err: any) {
            message.error(err.message, {
                onLeave: () => {
                    loading.value = false
                }
            })
        }
    };
    /**
     * 绑定回车事件
     */
    const keydownEvent = () => {
        document.onkeydown = (e: any) => {
            if (e.defaultPrevented) {
                return;
            }
            const body = document.getElementsByTagName('body')[0];
            // match(xxxx应填写文件在浏览器中的地址，不需要包括https、http或者www)，这里是为了防止其他页面触发
            if (e.keyCode === 13 && e.target.baseURI.match("/login/platform") && e.target === body) {
                handleValidateButtonClick(e)
            }
        };
    };
    onMounted(() => {
        keydownEvent()
    })
    onUnmounted(() => {
        //页面卸载时清除键盘事件
        document.onkeydown = null
    })
    return { userInfo, handleValidateButtonClick, loading, formRef, formRules }
}