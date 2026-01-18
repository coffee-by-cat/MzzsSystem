import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref(localStorage.getItem('token') || '')

  const isLogin = computed(() => !!token.value)

  function setUserInfo(info) {
    userInfo.value = info
  }

  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  function logout() {
    userInfo.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  return {
    userInfo,
    token,
    isLogin,
    setUserInfo,
    setToken,
    logout
  }
})
