import React from 'react'
import { Link } from 'react-router-dom'

const Landing_Page = () => {
    return (
        <div className="p-5 d-flex justify-content-start" style={{
            backgroundImage: `url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <div className="card shadow p-5 m-5" style={{ background: "#95cde7", width: "600px" }}>
                <div>
                    <img src="https://electronicstore.com.pe/skin/frontend/em0145/electronic/images/logo_scale.png" style={{ width: "500px" }} />
                </div>
                <form className="mt-5">
                    <div className="mb-4"><h1>WELCOME TO <span style={{ color: "white" }}>ELECTRONIQUE STORE</span></h1></div>
                    <div >
                        <p className="fst-italic" style={{ textAlign: "justify" }}><span className="fw-bold" style={{ color: "white" }}>ELECTRONIQUE STORE</span> is the go-to destination for electronics enthusiasts seeking
                            high-quality used electronic devices. Our online platform offers you an extensive selection of pre-owned electronic gadgets, ranging from smartphones
                            and laptops to tablets, gaming consoles, and much more.
                            Whether you're in search of an affordable used smartphone, a professional-grade laptop, or a retro gaming console,
                            <span className="fw-bold" style={{ color: "white" }}>ELECTRONIQUE STORE </span> is the ideal place to find reliable used electronics at advantageous prices.
                            Explore our website today to discover our ever-evolving deals and treat yourself to the technology you need without compromise.
                        </p>
                    </div>
                    <div className='d-flex mt-5 gap-5 d-flex justify-content-end'>
                        <Link className="fw-bold fs-4" style={{ color: "blue", background: "none" }} to={`/register`}>Register</Link>
                        <Link className="fw-bold fs-4" style={{ color: "blue", background: "none" }} to={`/login`}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Landing_Page