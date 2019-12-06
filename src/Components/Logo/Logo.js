import React from 'react'
import BurgerLogo from '../../assests/images/27.1 burger-logo.png'
import Classes from './Logo.css'

const logo=(props)=>(
    <div className={Classes.Logo} style={{height:props.height}}>
        <img src={BurgerLogo} alt="My Burger"/>
    </div>
);
export default logo;