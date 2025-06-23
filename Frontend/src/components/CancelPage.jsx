import React from 'react'
import { useNavigate } from 'react-router-dom'

const CancelPage = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center shadow-xl p-3 gap-2'>
            <div className='w-full flex items-center justify-center'>
            <img className='w-20 h-20' src="https://media.istockphoto.com/id/1039939018/vector/wrong-mark-line-icon-one-of-set-web-icons.jpg?s=612x612&w=0&k=20&c=p5zCbRQaUQHkFi6yBPWLYoeQMEQ4u8cnMyu0xqktQbE=" alt="" />

            </div>
            <p className='text-2xl font-bold'>Payment Falied</p>
            <div className='w-[80%] flex flex-col items-center justify-center'>
                <p className='text-center'>Order #43 | ₹567 | visa ending with XX2345</p>
                <p className='text-center'>Something went wrong or the payment was cancel. Please try again.</p>
            </div>
            <button
            onClick={()=>navigate('/')}
            type="button" className="w-1/3 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Go to HomePage</button>
        </div>
    </div>
  )
}

export default CancelPage