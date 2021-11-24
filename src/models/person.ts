/* eslint-disable no-console */
import {getPerson} from '@/services/person'

export default {
  namespace: 'person',

  state: {
    persons: []
  },

  effects: {
    *fetchPersons(_, {call, put}){
      const data = yield call(getPerson)
    console.log('data',data);
      
      yield put({
        type: 'setPersons',
        payload: data
      })
    }
  },

  reducers: {
    setPersons(state, action) {
      return {
        ...state,
        persons: action.payload
      }
    }
  }
}
