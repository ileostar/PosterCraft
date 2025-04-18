# Alova请求

## 使用

如果要使用Alova请求，首先要根目录下`.env`中配置请求根路径

```txt
VITE_ALOVA_BASE_URI = 'https://api.liuxinghao.top/'   // 改成自己的网络请求
```

## 拦截器/配置修改

在`src/api/index.ts`下面可以修改拦截器以及alova实例配置，为了方便我直接把接口改成统一传参

定义接口可以`src/api/methods`下根据分类定义接口

**下面是一个demo**

```typescript
import http from '..'

export default {
  // 接口一
  getHello: () => {
    return http.get('')
  },

  // 接口一
  findAll: (pageNum: number, pageCount: number) => {
    return http.get('/user/findAll', {
      pageNum,
      pageCount,
    })
  },
}
```

## 最后是一个个人风格

可以在`src/composables`下面写api的请求操作及返回

**下面是一个demo**

```typescript
import user from '@/api/methods/user'

export default {
  getHello: () => {
    const { data, onSuccess } = useRequest(user.getHello)

    return {
      helloMsg: data,
      gethelloMsgSucceed: onSuccess,
    }
  },
  findAll: (pageNum: number, pageCount: number) => {
    const { data, onSuccess } = useRequest(user.findAll(pageNum, pageCount))

    return {
      findAll: data,
      getfindAllSucceed: onSuccess,
    }
  },
}
```
