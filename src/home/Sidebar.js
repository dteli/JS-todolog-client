import React from 'react';
import './Sidebar.scss';

import Tag from './todo/Tag';


const Sidebar = (props) => {

  return (
    <div id="sidebar">
      <div id="sidebar-tags">
        <h3>Tags</h3>
        {props.tagBank.map((t, i) => <Tag key={i} id={t}/>)}
      </div>
    </div>
  )
}

export default Sidebar;