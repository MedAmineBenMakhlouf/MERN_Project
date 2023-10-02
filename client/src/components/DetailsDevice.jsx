import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import NavBarUser from './NavBarUser'
import Form from 'react-bootstrap/Form'


const DetailsDevice = ({ baseUrl }) => {
    const navigate= useNavigate()
    const { id } = useParams()
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


    useEffect(() => {
        axios.get(baseUrl + '/devices/' + id)
            .then(res => {
                setDevice(res.data)

            })
            .catch(error => console.log(error))
    }, [id])
    const deletePicture = async (e, fid) => {
        try {
            await axios.delete(baseUrl + '/upload/' + id + '/' + fid, { withCredentials: true })
            setImages(images.filter(file => file._id !== id))
        }
        catch (error) {
            console.log(error)
        }
    }
    const formData = new FormData()

    const updateForm = async (e) => {

        e.preventDefault();
        await axios.put(baseUrl + "/devices/"+id, device, { withCredentials: true })
            .then(res => {
                setDevice(res.data)

                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i]);
                }
                console.log(formData)
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

            <div className="p-5 row" style={{
                backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: '1000px'
            }}>
                <Form onSubmit={(e) => updateForm(e)} encType="multipart/form-data"
                    className='card shadow p-3 col-6'
                    style={{ background: 'none' }}>
                    <div className="form-group mb-3 mt-5">
                        <select className="form-control"
                            onChange={(e) => setDevice({ ...device, type: e.target.value })}
                            value={device.type}>
                            <option value="">choose a device</option>
                            <option value="pc">PC</option>
                            <option value="lap-top">Lap-Top</option>
                            <option value="smartphone">Smartphone</option>
                            <option value="pinter">Pinter</option>
                            <option value="airpods">AirPods</option>
                            <option value="tablet">Tablet</option>
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
                <div className='col-6 p-3 mt-5 '>
                    <div className='row d-flex justify-content-around'>
                        {device.files && device.files.map(f =>
                            <div key={f._id} className='col-5 d-flex justify-content-center'>
                                <div className='card shadow d-flex justify-content-center' style={{ backgroundColor: 'white' }}>
                                    <img src={`${f.path}`} alt='Picture' style={{ width: '250px', height: '250px' }} />
                                    <div className='text-center'>
                                        <button className='btn btn-outline-danger w-100' onClick={(e) => deletePicture(e, f._id)}>Bin</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsDevice