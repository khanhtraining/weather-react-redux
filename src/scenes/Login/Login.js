import React, { useEffect, useState } from 'react'
import { getToken, saveToken } from '../../auth'
import { SERVER_ADRESS } from '../../commons/utils'
import './_login.scss'

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)
  const handleChangUsername = e => {
    setUsername(e.target.value)
  }
  const handleChangePassword = e => {
    setPassword(e.target.value)
  }
  const handleSubmit = async e => {
    const loginUser = async () => {
      return fetch(`${SERVER_ADRESS}/login?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .catch((e) => {
          setError(e)
        })
    }
    e.preventDefault()
    const foundUser = await loginUser({
      username,
      password
    })
    if (foundUser) {
      saveToken(foundUser)
      window.location.replace('/')
    }
  }
  useEffect(() => {
    if (getToken()) {
      window.location.replace('/')
    }
  }, [])
  return (
    <div className='logreg-forms welcome-background'>
      <form className='form-signin'>
        <h3>Sign in</h3>
        <div className='form-group'>
          <label>Username</label>
          <input type='name' className='form-control' value={username} onChange={handleChangUsername} placeholder='Enter Username' />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control' value={password} onChange={handleChangePassword} placeholder='Enter password' />
        </div>
        {error && <span className='text-danger form-signin'>Username or password incorrect! </span>}
        <div className='form-group'>
          <div className='custom-control custom-checkbox'>
            <input type='checkbox' className='custom-control-input' id='customCheck1' />
            <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>
          </div>
        </div>
        <button type='submit' className='btn btn-primary btn-block' onClick={handleSubmit}>Submit</button>
        <p className='forgot-password text-right'>
          Forgot <a href='#'>password?</a>
        </p>
      </form>
    </div>
  )
}

export default Login
