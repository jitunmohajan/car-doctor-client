import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const {createUser} = useContext(AuthContext);
    const handleSignUp = (event) =>{
        event.preventDefault();
        const form = event.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        console.log(email,password);

        createUser(email, password)
        .then((result) => {
            const user = result.user;
        })
        .catch((error) => {
           console.error(error);
        });
    }

    return (
        <div className="hero w-full">
            <div className="hero-content grid gap-4 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className='text-5xl font-bold text-center'>Sign Up</h1>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  name='name' placeholder="Your Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text"  name='email' placeholder="email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" name='password' placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn  bg-orange-600" type="submit" value="Sign Up" />
                            {/* <button className="btn btn-primary">Login</button> */}
                        </div>
                    </form>
                    <p className='text-center'>Already have an account? <Link to='/login' className='text-orange-600'>Login</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;