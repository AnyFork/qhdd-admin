<template>
  <hover-container class="w-40px h-full" tooltip-content="锁屏" show-tooltip show-tooltip-bg>
    <icon-ant-design:lock-outlined class="text-18px" @click="showModal = !showModal" />
  </hover-container>
  <n-modal v-model:show="showModal" preset="dialog">
    <template #icon>
      <icon-ant-design:lock-outlined class="text-25px flex" color="var(--n-title-text-color)" />
    </template>
    <template #header>系统锁屏</template>
    <template #default>
      <div>
        <n-space justify="center">
          <n-avatar round bordered :size="60" :src="userInfo?.avatar" />
        </n-space>
        <div class="w-full text-center pt-3 pb-6">欢迎您，{{ userInfo.name }}</div>
      </div>
      <n-form ref="formRef" :model="LockPassword" :rules="rules" :show-label="false">
        <n-form-item path="password">
          <n-input v-model:value="LockPassword.password" type="password" show-password-on="mousedown"
            placeholder="请输入锁屏密码" :maxlength="8" />
        </n-form-item>
      </n-form>
    </template>
    <template #action>
      <n-button type="primary" block class="mb-[20px]" @click="handleValidateButtonClick">锁屏</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import user from '@/assets/images/user.png'
import { FormInst, FormItemRule, FormRules } from 'naive-ui';
defineOptions({ name: 'LockScreen' })
const message = useMessage()
const useRouter = useRouterPush()
const lockScreen = useLockScreenStore()
const showModal = ref(false)
const formRef = ref<FormInst | null>(null)
const LockPassword = reactive({
  password: ''
})
//当前登录用户信息
const userInfo = reactive({
  avatar: user,
  name: ""
})
const currentRoute = useRoute()
/**自定义表单校验规则*/
const rules: FormRules = {
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请输入锁屏密码!')
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/.test(value)) {
          return new Error('锁屏密码必须为字母+数字!')
        } else if (value.length < 6) {
          return new Error('锁屏密码长度至少不能低于6位!')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ]
}
const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      /**持久化锁屏密码*/
      lockScreen.changeLockPassword(LockPassword.password)
      /**保存路由地址*/
      lockScreen.lastRouteName = currentRoute.name
      useRouter.routerPush({ name: 'lockScreen' })
    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
onMounted(() => {
  const data = getPlatformUserInfo() as any
  if (data?.avatar) {
    userInfo.avatar = data.avatar
  }
  userInfo.name = data?.name
})
</script>
