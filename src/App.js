import React, { Component } from 'react';
import TodoList from './todo/todoList'
import ReduxTodoList from './todo/redux-todo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoList />
        <ReduxTodoList />
      </div>
    );
  }
}

export default App;
