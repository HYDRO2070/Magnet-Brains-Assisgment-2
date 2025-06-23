import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center shadow-xl p-3 gap-2'>
            <div className='w-full flex items-center justify-center'>
            <img className='w-20 h-20' src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png" alt="" />

            </div>
            <p className='text-2xl font-bold'>Payment Successful</p>
            <div className='w-[80%] flex flex-col items-center justify-center'>
                <p className='text-center'>Order #43 | ₹567 | visa ending with XX2345</p>
                <p className='text-center'>Thank YOu for the payment. Your order will be processed Soon.</p>
            </div>
            <button
            onClick={()=>navigate('/')}
            type="button" className="w-1/3 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Go to HomePage</button>
        </div>
    </div>
  )
}

export default SuccessPage