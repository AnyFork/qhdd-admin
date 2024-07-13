import { FormInst, useMessage, FormRules } from "naive-ui";
import { storeLogin } from "@/service/store/system/login";
/**
 * 平台商户登录系统
 * @returns 
 */
export const useStoreLogin = () => {
    const { loginUserType } = useLoginType()
    const message = useMessage();
    const { routerPush } = useRouterPush()
    const userInfo = reactive<{ clerkId: string }>({ clerkId: "1" });
    const formRef = ref<FormInst | null>(null);
    const loading = ref(false)
    const { storeInfo, storeInfoFrom } = useStoreInfo()
    const formRules: FormRules = {
        clerkId: [
            {
                required: true,
                message: "请输入店员Id",
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
            const { data } = await storeLogin(userInfo?.clerkId)
            if (data) {
                if (data.code == 200) {
                    setStoreToken(JSON.stringify(data.data.tokenInfo))
                    setStoreUserInfo(data.data.clerk)
                    loginUserType.value = 2
                    storeInfo.value = data.data.clerk?.store
                    storeInfoFrom.value = 2
                    message.success("登录成功!", {
                        onLeave: () => {
                            routerPush(import.meta.env.VITE_STORE_ROUTE_HOME_PATH)
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
            if (e.keyCode === 13 && e.target.baseURI.match("/login/store") && e.target === body) {
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