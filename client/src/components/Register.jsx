import React from "react";

const Register = () => {

    return (
        <div className="p-5 d-flex justify-content-start" style={{
                    backgroundImage:`url("https://hellofuture.orange.com/app/uploads/2018/01/Intro-HELLO-FUTURE-1920x1080_v2.gif")`,
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"cover"
                    }}>
            <div className="card shadow p-5 m-5" style={{ background: "#95cde7", width:"600px"}}>
                <div>
                    <img src="https://electronicstore.com.pe/skin/frontend/em0145/electronic/images/logo_scale.png" style={{ width: "500px"}} />
                </div> 
                <form>
                    <input type="First_Name" className="form-control mb-3 mt-5" name="First_Name" placeholder="First_Name"></input>
                    <input type="Last_Name" className="form-control mb-3" name="Last_Name" placeholder="Last_Name"></input>
                    <input type="Email" className="form-control mb-3" name="Email" placeholder="Email"></input>
                    <input type="Phone_Numbers" className="form-control mb-3" name="Phone_Numbers" placeholder="Phone_Numbers"></input>
                    <input type="Governorate" className="form-control mb-3" name="Governorate" placeholder="Governorate"></input>
                    <input type="City" className="form-control mb-4" name="City" placeholder="City"></input>
                    <input type="Password" className="form-control mb-3" name="Password" placeholder="Password"></input>
                    <input type="Confirm_Password" className="form-control mb-3" name="Confirm_Password" placeholder="Confirm_Password"></input>
                    <div>
                        <button className="form-control mb-2" style={{ background: "blue", color: "white",  borderColor: "blue"}} type="submit">Submit</button>
                    </div>
                </form>
                <div>
                    <p>You already have an account ?<a href="/Login" style={{ color: "blue"}}> Login</a></p>
                </div>
            </div>
        </div>

    );
};

export default Register;