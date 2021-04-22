import React from 'react';

import '../styles/fight.scss';
import Hero from '../components/Hero';
import FightCard from '../components/FightCard';

export default function Fight() {
    return (
        <div className='fight-container'>
            <Hero api="./data.json"/>
            <FightCard />
        </div>  
    )
} 