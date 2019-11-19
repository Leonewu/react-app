
import { ADD_TODO, DEL_TODO, UPDATE_TODO } from './types'


function addTodo(item) {
  return {
    type: ADD_TODO,
    item
  }
}

function delTodo(index) {
  return {
    type: DEL_TODO,
    index
  }
}

function updateTodo(id, item) {
  return {
    type: UPDATE_TODO,
    id,
    item
  }
}

export {
  addTodo, delTodo, updateTodo
}