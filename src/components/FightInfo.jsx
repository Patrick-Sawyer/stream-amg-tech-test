import React, { useEffect, useState } from 'react';
import jQuery from "jquery";

import '../styles/info.scss';

export default function FightInfo({data}) {

    const fightNumber = () => {
        if(data.fightNumber > 1){
            return data.fightNumber
        }
    }

    let initPageLoad = true;

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    

    const scale = async () => {
        let availableWidth =  window.innerWidth;
        setScreenWidth(availableWidth);
        let div = document.getElementById('info-node');
        let contentWidth = div.clientWidth;
        let divHeight = div.clientHeight;
        let scale = Math.min(availableWidth / contentWidth);
        let diff = Math.round((contentWidth - availableWidth)/2);
        let buttons = document.getElementById('buttons');
        if(scale < 1){
            div.style.transform = 'scale(' + scale + ')';
            div.style.right = diff + 'px';
            div.style.bottom = (divHeight - (divHeight * scale))/2 + 'px';
            buttons.style.bottom = divHeight - divHeight*scale + 'px';
        }else{
            div.style.transform = 'scale(1)';
            div.style.right = '0px';
            div.style.bottom = '0px';
            buttons.style.bottom = '0px';
        }

        if(initPageLoad){
            initPageLoad = false;
            div.style.opacity = 1;
            setTimeout(() => {
                div.style.transition = '0s';
            }, 1100)
        }
    }

    const fightTitle = () => {
        return data.fightTitle.map((word, index) => {
            return <div key={"word-" + index} className={word.size + " title-word beige"}>{word.text}</div>;
        })
    }

    const redButton = (text, border, callback) => {

        let borderClass = border ? " red-button-border" : "";

        return (
            <div className="button-container" style={{marginLeft: border ? "5px" : "0px"}}>
                <div className={"red-button-outer" + borderClass} onClick={callback}>
                <div className="red-button-inner">
                    <div className="red-button-text">{text}</div>
                </div>
            </div>
            </div>
        )
    }

    useEffect(() => {
        jQuery('.small').wrapAll('<div class="small-title-words" />')
        window.addEventListener('resize', scale);
        setTimeout(() => {
            document.getElementById('buttons').style.opacity = 1;
            setTimeout(() => {
                document.getElementById('buttons').style.transition = '0s';
            }, 1000)
            scale();
        }, 250)
        return () => window.removeEventListener('resize', scale);
    }, [])

    return (
        <div className="info-container">
            <div className="info" id="info-node">
                <div className="fighters-text" >
                    {data.fighter1Surname}
                    <div className="rotate beige"><p className="vs">VS</p></div>
                    {data.fighter2Surname}
                    <span className="beige fight-number">{fightNumber()}</span>
                </div>
                <div className="title-outer">
                    <div className="title-text">
                        {fightTitle()}
                    </div>
                </div>
                <div className="sub-text beige padding">
                    {data.subTitle}
                </div>
                <div className="sub-text">
                    {data.date}
                </div>
                <div className="sub-text">
                    {data.location}
                </div>
            </div>
            <div className="red-buttons" id="buttons" style={{maxWidth: screenWidth > 400 ? "400px" : null}}>
                {redButton("WATCH LIVE NOW", true, () => {
                        //link
                    })}
                <div className="or-container">
                    <div className="or-outer" >
                        <div className="or-inner">
                            <div className="or-text">OR</div>
                        </div>
                    </div>
                </div>
                {redButton("PURCHASE YOUR PASS", false, () => {
                    //link
                })}
            </div>
        </div>
    )
}