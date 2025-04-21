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

  const updateAllUsers = async (payload: IUserInfo[]) => {
    allUsers.value = payload
  }

  return {
    userInfos,
    updateUserInfos,
    allUsers,
    updateAllUsers,
  }
})
