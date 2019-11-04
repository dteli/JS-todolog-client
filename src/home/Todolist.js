import React, {useState, useEffect} from 'react';
import * as R from 'ramda';
import './Todolist.scss';

import Todo from './todo/Todo';

const BASEURL = 'http://localhost:3012/todo'


const Todolist = (props) => {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const getTodos = () => {
    if (props.loggedIn) {
      fetch(BASEURL, {
        method: 'GET',
        headers: {
          //'Content-Type': 'application/json',
          'Authorization': props.token
        }
      
    }).then(r => r.json())
      .then(rjs => setTodos(rjs))
    }
  }

  useEffect(getTodos, [props.loggedIn]);


  const submitTodo = (e) => {
    e.preventDefault();
    fetch(BASEURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      body: JSON.stringify({
        todoitem: {
          description: newTodo
        }
      })
    }).then(r => r.json())
      .then(rjs => console.log(rjs))
      .then(getTodos)
      .then(() => setNewTodo(''))
      .catch(err => console.log(err.message));
  };

  const clearCompleted = (e) => {
    e.preventDefault();
    fetch(BASEURL+'/clearcomplete', {
      method: 'DELETE',
      headers: {
        'Authorization': props.token
      }
    }).then(r => r.json())
      .then(rjs => console.log(rjs))
      .then(getTodos)
      .catch(err => console.log(err.message));
  };

  const [sortAsc, setSortAsc] = useState(true);
  const sortTodos = (method) => { sortAsc ?
    setTodos(R.reverse(R.sortBy(R.prop(method), todos))) :
    setTodos(R.sortBy(R.prop(method), todos));
    setSortAsc(!sortAsc);
  };

  // {sortCreatedAsc ? '↑' : '↓'}

  return (
    <div id="todo-main">
      <div id="todo-sortbox">
        <p>sort by ({sortAsc ? '↑' : '↓'})</p>
        <button type="button" onClick={()=>sortTodos("createdAt")}>created</button>
        <button type="button" onClick={()=>sortTodos("updatedAt")}>modified</button>
        <button type="button" onClick={()=>sortTodos("priority")}>priority</button>
        <button type="button" onClick={()=>sortTodos("description")}>alpha</button>
        <button type="button" onClick={()=>sortTodos("completed")}>completed</button>
      </div>
      <form onSubmit={e => submitTodo(e)}>
        <input placeholder="new todo item" value={newTodo} onChange={e => setNewTodo(e.target.value)}></input>
        <button type="submit">add new todo</button>
        <button type="button" onClick={e => clearCompleted(e)}>clear completed</button>
      </form>
      <ul class="todo-ul">
        {todos.map(td => <Todo key={td.id} id={td.id} desc={td.description} status={td.completed}
                               token={props.token} tags={td.tags} getTodos={getTodos}
                               priority={td.priority}
                               setTabBank={props.setTabBank}/>)}
      </ul>
    </div>
  );
}

export default Todolist;