import React from 'react';
import loading from './assets/loading.svg';
import './loading.css';

const Loading = () => {
    return (
        <div className='loading'>
            <img src={loading} className='loading-img' alt='loading' />
        </div>
    );
}

export default Loading;