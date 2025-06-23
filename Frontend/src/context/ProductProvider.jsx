import { MyContext } from './MyContext';
import { useState } from 'react';

function ProductProvider({ children }) {
  const [productItems, setProductItems] = useState([])
  const sharedValue = {
    productItems,setProductItems
  }
  return (
    <MyContext.Provider value={sharedValue}>
      {/* Child components that need to access sharedValue */}
      {children}
    </MyContext.Provider>
  );
}

export default ProductProvider;