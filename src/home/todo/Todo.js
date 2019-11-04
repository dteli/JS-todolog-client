import React from 'react';
import './Todo.scss';

import Taglist from './Taglist';
import Priority from './Priority';

const BASEURL = 'http://localhost:3012/todo';

const Todo = (props) => {

  const putStatus = (e, s) => {
    e.preventDefault();
    fetch(BASEURL+'/'+props.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      body: JSON.stringify({todoitem:{completed:s}})
    }).then(r => r.json())
      .then(rjs => console.log(rjs))
      .then(props.getTodos)
      .catch(err => console.log(err.message));
  };

  const putPriority = (e, p) => {
    e.preventDefault();
    fetch(BASEURL+'/'+props.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      body: JSON.stringify({todoitem:{priority:parseInt(p, 10)}})
    }).then(r => r.json())
      .then(rjs => console.log(rjs))
      .then(props.getTodos)
      .catch(err => console.log(err.message));
  };

  const completeC = () => props.status === 'u' ?
    <button onClick={e => putStatus(e, 'c')}>–</button> :
    <button onClick={e => putStatus(e, 'u')}>✓</button>;

  return (
    <li className={"todo-item "+props.status} key={props.id}>
      {completeC()}
      <p className={props.status}>{props.desc}</p>
      <div className="todo-spacer"></div>
      <Taglist tags={props.tags} id={props.id} token={props.token} setTabBank={props.setTabBank}/>
      <Priority priority={props.priority} putPriority={putPriority}/>
    </li>
  );
};

export default Todo;