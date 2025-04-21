/* eslint-disable unused-imports/no-unused-vars */
interface IUserInfo {
  userId: string
  username: string
  role: string
  email: string
}

export default defineStore('user', () => {
  const userInfos = ref<IUserInfo>(JSON.parse(localStorage.getItem('userInfos') || '{}'))

  const updateUserInfos = (payload: IUserInfo) => {
    userInfos.value = payload
    localStorage.setItem('userInfos', JSON.stringify(payload))
  }

  const allUsers = ref<IUserInfo[]>([])

  const updateAllUsers = async () => {
    try {
      const res = await user.getAllUsers()
      allUsers.value = res.data
    }
    catch (_e) {
      ElMessage.error('获取所有用户失败')
    }
  }

  return {
    userInfos,
    updateUserInfos,
    allUsers,
    updateAllUsers,
  }
})
