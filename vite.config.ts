import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
//https://github.com/antfu/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'
//https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { createHtmlPlugin } from 'vite-plugin-html'
//使用 gzip 或者 brotli 来压缩资源.
import viteCompression from 'vite-plugin-compression'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: "/qhdd/",
    plugins: [
      vue({
        script: {
          //启用defineModel实验性功能
          defineModel: true,
          //启用props属性结构
          propsDestructure: true
        },
        template: {
          //设置vue模板中组件中无法自动加载assets资源问题,组件名称：加载assets资源key属性名称
          transformAssetUrls: {
            'el-avatar': ['src'],
            'el-image': ['src']
          }
        }
      }),
      UnoCSS(),
      //官网配置地址:https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dirs: ['./src/composables/**/*', './src/utils/**/*', './src/store/**/*'],
        imports: ['vue', 'vue-router', { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] }, '@vueuse/core', 'pinia'],
        dts: 'src/types/auto-import.d.ts'
      }),
      // 官网地址:https://github.com/antfu/unplugin-vue-components#readme
      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue'],
        dts: 'src/types/components.d.ts',
        resolvers: [NaiveUiResolver(), IconsResolver({ customCollections: ['custom'], componentPrefix: 'icon' })]
      }),
      //官网地址：https://www.npmjs.com/package/unplugin-icons
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        customCollections: {
          custom: FileSystemIconLoader(path.resolve(__dirname, 'src/assets/svg'))
        },
        scale: 1,
        defaultClass: 'inline-block'
      }),
      // 官网地址：https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appName: env.VITE_APP_NAME,
            appTitle: env.VITE_APP_TITLE,
            appDesc: env.VITE_APP_DESC
          }
        }
      }),
      viteCompression({
        ext: '.gz',
        deleteOriginFile: false
      })
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    },
    server: {
      host: '0.0.0.0',
      port: 9528,
      open: false,
      cors: true,
      proxy: {
        '/apis': {
          target: env.VITE_BASIC_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, '/apis/')
        }
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //禁用debugger
          drop_debugger: true,
          //禁用console
          drop_console: true
        }
      }
    }
  }
})
