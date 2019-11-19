import { createStore, combineReducers } from 'redux'

import { ADD_TODO, DEL_TODO, UPDATE_TODO } from './types'

const initialState = {
  todos: [],
  user: {}
}

const rootReducers = combineReducers({
  todos,
  user
})

function user(user = {}, action) {
  return user
}

function todos(todos = [], action) {
  switch(action.type) {
    case ADD_TODO:
      const id = todos.reduce((max, todo) => {
        max = todo.id > max ? todo.id : max
        return max
      }, 0) + 1
      const item = { id, text: action.item.text, completed: false }
      return [ ...todos, item ]
    case DEL_TODO:
      return todos.filter((todo, index) => index !== action.index)
    case UPDATE_TODO:
      return todos.map(todo => {
        if (todo.id === action.id) {
          return action.item
        }
        return todo
      })
    default:
      return todos
  }
}

export { rootReducers, initialState }