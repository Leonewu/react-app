
import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, delTodo, updateTodo } from '../redux/actions'
import('./todo.less')



/* 
  redux核心概念
    1. 全局store状态树
    2. state，组件通过dispatch一个action到reducer，reducer根据之前的state和action生成新的state
    3. 不能直接改变state
    4. react-redux 的connect时将reducer和state通过props的形式传给对应的组件  
*/

/* 
  react hooks
    1. react hooks 改变原来类的写法，不再围绕生命周期去写组件
    2. 通过useState和useEffect增强了函数组件的功能
    3. 同时useEffect又相当于mixin，可以复用组件的effect和state，在过去只能通过高阶组件去完成mixin的功能
*/

function TodoListItem(props) {

  const { item } = props
  const dispatch = useDispatch()
  function toggleComplete() {
    item.completed = !item.completed
    dispatch(updateTodo(item.id, item))
  }
  function editTodo(value) {
    if (item.text !== value && value.trim() !== '') {
      item.text = value.trim()
      dispatch(updateTodo(item.id, item))
    }
  }
  return (
    <React.Fragment>
      <li className={`${item.completed ? "completed" : ''} todoItem`}>
        {props.editIndex !== props.index ? (
          <span
            onClick={() => {
              if (props.editIndex !== props.index) {
                props.setEditIndex(props.index)
              }
            }
            }
          >
            {item.text}
          </span>) : (
            <Input
              onBlur={(e) => {
                editTodo(e.target.value)
                props.setEditIndex(-1)
              }}
              onPressEnter={(e) => { 
                editTodo(e.target.value)
                props.setEditIndex(-1) 
              }}
              defaultValue={item.text}
              autoFocus 
            />
          )}
        <span className="todoItem-btn">
          <img
            onClick={toggleComplete}
            alt=""
            src={item.completed ? "assets/check_active.png" : "assets/check.png"}
          />
          <img onClick={() => {
            props.deleteItem(props.index)
          }} alt="" src="assets/close.png" />
        </span>
      </li>
    </React.Fragment>
  )
}

function TodoList() {
  let lists = [
    { id: 1, text: 'react hooks' },
    { id: 2, text: 'redux' },
    { id: 3, text: 'compare tcp with udp' },
    { id: 4, text: 'http->http1.0->http2.0 https' },
    { id: 5, text: 'grid' }
  ]
  const list = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [editIndex, setEditIndex] = useState(-1)
  const [value, setValue] = useState('')
  useEffect(() => {
    return () => {
    }
  })
  function deleteItem(index) {
    dispatch(delTodo(index))
    if (index === editIndex) {
      setEditIndex(-1)
    }
  }
  function addItem() {
    if (value.trim() === '') return
    const item = { text: value.trim() }
    dispatch(addTodo(item))
    setValue('')
  }
  return (
    <React.Fragment>
      <ul className="todoList">
        <li>
          <Input
            className="todoList-input"
            placeholder="add todos and go with enter"
            onPressEnter={addItem}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size="large"
          />
        </li>
        <TransitionGroup>
          {list.map((item, index) => (
            <CSSTransition
              key={item.id}
              timeout={500}
              classNames="todoList"
            >
              <TodoListItem key={item.id} {...{ item, index, editIndex, setEditIndex, deleteItem }} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </React.Fragment>
  )

}

export default TodoList