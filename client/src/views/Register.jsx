import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = ({ baseUrl }) => {
  const [user, setUser] = useState({
    role:"",
    userName: "",
    email: "",
    country:"",
    governorate: "",
    city: "",
    phoneNumber: null,
    password: "",
    confirmPassword: "",

  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  
  const register = async (e, newUser) => {
    e.preventDefault();
    await axios.post(baseUrl + '/register', newUser, { withCredentials: true })
      .then(res => {
        console.log(res.data.role)
        res.data.role=='user'
        ? navigate('/dashboardUser')
        : navigate('/dashboardAdmin')
      })
      .catch(error => {
        const errs = {
          role:"",
          userName: "",
          email: "",
          country:"",
          governorate: "",
          city: "",
          phoneNumber: null,
          password: "",
          confirmPassword: "",
        }
        for (let key of Object.keys(error.response.data.errors)) {
          console.log(error.response.data.errors[key].message)
          errs[key] = error.response.data.errors[key].message
        }
        setErrors({ ...errors, ...errs })
      }
      )

    setUser({
      role:"",
      userName: "",
      email: "",
      country:"",
      governorate: "",
      city: "",
      phoneNumber: 0,
      password: "",
      confirmPassword: ""
    })

  }
  return (
    <div>
      <RegisterForm user={user} setter={setUser} operation={register} errors={errors} />
    </div>
  )
}

export default Register