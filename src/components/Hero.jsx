import React, { useEffect, useState } from 'react';

import '../styles/hero.scss';
import FightInfo from './FightInfo';
import Images from './Images';

export default function Hero({api}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(api, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(async (response) => {
            let reponseObject = await response.json();
            setData(reponseObject.body);
        }).catch(error => console.log(error))
    }, [api])

    if(data){
        return (
            <div className='hero-container'>
                <div className="full-screen">
                    <Images imageUrls={data.images} />
                    <FightInfo data={data.info} />
                    <div className="fade-to-black"/>
                </div>
            </div>
        )
    }else{
        return null;
    }
}