import React from 'react';
import loadingLottie from '../../assets/Loading Dots Blue.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
         <div className='min-h-screen flex justify-center items-center'>
            <Lottie style={{ height: 150 }}animationData={loadingLottie} loop />
        </div>
    );
};

export default Loading;