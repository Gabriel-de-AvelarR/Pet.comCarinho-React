import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { Products } from './components/Products'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart'
import { Profile } from './components/Profile'
import { User } from './components/User'
import './app.module.scss'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Profile />}
          />
          <Route
            path="/products"
            element={<Products />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/user"
            element={<User />}
          />
          
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
