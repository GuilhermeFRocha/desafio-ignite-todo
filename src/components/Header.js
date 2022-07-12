import React from 'react'
import Logo from '../assets/Logo.png'
import '../styles/header.scss'

export const Header = () => {
  return (
    <header>
        <div>
        <img src={Logo} alt="Logo"/>
        </div>
    </header>
  )
}