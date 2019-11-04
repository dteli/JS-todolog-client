import React, {useState, useEffect} from 'react';
import './App.scss';

import Navbar from './home/Navbar';
import Sidebar from './home/Sidebar';
import Auth from './home/Auth';
import Todolist from './home/Todolist';
import Footer from './home/Footer';

function App() {

  const [token, setToken] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      setLoggedIn(true);
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setLoggedIn(true);
    //console.log(newToken);
  }

  const sideVC = () => loggedIn === true ?  <Sidebar/> : <Auth updateToken={updateToken}/>;
  const todoVC = () => loggedIn === true ? <Todolist loggedIn={loggedIn} token={token}/> : null;

  return (
    <div className="App">
      <Navbar updateToken={updateToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <div id="mainContainer">
        {sideVC()}
        {todoVC()}
      </div>
      <Footer />
    </div>
  );
}

export default App;
