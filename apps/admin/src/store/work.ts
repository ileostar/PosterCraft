import { defineStore } from 'pinia'
import { ref } from 'vue'

// 工作区信息接口
interface IWorkInfo {
  title: string
  desc?: string
  coverImg?: string
  content: Record<string, any>
  isTemplate?: boolean
  isPublic?: boolean
  status?: number
  author?: string
  userId?: string
  workId?: string
}

// 工作区列表响应接口
interface IWorkListResponse {
  count: number
  pageIndex: number
  pageSize: number
  list: IWorkInfo[]
}

// URL响应接口
interface IURLResponse {
  url: string
  pageId: string
}

export default defineStore('work', () => {
  // 当前工作区信息
  const workInfo = ref<IWorkInfo>({} as IWorkInfo)

  // 更新当前工作区信息
  const updateWorkInfo = (payload: IWorkInfo) => {
    workInfo.value = payload
  }

  // 所有工作区列表
  const allWorks = ref<IWorkInfo[]>([])

  // 工作区列表分页信息
  const worksPagination = ref({
    count: 0,
    pageIndex: 1,
    pageSize: 10,
  })

  // 更新工作区列表
  const updateAllWorks = (payload: IWorkListResponse) => {
    allWorks.value = payload.list
    worksPagination.value = {
      count: payload.count,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
    }
  }

  // 用户工作区列表
  const userWorks = ref<IWorkInfo[]>([])

  // 用户工作区分页信息
  const userWorksPagination = ref({
    count: 0,
    pageIndex: 1,
    pageSize: 10,
  })

  // 更新用户工作区列表
  const updateUserWorks = (payload: IWorkListResponse) => {
    userWorks.value = payload.list
    userWorksPagination.value = {
      count: payload.count,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
    }
  }

  // 模板工作区列表
  const templateWorks = ref<IWorkInfo[]>([])

  // 模板工作区分页信息
  const templateWorksPagination = ref({
    count: 0,
    pageIndex: 1,
    pageSize: 10,
  })

  // 更新模板工作区列表
  const updateTemplateWorks = (payload: IWorkListResponse) => {
    templateWorks.value = payload.list
    templateWorksPagination.value = {
      count: payload.count,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
    }
  }

  // 发布/预览URL信息
  const publishInfo = ref<IURLResponse | null>(null)

  // 更新发布/预览信息
  const updatePublishInfo = (payload: IURLResponse) => {
    publishInfo.value = payload
  }

  // 清除发布/预览信息
  const clearPublishInfo = () => {
    publishInfo.value = null
  }

  return {
    workInfo,
    updateWorkInfo,
    allWorks,
    worksPagination,
    updateAllWorks,
    userWorks,
    userWorksPagination,
    updateUserWorks,
    templateWorks,
    templateWorksPagination,
    updateTemplateWorks,
    publishInfo,
    updatePublishInfo,
    clearPublishInfo,
  }
})
