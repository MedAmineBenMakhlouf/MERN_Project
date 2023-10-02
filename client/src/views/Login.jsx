import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ baseUrl }) => {
  const [user, setUser] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const login = (e, loginUser) => {
    e.preventDefault()
    console.log("login user");
    console.log(loginUser);
    axios.post(baseUrl + '/login', loginUser, { withCredentials: true })
      .then(res => {
        console.log("-----------",res.data)
        res.data.role=='user'
        ? navigate('/dashboardUser')
        : navigate('/dashboardAdmin')
      })
      .catch(error => {
        const errs = {
          email: "",
          password: "",
        }
        for (let key of Object.keys(error.response.data.errors)) {
          console.log(error.response.data.errors[key].message)
          errs[key] = error.response.data.errors[key].message
        }
        setErrors({ ...errors, ...errs })
      }
      )
  }
  return (
    <div>
      <LoginForm user={user} setter={setUser} operation={login} errors={errors}/>
    </div>
  )
}

export default Login