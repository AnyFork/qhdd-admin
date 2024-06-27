<template>
  <div class="w-full h-full flex-row-center lock-screen">
    <n-card bordered class="w-450px opacity-80">
      <div>
        <n-space justify="center">
          <n-avatar round bordered :size="60" :src="userInfo.avatar" />
        </n-space>
        <div class="w-full text-center pt-3 pb-6">欢迎您，{{ userInfo.name }}</div>
      </div>
      <n-form ref="formRef" :model="LockPassword" :rules="rules" :show-label="false">
        <n-form-item path="password">
          <n-input v-model:value="LockPassword.password" type="password" show-password-on="mousedown"
            placeholder="请输入锁屏密码" :maxlength="8" />
        </n-form-item>
      </n-form>
      <n-button type="primary" block class="mb-[20px]" @click="handleValidateButtonClick">解锁</n-button>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { FormInst, FormItemRule, FormRules } from 'naive-ui';
import { useLockScreenstore } from '@/store'
import { useRouterPush } from '@/composables'
import { getUserInfo } from '@/utils'
import user from '@/assets/images/user.png'
const useRouter = useRouterPush()
const lockScreen = useLockScreenstore()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const LockPassword = reactive({
  password: ''
})
//当前登录用户信息
const userInfo = reactive({
  avatar: user,
  name: ""
})
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
      if (lockScreen.getLockScreen() == LockPassword.password) {
        useRouter.routerPush({ name: lockScreen.lastRouteName as string })
        lockScreen.resetLockScreen()
      } else {
        message.error('密码错误')
      }

    } else {
      message.error('验证失败')
    }
  })
}
onMounted(() => {
  const data = getUserInfo() as any
  if (data.avatar) {
    userInfo.avatar = data.avatar
  }
  userInfo.name = data.name
})
</script>
<style scoped>
.lock-screen {
  background-image: url("@/assets/images/lock.jpg");
  background-size: cover;
}
</style>
