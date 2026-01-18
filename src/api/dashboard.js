import request from '@/utils/request'

/**
 * 获取统计数据
 * @returns {Promise}
 */
export function getStatistics() {
  return request({
    url: '/dashboard/statistics',
    method: 'get'
  })
}

/**
 * 获取待处理任务列表
 * @returns {Promise}
 */
export function getPendingTasks() {
  return request({
    url: '/dashboard/pending-tasks',
    method: 'get'
  })
}

/**
 * 按窗口获取统计数据
 * @param {String} windowNo 窗口号
 * @returns {Promise}
 */
export function getStatisticsByWindow(windowNo) {
  return request({
    url: `/dashboard/statistics/${windowNo}`,
    method: 'get'
  })
}
