import { useState } from 'react'
import ProductCard from './components/ProductCard'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ProductPage from './components/ProductPage'
import SuccessPage from './components/SuccessPage'
import CancelPage from './components/CancelPage'
function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path="/cancel" element={<CancelPage/>}/>
      </Routes>
    </>
  )
}

export default App
