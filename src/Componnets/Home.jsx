import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Categories from './Categories'
import MainSlider from './MainSlider'

export default function Home() {

  return (
    <div>  
      
      <MainSlider/>
      <Categories/>
      <FeaturedProducts></FeaturedProducts>
    </div>
  )
}
