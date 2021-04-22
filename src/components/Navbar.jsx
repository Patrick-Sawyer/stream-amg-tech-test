import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/navbar.scss';
import disableScroll from 'disable-scroll';

export default function Navbar() {

    const [ currentPage, setCurrentPage ] = useState('home');
    const [ screenWidth, setScreenWidth ] = useState(window.innerWidth);
    const [ sideVisible, setSideVisible ] = useState(false);
    const [ offset, setOffset ] = useState('270px');

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      handleClick(false);
    }

    const handleClick = (openOrClosed) => {
        let newValue = openOrClosed ? '0px' : '270px'
        setOffset(newValue);
        let delay = openOrClosed ? 0 : 500;
        if(openOrClosed){
            disableScroll.on();
        }else{
            disableScroll.off();
        }
        setTimeout(() => {
            setSideVisible(openOrClosed);
        }, delay)
        
    }
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, [])

    const link = (text, route, number, isSide) => {

        let classes = isSide ? " side-menu-element" : " nav" + number;

        return (
            <div className={"navbar-element" + classes}>
                <Link 
                    onClick={() => {
                        handleClick(false);
                        setCurrentPage(route);
                    }} 
                    style={{color: 'inherit', textDecoration: 'inherit', fontWeight: currentPage === route ? 700 : 400}} 
                    to={"/" + route}>
                        {text}
                </Link>
            </div>
        )
    }

    const burgerIcon = () => {
        return screenWidth < 1000 ? <img style={{zIndex: 4}} onClick={() => {handleClick(true)}} className="burger-icon" src={'../assets/burger.png'} alt="Menu" height='25px' width='40px'/> : null;
    }

    const links = () => {
        if(screenWidth < 1000){
            return (
                <div className="navbar">
                    {burgerIcon()}
                </div>
            )
        }

        return (
            <div className="navbar">
                {link('Home', 'home', 1, false)}
                {link('Purchase pass', 'pass', 2, false)}
                {link('FAQs', 'faqs', 3, false)}
                <div className="navbar-element nav4">Login</div>
            </div>
        )
    }

    const sideMenu = () => {
        if(screenWidth < 1000){
            return (
                <div className="side-menu" style={{zIndex: sideVisible ? 5 : 0}} >
                    <div id="menu" style={{left: offset}}>
                        <div className="close-container">
                            <img onClick={() => {handleClick(false)}} className="close-icon" src={'../assets/cross.png'} alt="Close" height='25px' width='25px'/>
                        </div>
                        {link('Home', 'home', 1, true)}
                        {link('Purchase pass', 'pass', 2, true)}
                        {link('FAQs', 'faqs', 3, true)}
                        <div className="navbar-element side-menu-element">Login</div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }

    return (
        <div className='navbar-container'>
            {links()}
            {sideMenu()}
        </div>
    )
}