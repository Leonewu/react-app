
import React, { useState, useEffect } from 'react'
import {  Input } from 'antd'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import('./todo.less')

/* react hook 总结：
    1. 可以有自定义的hooks，不一定需要return 模板出去，有什么用呢，初步认为是某些可复用的effect和state，类似于mixin的功能
    2. useEffect有多少个就执行多少个，只要有变量更新了，都会执行，是组件内全局的effect
    3. 如何控制useEffect,可以传入第二个参数[count]，表示只有在count变化的时候才会调用这个effect
*/

/* grid总结：
    1. grid中有容器和项目还有单元格的概念，容器是最外层声明grid的元素，项目是容器下面的第一层元素，单元格式行和列的交叉区域，项目放在单元格里面
    2. place-items设置的是单元格中项目的对齐方式（左，右，居中）
    3. 通过 dense 这个属性，支持响应式布局
*/
function TodoListItem(props) {

  const [item, setItem] = useState(props.item)
  function toggleComplete() {
    item.completed = !item.completed
    setItem({ ...item })
  }
  function editTodo(value) {
    if (item.text !== value && value.trim() !== '') {
      item.text = value.trim()
      setItem({ ...item })
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
              }}
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
              autoFocus/>
        )}
        <span className="todoItem-btn">
          <img 
            onClick={toggleComplete}
            alt="" 
            src={item.completed ? "assets/check_active.png" : "assets/check.png"}
          />
          <img onClick={() => {
            props.deleteItem(props.index)
          }} alt="" src="assets/close.png"/>
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
  const [list, setList] = useState(lists)
  const [editIndex, setEditIndex] = useState(-1)
  const [value, setValue] = useState('')
  useEffect(() => {
    return () => {
    }
  })
  function deleteItem(index) {
    if (list[index]) {
      list.splice(index, 1)
      setList([...list])
      if (index === editIndex) {
        setEditIndex(-1)
      }
    }
  }
  function addItem() {
    if (value.trim() === '') return
    const id = list.reduce((max, item) => {
      max = item.id > max ? item.id : max
      return max
    }, 0) + 1
    const item = { id, text: value.trim(), completed: false }
    list.push(item)
    setList([...list])
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
              <TodoListItem key={item.id} {...{ item, index, editIndex, setEditIndex, deleteItem}} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </React.Fragment>
  )

}

export default TodoList