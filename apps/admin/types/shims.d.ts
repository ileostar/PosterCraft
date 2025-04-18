import 'dotenv'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const vueComponent: DefineComponent<object, object, unknown>
  export default vueComponent
}

declare module 'dotenv' {
  export interface DotenvParseOutput {
    VITE_ALOVA_BASE_URI: string
    VITE_HOST: string
    VITE_PORT: number
    VITE_PROXY_DOMAIN: string
    VITE_BASE_URI: string
  }
}
