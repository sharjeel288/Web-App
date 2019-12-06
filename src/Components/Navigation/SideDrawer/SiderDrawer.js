import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/backDrop'
import Aux from '../../../Hoc/Auxilary'

const sideDrawer=(props)=>{

    let attachedClass=[classes.SideDrawer,classes.Close]
    if (props.open) {
        attachedClass=[classes.SideDrawer,classes.Open]
    }

    return(
    <Aux>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClass.join(' ')}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    </Aux>
    );
}

export default sideDrawer;