import {getTodoLists} from "@/services/todo";

export default {
  namespace: 'todo',

  state: {
    todoList: []
  },

  effects: {
    *getTodoList(_: any, {call, put}: any) {
      // 调用方法获取数据
      const resData = yield call(getTodoLists)
      yield put({
        type: 'setTodoList',
        payload: resData
      })
    }
  },

  reducers: {
    setTodoList(state: any, action: { payload: any; }) {
      return {
        ...state,
        todoList: action.payload
      }
    }
  }
}
