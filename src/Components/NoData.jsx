import React from 'react';
import noData from '../assets/No-Data.json'
import Lottie from 'lottie-react';
const NoData = () => {
    return (
        <div className='flex justify-center items-center'>
             <Lottie style={{ height: 350 }}animationData={noData} loop />
        </div>
    );
};

export default NoData;