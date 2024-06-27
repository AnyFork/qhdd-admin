import { useInstance, useRouterPush } from "@/composables";
import { FormInst, useMessage, FormRules } from "naive-ui";
import { loginApi, setToken, setUserInfo } from '@/utils'
export const useLogin = () => {
    const message = useMessage();
    const { $axios } = useInstance();
    const { routerPush } = useRouterPush()
    interface ModelType {
        userAccount: string | null;
        userPassword: string | null;
    }
    const userInfo = ref<ModelType>({
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
    const handleValidateButtonClick = (e: MouseEvent) => {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (!errors) {
                loading.value = true
                loginForm()
            }
        });
    }

    // 提交表单
    const loginForm = async () => {
        try {
            let params = {
                key: userInfo.value.userAccount,
                password: userInfo.value.userPassword,
            }
            const { data } = await $axios.post(loginApi, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            if (data) {
                if (data.code == 200) {
                    setToken(JSON.stringify(data.data.tokenInfo))
                    setUserInfo(data.data.admin)
                    message.success("登录成功!", {
                        onLeave: () => {
                            routerPush("/")
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
    //绑定回车事件
    const keydownEvent = () => {
        document.onkeydown = (e: any) => {
            if (e.defaultPrevented) {
                return;
            }
            const body = document.getElementsByTagName('body')[0];
            // match(xxxx应填写文件在浏览器中的地址，不需要包括https、http或者www)，这里是为了防止其他页面触发
            if (e.keyCode === 13 && e.target.baseURI.match("/docs/login") && e.target === body) {
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
    return {
        userInfo, handleValidateButtonClick, loading, formRef, formRules
    }
}