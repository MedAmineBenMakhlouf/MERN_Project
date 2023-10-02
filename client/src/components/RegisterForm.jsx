import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const RegisterForm = ({ user, setter, operation, errors }) => {
    const [data, setData] = useState([])
    const [getSates, setStates] = useState([]);
    const [getCities, setCities] = useState([]);
    useEffect(() => {
        axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
            .then(res => setData(res.data))
            .catch(error => console.log(error))
    }, []);
    const ArrayCountry = [...new Set(data.map(item => item.country))]
    ArrayCountry.sort((a, b) => b.localeCompare(a))

    const handleCountry = (e) => {
        setter({ ...user, country: e.target.value })
        let ArrayStates = data.filter(state => state.country === e.target.value)
        ArrayStates = [... new Set(ArrayStates.map(country => country.subcountry))]
        ArrayStates.sort()
        setStates(ArrayStates)
    }

    const handleState = (e) => {
        setter({ ...user, governorate: e.target.value })
        let ArrayCities = data.filter(city => city.subcountry === e.target.value)
        setCities(ArrayCities)
    }

    return (
        <div className="p-5 d-flex justify-content-start" style={{
            backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover"
        }}>


            <div className="card shadow p-5" style={{ background: "#95cde7", width: "600px" }}>
                <div>
                    <img src="https://electronicstore.com.pe/skin/frontend/em0145/electronic/images/logo_scale.png" style={{ width: "500px" }} />
                </div>
                <form onSubmit={(e) => operation(e, user)}>
                    <div className="form-group mb-3">
                        <select className="form-control"
                            onChange={(e) => setter({ ...user, role: e.target.value })}
                            value={user.role}>
                            <option value="">who are you?</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <span className='text-danger'> {errors.role}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control"
                            onChange={(e) => setter({ ...user, userName: e.target.value })}
                            value={user.userName}
                            placeholder='Your Name'
                        />
                        {errors.userName && <span className='text-danger'> {errors.userName}</span>}
                    </div>

                    <div className="form-group mb-3">
                        <input type="email" className="form-control"
                            onChange={(e) => setter({ ...user, email: e.target.value })}
                            value={user.email}
                            placeholder='Your Email'
                        />
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <select className="form-control"
                            onChange={(e) => handleCountry(e)}
                            value={user.country}>
                            <option value="">----Select your Country----</option>
                            {ArrayCountry.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <select className="form-control"
                            onChange={(e)=>handleState(e)}
                            value={user.governorate}>
                            <option value="">----Select your State----</option>
                            {getSates.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <select className="form-control"
                            onChange={(e) => setter({ ...user, city: e.target.value })}
                            value={user.city}>
                            <option value="">----Select your City----</option>
                            {getCities.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control"
                            onChange={(e) => setter({ ...user, phoneNumber: e.target.value })}
                            value={user.phoneNumber}
                            placeholder='Phone Number'
                        />
                        {errors.phoneNumber && <span className='text-danger'> {errors.phoneNumber}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" className="form-control"
                            onChange={(e) => setter({ ...user, password: e.target.value })}
                            value={user.password}
                            placeholder='Password'
                        />
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" className="form-control"
                            onChange={(e) => setter({ ...user, confirmPassword: e.target.value })}
                            value={user.confirmPassword}
                            placeholder='Confirm Password'
                        />
                        {errors.confirmPassword && <span className='text-danger'> {errors.confirmPassword}</span>}
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-outline-primary w-100'>Register</button>
                    </div>
                    <div className="text-center mt-3">
                        <Link to={'/login'}>already have an account ? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm