import React from 'react';
import './rowtag.css';

const RowTag = ({ text, bg, color }) => {
    return (
        <div className='row-tag' style={{ background: bg, color }}>{text}</div>
    );
}

export default RowTag;