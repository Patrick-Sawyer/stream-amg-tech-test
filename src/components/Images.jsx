import React, { useEffect, useState } from 'react';

import '../styles/images.scss';

export default function Images({imageUrls}) {
    const initialScreenWidth = window.innerWidth;
    const [screenWidth, setScreenWidth] = useState(initialScreenWidth);
    const [imageOffset, setImageOffset] = useState(screenWidth/2)
    const [animating, setAnimating] = useState(true);
    
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
        handleScroll();
    }

    const handleScroll = () => {
        let scroll = window.scrollY/window.innerHeight;
        if(scroll > 1){
            scroll = 1;
        }
        setImageOffset(scroll * screenWidth/2)
    }

    useEffect(() => {   
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        setTimeout(() => {
            setImageOffset(0);
        }, 250)
        setTimeout(() => {
            setAnimating(false);
        }, 3500)
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const fighterImage = (fighter) => {
        let image = "fighterImageBackground" + fighter;
        return <img src={imageUrls[image]} alt="" height="auto" width={(200 + screenWidth/3) + "px"}/>
    }

    const fighterDesktopImage = (fighter) => {
        let image = "fighterImageDesktop" + fighter;
        return <img src={imageUrls[image]} alt="" height="auto" width={screenWidth/2.4} />
    }

    const desktopFighters = () => {
        if(screenWidth > 1000){
            return (
                <div className="desktop-fighters">
                    <div className="desktop-fighters-inner">
                        <div className="fighter-image absolute left">
                            <div className="animated-image" style={{right: imageOffset, transition: animating ? "3s" : "0s"}}>
                                {fighterDesktopImage(1)}
                            </div>
                        </div>
                        <div className="fighter-image absolute right">
                            <div className="animated-image" style={{left: imageOffset, transition: animating ? "3s" : "0s"}}>
                                {fighterDesktopImage(2)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='images-container'>
            <div className="images-container relative">
                <div className="images-container absolute smoke smoke1" />
                <div className="images-container absolute smoke smoke2" />
                <div className="fighter-image absolute left">
                    <div className="animated-image" style={{right: screenWidth > 1000 ? 0 : imageOffset, transition: animating ? "3s" : "0s"}}>
                    {fighterImage(1)}
                    </div>
                </div>
                <div className="fighter-image absolute right">
                    <div className="animated-image" style={{left: screenWidth > 1000 ? 0 : imageOffset, transition: animating ? "3s" : "0s"}}>
                        {fighterImage(2)}
                    </div>
                </div>
                {desktopFighters()}
                <div className="images-container absolute shadow-bottom" />
            </div>
        </div>
    )
}