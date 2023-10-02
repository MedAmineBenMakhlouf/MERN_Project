import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const DashboardAdmin = ({ baseUrl }) => {
  const [result, setResult] = useState([])
  const [devices, setDevices] = useState([])
  const [search, setSearch] = useState({ text: "" })
  const navigate = useNavigate()
  
  // const {userContext,login,logout:userLogout}  = useContext(UserContext)
  //   if(!userContext) 
  //   {
  //       navigate('/')
  //   }
  const deleteDevice = (id) => {
    try {
        axios.delete(baseUrl + "/devices" + id, { withCredentials: true })
        setDevices(devices.filter(device => device._id != id))
    }
    catch (error) {
        console.log("Error deleting device", error)
    }
  }
  
  
  useEffect(() => {
    axios.get(baseUrl + "/devices/allDevices", { withCredentials: true })
      .then(res => {
        setDevices(res.data)
      })
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
    <>
    
      <div className="p-2" style={{
        backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: '1000px'
      }}>
        <div className='p-4'>
          <div className='d-flex justify-content-between align-items-center rounded-3' style={{ background: "#95cde7"}}>
            <img src="https://electronicstore.com.pe/skin/frontend/em0145/electronic/images/logo_scale.png" style={{width: "200px" }} />
            <button className='btn bg-danger me-3' onClick={LogOut}>Logout</button>
          </div>

          {
            devices && devices.map(d =>
              <div key={d._id} style={{ background: 'none' }} className='col-12 rounded-3'>
                <div className=' mt-5 card shadow border border-1'>
                  <div className='card-header d-flex justify-content-between align-items-center'>
                    <strong>{d.deviceName}</strong>

                    <button className='me-3 text-dark btn btn-outline-danger'
                        onClick={() => deleteDevice(d._id)}>Delete Device
                    </button>

                  </div>
                  <div className='card-body row'>
                    <div className='col-8'>
                      <p><strong>Type:</strong> {d.type}</p>
                      <p><strong>Reference:</strong> {d.reference}</p>
                      <p><strong>Price:</strong> {d.price}</p>
                      <p><strong>Description:</strong> {d.description}</p>
                      <p><strong>Open to exchange:</strong> { d.openToExchange ? <span>Yes</span> : <span>No</span>}</p>
                    </div>
                    <div className='col-4 d-flex justify-content-between align-items-center'>
                      {d.files.map(i =>
                        <img key={i._id} src={`${i.path}`} alt='image' style={{ width: '200px', height: '200px' }} />
                      )}
                    </div>
                  </div>
                  <div className='card-footer d-flex justify-content-around'>
                    <div><strong>Posted by: </strong> {d.user.userName}</div>
                    <div><strong>From: </strong> {d.user.country}, {d.user.governorate}, {d.user.city}</div>
                    <div><strong>His Number: </strong> {d.user.phoneNumber}</div>
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

export default DashboardAdmin