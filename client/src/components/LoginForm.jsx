import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = ({ user, setter, operation, errors }) => {

    return (
        <div className="d-flex justify-content-start" style={{
            backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            minHeight:"1000px"
        }}>
            <div className="card shadow p-5 m-5" style={{ background: "#95cde7", width: "600px" }}>
                <div className=''>
                    <img src="https://electronicstore.com.pe/skin/frontend/em0145/electronic/images/logo_scale.png" style={{ width: "500px" }} />
                </div>
                <form className='mt-1' onSubmit={(e) => operation(e, user)}>

                    <div className="form-group mt-5 mb-5">
                        <input type="email" className="form-control"
                            onChange={(e) => setter({ ...user, email: e.target.value })}
                            value={user.email}
                            placeholder='Your Email'
                        />
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className="form-group mt-5 mb-3">
                        <input type="password" className="form-control"
                            onChange={(e) => setter({ ...user, password: e.target.value })}
                            value={user.password}
                            placeholder='Your Password'
                        />
                        {errors.password && <span className='text-danger h5'> {errors.password}</span>}
                    </div>

                    <div className='mt-5 mb-5 text-center'>
                        <button className='btn btn-outline-primary w-50'>Login</button>
                    </div>
                    <div className="text-center mt-3">
                        <Link to={'/register'}>Dont have an account ? Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm