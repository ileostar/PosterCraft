// "https://github.com/Allen-1998/pinia-auto-refs"
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
import type { AutoToRefs, ToRef } from 'vue'

import homeStore from '@/store/home'

import store from '@/store'

declare module 'vue' {
  export type AutoToRefs<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
  }
}

const storeExports = {
  home: homeStore,
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const targetStore = storeExports[storeName](store)
  const storeRefs = storeToRefs(targetStore)
  return { ...targetStore, ...storeRefs } as unknown as AutoToRefs<ReturnType<typeof storeExports[T]>>
}
