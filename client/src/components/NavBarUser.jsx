import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const NavBarUser = ({ baseUrl }) => {
    const [user, setUser] = useState({})

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Home', value: '1' },
        { name: 'My Devices', value: '2' },
        { name: 'Add Devices', value: '3' },
    ];
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(baseUrl + '/loggedUser', { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(error => console.log(error))
    }, [])
    const LogOut = () => {
        axios.post(baseUrl + "/logout", {}, { withCredentials: true })
            .then(
                navigate('/login')
            )
            .catch(error => console.log(error))
    }
    return (
        <Navbar fixed='top' variant='dark' bg="dark" data-bs-theme="dark" className="bg-body-tertiary justify-content-between p-2">
            <h5 className='text-danger'>Welcome {user.userName}</h5>
            <NavLink activeClassName="active-link" exact className='btn me-3' to='/dashboardUser' style={{ color: 'white', textDecorationLine: 'none' }}><h5>Home</h5></NavLink>
            <NavLink className='btn me-3' to={'/MyDevices'} style={{ color: 'white', textDecorationLine: 'none' }}><h5>My Devices</h5></NavLink>
            <NavLink to={'/devices/Add'} className='btn me-3' style={{ color: 'white', textDecorationLine: 'none' }}><h5>Add Devices</h5></NavLink>

            <form onSubmit={(e) => SearchDevice(e)}>
                <div className='d-flex justify-content-center gap-1'>
                    {/* <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Search Device"
                            className=" mr-sm-2"
                            onChange={(e) => setSearch({ ...search, text: e.target.value })}
                        />
                    </Col>*/}
                    <select className="form-control"
                        onChange={(e) => setSearch({ ...search, text: e.target.value })}
                    >
                        <option value="">choose a device</option>
                        <option value="pc">PC</option>
                        <option value="lap-top">Lap-Top</option>
                        <option value="smartphone">Smartphone</option>
                        <option value="pinter">Pinter</option>
                        <option value="airpods">AirPods</option>
                        <option value="tablet">Tablet</option>
                    </select>
                    <button style={{ backgroundColor: '#95cde7' }} className='btn'>Search</button>
                </div>
            </form>
            <div>
                <button className='btn me-3' style={{ backgroundColor: '#95cde7' }}><Link to={`/user`} style={{ textDecorationLine: 'none', color: 'white' }}>My Profile</Link></button>
                <button className='btn bg-danger me-3' onClick={LogOut}>Logout</button>
            </div>
        </Navbar>
    )
}

export default NavBarUser