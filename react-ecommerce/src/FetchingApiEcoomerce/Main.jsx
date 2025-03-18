import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import Login from './Login'
import  Navbar  from './Navbar'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Protected from './Protected.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function Main() {
  return (
    <div>
<BrowserRouter>
  <Provider store={store}>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected Component={Home}/>} />
      <Route path="/cart" element={<Protected Component={Cart}/>} />
    </Routes>
  </Provider>
</BrowserRouter>

    </div>
  )
}

export default Main