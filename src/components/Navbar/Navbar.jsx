import React from 'react';
import Button from '../Button/Button';

import logo from './assets/logo.svg';
import './navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar-wrapper-left'>
                <img src={logo} alt='logo' />
            </div>
            <div className='navbar-wrapper-right'>
                <Button width='183px' height='45px' text='Hello'/>
            </div>
        </div>
    );
}

export default Navbar;