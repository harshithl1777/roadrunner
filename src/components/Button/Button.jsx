import React from 'react';
import './button.css';

const Button = ({ bg, children, onClick, width, height, weight, font, color, border }) => {
    const style = {
        width,
        height,
        color,
        background: bg,
        borderRadius: border,
        fontWeight: weight,
        fontSize: font,
        mixBlendMode: (!color) ? 'screen' : '',
    };
    return (
        <button className='button' style={style} onClick={onClick}>{children}</button>
    );

}

export default Button;