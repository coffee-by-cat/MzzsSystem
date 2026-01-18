import request from '@/utils/request'

/**
 * 用户登录
 * @param {Object} data 登录参数 {username, password}
 * @returns {Promise}
 */
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/**
 * 用户登出
 * @returns {Promise}
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

/**
 * 验证token
 * @returns {Promise}
 */
export function validateToken() {
  return request({
    url: '/auth/validate',
    method: 'get'
  })
}
