import {getTodoLists} from "@/services/todo";

export default {
  namespace: 'todo',

  state: {
    todoList: []
  },

  effects: {
    *getTodoList(_, {call, put}) {
      // 调用方法获取数据
      const resData = yield call(getTodoLists)
      yield put({
        type: 'setTodoList',
        payload: resData
      })
    }
  },

  reducers: {
    setTodoList(state, action) {
      return {
        ...state,
        todoList: action.payload
      }
    }
  }
}
