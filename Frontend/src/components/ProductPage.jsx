import React, { useContext, useEffect, useState } from 'react'
import { products } from '../assets/product'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/MyContext';
import { RxCross2 } from "react-icons/rx";
import { Input } from "@heroui/input";

const ProductPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([])
    const { productItems, setProductItems } = useContext(MyContext);
    const [amount, setAmount] = useState(0)
    const [email, setEmail] = useState('')

    useEffect(() => {
        let amt = 0;
        const selectedItem = productItems.map((item) => {
            const value = products.filter(card => card.id === item.id)
            // console.log(value)
            if (value.length > 0) {
                amt += value[0].price
                return { "card": value[0], "value": item.value };
            }
        })
        console.log(selectedItem)
        setItems(selectedItem)
        setAmount(amt)
    }, [])

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    if(items.length < 1){
        navigate('/')
    }

    const handlePayment = async () => {
        // if (!e) return;
        try {
            const response = await fetch('http://localhost:8080/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cartItems : items,email})
            })
            const data = await response.json();
            if(data?.url){
                window.location.href = data?.url;
            }
            else{
                alert('Something went wrong');
            }
            console.log(data);
        } catch (err) {
            alert('Something went wrong');
            console.log(err);
        }
    }

    return (
        <>
            <div className='flex flex-col w-full items-center justify-center'>

                <div className='w-[80%] ml-10 p-5 flex flex-col gap-7'>
                    <h2 className='text-xl font-semibold'>Shopping Card</h2>
                    <div className='w-full flex items-left justify-center flex-col'>
                        <div className='flex gap-3 p-2 border-y border-gray-300'>
                            <p className='w-60 flex justify-center items-center'>Title</p>
                            <p className='w-40 flex justify-center items-center'>Price</p>
                            <p className='w-40 flex justify-center items-center'>Count</p>
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className='flex gap-3 p-2 shadow-md rounded-md my-2'>
                                <p className='w-60 flex justify-center items-center'>{item.card.title}</p>
                                <p className='w-40 flex justify-center items-center'>{item.card.price}</p>
                                <p className='w-40 flex justify-center items-center'>{item.value}</p>
                                <button
                                    onClick={() => {
                                        const select = items.filter(i => i.card.id !== item.card.id)
                                        const amt = select.reduce((sum, item) => sum + (item.card.price * item.value), 0);
                                        
                                        setItems(select)
                                        setAmount(amt)
                                    }}
                                ><RxCross2 className='cursor-pointer' /></button>
                            </div>
                        ))}
                    </div>

                </div>
                <div className='w-[80%] ml-10 p-5 flex flex-col gap-7'>
                    <div className='flex items-center justify-between w-full'>
                        <h2 className='text-xl font-semibold'>Payment Info</h2>
                        <p><span className='font-semibold'>Total Amount: </span>₹ {amount}</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                type='email'
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John@gmail.com" required />
                        </div>
                        <button
                            onClick={()=>{
                                if(!validateEmail(email)){
                                    alert('Enter a valid mail.');
                                    return;
                                }
                                handlePayment();
                            }}
                            type="button" className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage