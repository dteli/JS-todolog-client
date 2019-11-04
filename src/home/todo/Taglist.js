import React, {useState} from 'react';
import './Taglist.scss';

import Tag from './Tag';

const BASEURL = 'http://localhost:3012/todo'

const Taglist = (props) => {

  const [tags, setTags] = useState(props.tags);
  const [newTag, setNewTag] = useState('');

  const change = (e) => {
    e.preventDefault();
    setNewTag(e.target.value);
    if (e.target.value.endsWith(',')) {
      setNewTag(e.target.value.slice(0, e.target.value.length - 1));
      putTags().then(getTags);
      setNewTag('');
    }
  };

  const getTags = () => fetch(BASEURL+'/'+props.id+'/tags', {
    method: 'GET',
    headers: {
      'Authorization': props.token
    }
  }).then(r => r.json())
    .then(rjs => setTags(rjs))
    .catch(err => console.log(err.message));

  const putTags = () => fetch(BASEURL+'/'+props.id+'/tags', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      },
      body: JSON.stringify({todoitem:{newTag}})
  }).then(r => r.json())
    .then(rjs => console.log(rjs));

  

  return (
    <ul className="todo-taglist">
      {tags.map((t, i) => <Tag key={i} id={t} parentId={props.id} token={props.token} getTags={getTags}/>)}
      <li>
        <input placeholder="enter new tag" value={newTag} onChange={e => change(e)}></input>
      </li>
    </ul>
  );
};

export default Taglist;