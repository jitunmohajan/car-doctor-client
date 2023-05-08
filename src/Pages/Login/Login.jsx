import React from 'react';
import img from '../../assets/images/login/login.svg'

const Login = () => {

    const handleOnSubmit = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        console.log(email,password);
    }
    return (
        <div className="hero w-full">
            <div className="hero-content grid gap-4 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className='text-5xl font-bold text-center'>Login</h1>
                    <form onSubmit={handleOnSubmit} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text"  name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" name='password' placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn  bg-orange-700" type="submit" value="Login" />
                            {/* <button className="btn btn-primary">Login</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;