import React, {useState} from 'react';
import { handleLogin } from '../../services/auth'
import Layout from '../../components/layout'
import { navigate } from '@reach/router';

const SignIn = () => {

const [processing, setProcessing] = useState(false)
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
  const handleSubmit = (event) => {
  event.preventDefault()
  setProcessing(true)

  if(!username && !password) {
    setProcessing(false)
    setError("Incorrect username or password, please try again.")
  }else{
    handleLogin(username, password).then((res) => {
      if(res != undefined && res) {
        localStorage.setItem('username', JSON.stringify(username));
        setProcessing(false);
        navigate("/", {state: {message: 'You are now logged in'}})
      }else {
        setProcessing(false)
        setError("User name and password doesn't exist")
      }
    })
  }
}

return (
    <Layout>
      <div className="login-page-wrapper">
        <h3 className="title-28 text-center">Login Form</h3>
        {error && <div className="form-error"><p>{error}</p></div>}
        <form noValidate className="login" id="logIn">
          <fieldset>
            <div className="form-element">
              <label>username</label>
              <input
                className="form-input"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={event =>
                  setUsername(event.target.value)
                }
              />
            </div>
            <div className="form-element">
              <label>Password</label>
              <input
                className="form-input"
                name="password"
                type="password"
                id="passwordSignin"
                value={password}
                placeholder="Password"
                onChange={event =>
                  setPassword(event.target.value)
                }
              />
            </div>
            {
              processing ?
                <div className="text-center">Loading...</div>
                :
                <button
                  onClick={handleSubmit}
                  className="button-black w-full"
                  type="submit">
                  Login
                </button>
            }
          </fieldset>
        </form>
    </div>
  </Layout>
)
}
export default SignIn;