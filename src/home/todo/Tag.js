import React from 'react';

const BASEURL = 'http://localhost:3012/todo';

const Tag = (props) => {


  const deleteTag = (e) => {

    fetch(BASEURL+'/delete/'+props.parentId+'/tags/'+props.id, {
      method: 'DELETE',
      headers: {
        'Authorization': props.token
      }
    }).then(r => r.json())
      .then(rjs => console.log(rjs))
      .then(props.getTags)
      .catch(err => console.log(err.message));
  };

  return (
    <li onClick={e => deleteTag(e)}>{props.id}</li>
  );
};

export default Tag;