import React from 'react';
import './Todo.scss';

import Taglist from './Taglist';

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

  const completeC = () => props.status === 'u' ?
    <button onClick={e => putStatus(e, 'c')}>mark complete</button> :
    <button onClick={e => putStatus(e, 'u')}>mark incomplete</button>;

  return (
    <li className={props.status} key={props.id}>
      {completeC()}
      <p className={props.status}>{props.desc}</p>
      <Taglist tags={props.tags} id={props.id} token={props.token} setTabBank={props.setTabBank}/>
    </li>
  );
};

export default Todo;