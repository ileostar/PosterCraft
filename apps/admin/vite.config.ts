/// <reference types="vitest" />

import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'vite'
import type { CommonServerOptions, ConfigEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import PiniaAutoRefs from 'pinia-auto-refs'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import VueDevtools from 'vite-plugin-vue-devtools'
import { OnuResolver } from 'onu-ui'
import ViteRestart from 'vite-plugin-restart'
import type { DotenvParseOutput } from 'dotenv'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`

  let server: CommonServerOptions = {}
  const envDate = fs.readFileSync(curEnvFileName)
  const envMap: DotenvParseOutput = dotenv.parse(envDate)

  server = {
    port: Number(envMap.VITE_PORT) || 3891,
    host: envMap.VITE_HOST || 'localhost',
    proxy: {
      [envMap.VITE_BASE_URI || '/api']: {
        target: envMap.VITE_PROXY_DOMAIN || 'localhost',
      },
    },
  }

  return {
    server,
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    plugins: [
    // https://github.com/vue-macros/vue-macros
      VueMacros({
        defineOptions: false,
        defineModels: false,
        plugins: {
          vue: Vue({
            script: {
              propsDestructure: true,
              defineModel: true,
            },
          }),
        },
      }),

      ViteRestart({
        restart: [
          'vite.config.[jt]s',
        ],
      }),

      VueDevtools(),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        dts: './types/vue-router.d.ts',
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'pinia',
          '@vueuse/core',
          VueRouterAutoImports,
          {
            alova: [
              'useRequest',
              'useWatcher',
              'useFetcher',
            ],
          },
          {
            '@/helper/pinia-auto-refs': ['useStore'],
            'vue-router/auto': ['useLink'],
          },
        ],
        // Enable auto import by filename for default module exports under directories
        defaultExportByFilename: false,

        resolvers: [
          // Auto import UI components
          // 自动导入ElementPlus组件
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver(),

          // Auto import Onu UI components
          // 自动导入Onu UI组件
          OnuResolver(),
        ],
        dts: './types/auto-imports.d.ts',
        dirs: [
          './src/components',
          './src/store',
          './src/composables',
        ],
        vueTemplate: true,
        injectAtEnd: true,

      }),

      // https://github.com/Allen-1998/pinia-auto-refs
      PiniaAutoRefs(),

      // https://github.com/antfu/vite-plugin-components
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),

          // Auto import Onu UI components
          // 自动导入Onu UI组件
          OnuResolver(),
        ],
        dts: './types/components.d.ts',
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      UnoCSS(),

      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
    ],
    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
