import React from 'react'

const ProductCard = ({ productId, title, price, imageUrl, handleClick }) => {
    return (
        <div className="group relative overflow-hidden w-70 h-70 shadow-md p-2 flex flex-col items-center justify-center hover:shadow-xl">
            <img
                src={imageUrl}
                alt=""
                className="h-30 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-25"
            />

            <div className="relative p-3 w-full flex flex-col gap-3">
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>

                        <p className="mt-1 text-sm text-gray-700">₹ {price}</p>
                    </div>
                    <span className="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap"> New </span>
                </div>



                    <button
                    onClick={()=>{
                        handleClick(productId)
                    }}
                        className="block w-1/2 rounded-sm bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105"
                    >
                        Add to Cart
                    </button>
            </div>
        </div>
    )
}

export default ProductCard