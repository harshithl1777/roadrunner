import React, { useRef, useState } from 'react';
import RowTag from '../RowTag/RowTag';
import profilePic from './assets/profilePic.svg';
import './webhookrow.css';

const WebhookRow = ({ data, onSelect }) => {
    const [checkbox, setCheckbox] = useState(false);
    const checkboxRef = useRef(null);

    return (
        <div>
            <div className='row' onClick={() => {
                if (!checkbox) {
                    checkboxRef.current.checked = 'checked';
                    setCheckbox(true);
                    onSelect({ id: data.id, name: data.name.title });
                } else {
                    checkboxRef.current.checked = null;
                    checkboxRef.current.value = 'false';
                    setCheckbox(false);
                    onSelect({ id: data.id, name: data.name.title });
                }
            }}>
                <div className='row-select'>
                    <label className="container">
                        <input ref={checkboxRef} type="checkbox" value='false' />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className='row-name'>
                    <div className='row-details'>
                        <h2 className='row-name-title row-header'>{data.name.title}</h2>
                        <h3 className='row-name-desc row-desc'>{data.name.desc}</h3>
                    </div>
                </div>
                <div className='row-id'>
                    <RowTag text={(data.sheet.id.length > 30) ? data.sheet.id.substring(0, 22)+'...' : data.sheet.id} color='#1968DD' bg='rgba(25, 104, 221, 0.15)' />
                </div>
                <div className='row-list'>
                    <RowTag text={(data.list.name.length > 30) ? data.list.name.substring(0, 22)+'...' : data.list.name} color='#F65F0A' bg='rgba(247, 95, 10, 0.15)' />
                </div>
                <div className='row-creator'>
                    <img src={profilePic} alt='profile' className='row-creator-pic' />
                    <div className='row-details'>
                        <h2 className='row-creator-name row-header'>Bluestacks Admin</h2>
                        <h3 className='row-creator-email row-desc'>admin@bluestacks.com</h3>
                    </div>
                </div>
                <div className='row-created'>
                    <div className='row-details'>
                        <h2 className='row-date-day row-header'>{data.date.day}</h2>
                        <h3 className='row-date-time row-desc'>{data.date.time}</h3>
                    </div>
                </div>
            </div>
            <div className='webhooks-seperator' />
        </div>
    );
}

export default WebhookRow;