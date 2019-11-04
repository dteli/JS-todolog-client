import React, {useState} from 'react';
import './Auth.scss';

const BASEURL = 'http://localhost:3012/user';


const Auth = (props) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [signup, setSignup] = useState(true);

  const submit = (e) => {
    e.preventDefault();
    const url = signup ? BASEURL + '/newuser' : BASEURL + '/signin';
    const reqBody = {
      user: {
        username: email,
        password: pass
      }
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then(r => r.json())
      .then(rjson => props.updateToken(rjson.sessionToken))
      .catch(err => console.log(err.message));
  };

  const loginToggle = (e) => {
    e.preventDefault();
    setSignup(!signup);
  };

  return(
    <div id="auth">
      <form onSubmit={e => submit(e)}>
        <h1>{signup ? 'signup' : 'login'}</h1>
        <label htmlFor="email">Email</label>
        <input name="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
        <br/>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" value={pass} onChange={e => setPass(e.target.value)} required></input>
        <br/>
        <button type="button" onClick={e => loginToggle(e)}>{signup ? 'login' : 'signup'}</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Auth;