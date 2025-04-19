interface IUserInfo {
  userId: string
  username: string
  role: string
  email: string
}

export default defineStore('user', () => {
  const userInfos = ref<IUserInfo>({} as IUserInfo)

  const updateUserInfos = (payload: IUserInfo) => {
    userInfos.value = payload
  }

  return {
    userInfos,
    updateUserInfos,
  }
})
