import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    // const navigate = useNavigate();
    // const from = location.state?.from?.pathname || '/';

    useEffect(() => {
            fetch(`https://genius-car-server-jitunmohajan.vercel.app/orders?email=${user?.email}`,{
                headers:{
                    authorization: `Bearer ${localStorage.getItem('genius-Token')}`,
                }
            })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    logOut();
                    // navigate(from, {replace:true});
                }
                return res.json()
            })
            .then(data => {
                setOrders(data)
            })
        }, [user?.email, logOut])

    const handleDelete = id =>{
        const proceed = confirm('are you sure you want ti cancel you order');
        if(proceed){
            fetch(`https://genius-car-server-jitunmohajan.vercel.app/orders/${id}`,{
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert('deleted successfully');
                    const remaining = orders.filter(order => order._id!==id);
                    setOrders(remaining);
                }
            })
        }
    }

    const handleStatusUpdate = id =>{
        console.log(id)
        fetch(`https://genius-car-server-jitunmohajan.vercel.app/orders/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'Approved'})

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                const remaining = orders.filter(order => order._id !== id);
                const approving = orders.find(order=> order._id ===id);
                approving.status = 'Approved';
                const newOrders = [...remaining, approving];
                setOrders(newOrders);
            }
        })
    }

   

    return (
        <div className='max-w-screen-xl mx-auto pt-8 pb-20'>
            <h2 className="text-5xl">Your Orders: {orders.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;