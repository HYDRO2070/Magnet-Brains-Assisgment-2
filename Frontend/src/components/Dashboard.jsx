import React, { useContext, useState } from 'react'
import { MdProductionQuantityLimits } from "react-icons/md";
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';
import { products } from '../assets/product';

const Dashboard = () => {
    const navigate = useNavigate();
    const {productItems, setProductItems} = useContext(MyContext);

  return (
    <main className='w-full flex flex-col items-center justify-center'>
        <div className='w-full flex items-center justify-between px-9 m-2'>

        <h3 className="text-xl font-semibold">Available Product</h3>

        <div 
            className="flex gap-2 p-2 cursor-pointer items-center justify-center"
            onClick={()=>{
                if(productItems.length === 0){
                    alert('No items in add to card.');
                    return;
                }
                navigate('/product');
            }}
        >
        <MdProductionQuantityLimits size={20}/>
        {productItems.length > 0 && <p className="text-md font-semibold">{productItems.length}</p>}
        </div>

        </div>
        <div className='flex flex-row flex-wrap gap-5 w-[86%]'>
            {products.map((item,index) => (
                <ProductCard
                    key={index}
                    productId={item.id}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.image}

                    handleClick={(id)=>{
                      const item = productItems.filter((item) => item.id === id);
                      // console.log(item)
                      if(item.length > 0){
                        const newItems = productItems.map((card)=>{
                            if(card.id !== id) return card;
                            card.value = card.value + 1;
                            return card;
                          })
                        // console.log(newItems)
                        setProductItems(newItems)
                      }
                      else{
                        setProductItems((prev) => [...prev , {"id" : id, "value" : 1}]);
                      }
                      // console.log(productItems)
                    }}
                />
            ))}
        </div>
    </main>
  )
}

export default Dashboard