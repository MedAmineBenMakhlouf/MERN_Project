import React, { useState, useEffect } from 'react'
import NavBarUser from './NavBarUser'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UpdateUser = ({ baseUrl }) => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [getSates, setStates] = useState([]);
    const [getCities, setCities] = useState([]);
    const [user, setUser] = useState({
        userName: "",
        email: "",
        country: "",
        governorate: "",
        city: "",
        phoneNumber: 0,
        password: ""
    })
    useEffect(() => {
        axios.get(baseUrl + '/loggedUser', { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(error => console.log(error))
    }, [])
    useEffect(() => {
        axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
            .then(res => setData(res.data))
            .catch(error => console.log(error))
    }, []);
    const ArrayCountry = [...new Set(data.map(item => item.country))]
    ArrayCountry.sort((a, b) => b.localeCompare(a))

    const handleCountry = (e) => {
        setUser({ ...user, country: e.target.value })
        let ArrayStates = data.filter(state => state.country === e.target.value)
        ArrayStates = [... new Set(ArrayStates.map(country => country.subcountry))]
        ArrayStates.sort()
        setStates(ArrayStates)
    }

    const handleState = (e) => {
        setUser({ ...user, governorate: e.target.value })
        let ArrayCities = data.filter(city => city.subcountry === e.target.value)
        setCities(ArrayCities)
        console.log(ArrayCities)
    }
    const updateUser = async (e) => {
        e.preventDefault()
        console.log(baseUrl+'/user/update',user)
        await axios.put(baseUrl+'/user/update',user,{withCredentials:true})
        .then(res => {console.log(res.data)
        navigate('/dashboardUser')})
        .catch(error=> console.log(error))

    }
    return (
        <>
            <NavBarUser baseUrl={baseUrl} user={user} />
            <div className="p-5 d-flex justify-content-start" style={{
                backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight:"720px"
            }}>
                <div className="card shadow p-5 m-5" style={{ background: "#95cde7", width: "600px" }}>
                    <form onSubmit={(e) => updateUser(e)}>
                        <div className="form-group mb-4 mt-4">
                            <input type="text" className="form-control"
                                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                                value={user.userName}
                                placeholder='Your Name'
                            />
                        </div>

                        <div className="form-group mb-4">
                            <input type="email" className="form-control"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email} disabled
                                placeholder='Your Email'
                            />
                        </div>
                        <div className="form-group mb-4">
                            <select className="form-control"
                                onChange={(e) => handleCountry(e)}
                                value={user.country}>
                                <option value="">----Select your Country----</option>
                                {ArrayCountry.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <select className="form-control"
                                onChange={(e) => handleState(e)}
                                value={user.governorate}>
                                <option value="">----Select your State----</option>
                                {getSates.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <select className="form-control"
                                onChange={(e) => setUser({ ...user, city: e.target.value })}
                                value={user.city}>
                                <option value="">----Select your City----</option>
                                {getCities.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <input type="text" className="form-control"
                                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                value={user.phoneNumber}
                                placeholder='Phone Number'
                            />
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-outline-primary w-100'>Update  </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateUser