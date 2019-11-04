import React, {useState, useEffect} from 'react';
import './Todolist.scss';

import Todo from './Todo';

const BASEURL = 'http://localhost:3012/todo'


const Todolist = (props) => {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const getTodos = () => {
    if (props.loggedIn) {
      const url = BASEURL;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': props.token
        }
      
    }).then(r => r.json())
      .then(rjs => {console.log(rjs); setTodos(rjs);})
    }
  }

  useEffect(() => {
    getTodos();
  }, [props.loggedIn]);


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
      .then(() => getTodos())
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
      .then(() => getTodos())
      .catch(err => console.log(err.message));
  };

  return (
    <div id="todomain">
      <form onSubmit={e => submitTodo(e)}>
        <input placeholder="new todo item" value={newTodo} onChange={e => setNewTodo(e.target.value)}></input>
        <button type="submit">add new todo</button>
        <button type="button" onClick={e => clearCompleted(e)}>clear completed</button>
      </form>
      <ul>
        {todos.map(td => <Todo key={td.id} id={td.id} desc={td.description} status={td.completed}
                               token={props.token} getTodos={getTodos}/>)}
      </ul>
    </div>
  );
}

export default Todolist;