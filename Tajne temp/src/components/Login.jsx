import React from "react";

function Login(){
    return(
        <div className="login-custom">
            <section>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your username and password!</p>

                                <div className="form-outline form-white mb-4">
                                    <input type="text" id="typeEmailX" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typeEmailX">Username</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                                </div>

                                <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login;