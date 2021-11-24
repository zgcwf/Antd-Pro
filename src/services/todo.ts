import request from "@/utils/request";

/**
 * 获取所有的TodoList
 */
export const getTodoLists = async () => {
  return request('/api/todolists')
}

/**
 * 添加TodoList
 */
export const add = async (data) => {
  const url = '/api/todo'
  const options = {
    data
  }
  return request.post(url, options)
}

/**
 * 修改TodoList状态
 */
export const edit = async (data) => {
  const url = '/api/edit'
  const options = {
    data
  }
  return request.put(url, options)
}
