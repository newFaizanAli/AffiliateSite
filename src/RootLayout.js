import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComp from './Component/NavbarComp'


const RootLayout = () => {
  return (
    <>
      <NavbarComp />
      <Outlet /> 
    </>
  )
}

export default RootLayout



