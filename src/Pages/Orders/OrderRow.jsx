import React, { useEffect, useState } from 'react';

const OrderRow = ({order, handleDelete, handleStatusUpdate}) => {
    const {_id, serviceName, customer, phone, price, email, service, status} = order;
    const [orderService, setOrderService] = useState({});

    useEffect(()=>{
        fetch(`https://genius-car-server-jitunmohajan.vercel.app/services/${service}`)
        .then(res=> res.json())
        .then(data => setOrderService(data))

    },[service])

    

    return (
        
        <tr>
            <th>
                <label>
                    {/* <input type="checkbox" className="checkbox" /> */}
                    <button onClick={()=>handleDelete(_id)} className='btn btn-ghost'>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {
                                orderService?.img &&
                                <img src={orderService.img} />  
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName} 
                <br/>
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>Purple</td>
            <th>
                <button className="btn btn-ghost btn-xs" onClick={() => handleStatusUpdate(_id)}>{status? status: 'pending'}</button>
            </th>
        </tr>
    );
};

export default OrderRow;