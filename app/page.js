"use client"
import React from 'react'
import SubscriptionCard from './components/SubscriptionCard'
import Header from './components/Header'
import Hero from './components/Hero'
import GenreBtn from './components/GenreBtn'
import Charactors from './components/Charactors'
// import Footer from './components/Footer'
import Studios from './components/Studios'

function page() {
  return (
    <div>
      <Hero />
      <GenreBtn />
      <Charactors />
      <Studios />
       <SubscriptionCard />
      
    </div>
  )
}

export default page
