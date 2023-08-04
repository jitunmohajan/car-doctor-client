import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {

    const {login} = useContext(AuthContext);
    
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = event.target.password.value;
        login(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user);

            const currentUser = {
                email: user.email,
            }
            console.log(currentUser);

            // get jwt token
            fetch('https://genius-car-server-jitunmohajan.vercel.app/jwt',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                localStorage.setItem('genius-Token', data.token);
                
            })


            // form.reset();
            navigate(from, {replace:true});
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
                    <h1 className='text-5xl font-bold text-center'>Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
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
                        <input type="password" name='password' placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn  bg-orange-700" type="submit" value="Login" />
                            {/* <button className="btn btn-primary">Login</button> */}
                        </div>
                    </form>
                    <p className='text-center'>New to Genius Car <Link to='/signup' className='text-orange-600'>Sign Up</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;