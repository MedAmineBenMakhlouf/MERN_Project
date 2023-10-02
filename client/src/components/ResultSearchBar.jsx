import React, { useState } from 'react'
import axios from 'axios'
import NavBarUser from './NavBarUser'


const ResultSearchBar = ({baseUrl}) => {
    const [results,setResults] = useState([])
    console.log(results)
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
                        results && results.map(d =>
                            <div key={d._id} style={{ background: 'none' }} className='col-12 rounded-3'>
                                <div className=' mt-5 card shadow border border-1'>
                                    <div className='card-header d-flex justify-content-between align-items-center'>
                                        <strong>{d.deviceName}</strong>
                                        <input type='text' onChange={(e) => setSendMsg({ ...sendMsg, text: e.target.value })} />
                                        <button onClick={() => sendMessage(d.user._id)}
                                            className='text-dark btn btn-outline-info'>
                                            Send Message
                                        </button>
                                        <button className='btn' style={{ background: "#95cde7", color: "white", height: "50px", width: "200px" }}>Contact</button>

                                    </div>
                                    <div className='card-body row'>
                                        <div className='col-8'>
                                            <p><strong>Type:</strong> {d.type}</p>
                                            <p><strong>Reference:</strong> {d.reference}</p>
                                            <p><strong>Price:</strong> {d.price}</p>
                                            <p><strong>Description:</strong> {d.description}</p>
                                            <p><strong>Open to exchange:</strong> {d.openToExchange ? <span>Yes</span> : <span>No</span>}</p>
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

export default ResultSearchBar