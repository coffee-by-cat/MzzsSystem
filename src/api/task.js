import request from '@/utils/request'

/**
 * 获取任务列表
 * @param {Object} params 查询参数
 * @returns {Promise}
 */
export function getTaskList(params) {
  return request({
    url: '/task/list',
    method: 'get',
    params
  })
}

/**
 * 获取任务详情
 * @param {String} taskId 任务ID
 * @returns {Promise}
 */
export function getTaskDetail(taskId) {
  return request({
    url: `/task/detail/${taskId}`,
    method: 'get'
  })
}

/**
 * 获取任务药品列表
 * @param {String} taskId 任务ID
 * @returns {Promise}
 */
export function getTaskDrugs(taskId) {
  return request({
    url: `/task/${taskId}/drugs`,
    method: 'get'
  })
}

/**
 * 创建任务
 * @param {Object} data 任务数据
 * @returns {Promise}
 */
export function createTask(data) {
  return request({
    url: '/task/create',
    method: 'post',
    data
  })
}
