import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import NavBarUser from './NavBarUser'
const AddDevices = ({ baseUrl }) => {
  const navigate = useNavigate()
  const [device, setDevice] = useState({
    type: "",
    deviceName: "",
    reference: "",
    description: "",
    openToExchange: false,
    price: 0
  })

  const [errors, setErrors] = useState({
    type: "",
    deviceName: "",
    reference: "",
    description: "",
    openToExchange: false,
    price: 0
  })

  const [images, setImages] = useState([])

  const onInputImageChange = (e) => {
    setImages(e.target.files);
  }

  const formData = new FormData()

  const SubmitForm = async (e) => {

    e.preventDefault();
    await axios.post(baseUrl + "/devices", device, { withCredentials: true })
      .then(res => {
        setDevice(res.data)
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }

        const idDevice = res.data._id
        axios.post(baseUrl + "/upload/" + idDevice, formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        )
          .then(res => console.log("Response data", res.data))
          .catch(error => console.log("ERROR FRONT CATCH-----------------", error)
          )

      })


      .catch(error => {
        console.log("Error from backend catch:", error)
        const errs = {
          type: "",
          deviceName: "",
          reference: "",
          description: "",
          openToExchange: false,
          price: 0
        }
        for (let key of Object.keys(error.response.data.errors)) {
          console.log(error.response.data.errors[key].message)
          errs[key] = error.response.data.errors[key].message
        }
        setErrors({ ...errors, ...errs })
      })
    navigate('/MyDevices')
  }


  return (
    <>
      <NavBarUser baseUrl={baseUrl} className='mb-3' />
      <div className="p-5 d-flex justify-content-center" style={{
        backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
        <Form onSubmit={SubmitForm} encType="multipart/form-data" className='card p-3 m-3 mt-5'
          style={{ background: 'none', width: '80%' }}>
          <div>
            <img src="https://electronicstore.com.pe/skin/frontend/em0145/electronic/images/logo_scale.png" style={{ background: "#95cde7", width: "200px" }} />
          </div>
          <div className="form-group mb-3 mt-5">
            <select className="form-control"
              onChange={(e) => setDevice({ ...device, type: e.target.value })}
              value={device.type}>
              <option value="">choose a device</option>
              <option value="PC">PC</option>
              <option value="I-Pad">I-Pad</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Pinter">Pinter</option>
              <option value="Airpods">AirPods</option>
              <option value="Tablet">Tablet</option>
            </select>
            {errors.type && <span className='text-danger'> {errors.type}</span>}
          </div>
          <div className="form-group mb-3">
            <input type="text" className="form-control"
              onChange={(e) => setDevice({ ...device, deviceName: e.target.value })}
              value={device.deviceName}
              placeholder='device name'
            />
            {errors.deviceName && <span className='text-danger'> {errors.deviceName}</span>}
          </div>
          <div className="form-group mb-3">
            <input type="text" className="form-control"
              onChange={(e) => setDevice({ ...device, reference: e.target.value })}
              value={device.reference}
              placeholder='Reference of your device'
            />
            {errors.deviceName && <span className='text-danger'> {errors.deviceName}</span>}
          </div>
          <div className="form-group mb-3">
            <input type="number" className="form-control"
              onChange={(e) => setDevice({ ...device, price: e.target.value })}
              value={device.price}
              placeholder='Price'
            />
            {errors.devicePrice && <span className='text-danger'> {errors.devicePrice}</span>}
          </div>
          <textarea className="form-group mb-3" rows="4" cols="50"
            onChange={(e) => setDevice({ ...device, description: e.target.value })}
            placeholder='describe your issues' value={device.description}>

          </textarea>
          <div className="form-group mb-3 p-2 rounded-2" style={{ background: "white", height: "40px" }}>
            <label>Open to exchange?:</label>
            <input className='form-check-input border-dark mx-3' type="checkbox" checked={device.openToExchange}
              onChange={(e) => setDevice({ ...device, openToExchange: e.target.checked })} />
          </div>
          <div className="form-group rounded-2 mb-5" style={{ background: "white", height: "40px" }}>
            <div className="form-group mb-2 p-2">
              <h6>Select your device's pictures : </h6>
            </div>
            <input className="form-group p-1 mt-1 rounded-2" style={{ background: "white", height: "40px" }} type="file" accept="image/*"
              onChange={(e) => onInputImageChange(e)} multiple />
          </div>
          <div className="form-group mt-5 p-1">
            <button className='btn w-100' style={{ background: "#95cde7", color: "white", height: "50px" }} type="submit">Submit</button>
          </div>
        </Form >
      </div>
    </>
  )
}

export default AddDevices