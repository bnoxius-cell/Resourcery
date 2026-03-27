import React from 'react'
import Navbar from '../components/Navbar'
import '../../index.css'

const Home = () => {
  return (
    <div className="h-[2000px] bg-slate-800">
        <Navbar />
        <h1 className="pt-32 text-white text-center">Scroll down to see the magic!</h1>
    </div>
  )
}

export default Home
