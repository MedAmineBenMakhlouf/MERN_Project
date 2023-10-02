import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import NavBarUser from './NavBarUser'
const MyDevices = ({ baseUrl }) => {
    const [devices, setDevices] = useState([])
    // const navigate = useNavigate()
    const deleteDevice = (id) => {
        try {
            axios.delete(baseUrl + "/devices/" + id, { withCredentials: true })
            setDevices(devices.filter(device => device._id != id))
        }
        catch (error) {
            console.log("Error deleting device", error)
        }
    }
    useEffect(() => {
        axios.get(baseUrl + "/devices", { withCredentials: true })
            .then(res => {
                setDevices(res.data)

            })
            .catch(error => console.log(error))
    }, [])
    return (
        <>
            <NavBarUser baseUrl={baseUrl} className='mb-3' />

            <div className="p-5" style={{
            backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: '1000px'
            }}>
                
                <div className='p-5'>
                <div>
                    <img src="https://electronicstore.com.pe/skin/frontend/em0145/electronic/images/logo_scale.png" style={{ background: "#95cde7", width: "200px" }} />
                </div>    
                    {
                    devices && devices.map(d =>
                    <div key={d._id} style={{ background: 'none' }} className='col-12 rounded-3'>
                        <div className=' mt-5 card shadow border border-1' onClick={() => detail(d._id)}>
                            <div className='card-header d-flex justify-content-between align-items-center'>
                                <strong>{d.deviceName}</strong>
                                <div>
                                    <button
                                        className='me-3 text-dark btn btn-outline-danger'
                                        onClick={() => deleteDevice(d._id)}>Delete Device</button>
                                    <button
                                        className='text-dark btn btn-outline-info'>
                                        <Link style={{ textDecorationLine: 'none' }} to={`/devices/${d._id}/edit`}>Update Device</Link>
                                    </button>
                                </div>
                            </div>
                            <div className='card-body row'>
                                <div className='col-8'>
                                    <p><strong>Type:</strong> {d.type}</p>
                                    <p><strong>Reference:</strong> {d.reference}</p>
                                    <p><strong>Price:</strong> {d.price} <span>TND</span></p>
                                    <p><strong>Description:</strong> {d.description}</p>
                                </div>
                                <div className='col-4 d-flex justify-content-between align-items-center'>
                                    {d.files.map(i =>
                                        <img key={i._id} src={`${i.path}`} alt='image'
                                            style={{ width: '200px', height: '200px' }} className='me-3' />
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                    )
                    }
                </div>        

            </div>
            
            
        </>
    )
}

export default MyDevices