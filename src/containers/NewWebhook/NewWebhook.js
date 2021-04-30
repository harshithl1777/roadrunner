import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import loading from './assets/loading.svg';
import { getTokens } from '../../services/api/oAuth';
import { createWebhook } from '../../services/api/webhooks';
import customStyles from './selectStyles';
import moment from 'moment';
import './newwebhook.css';



const NewWebhook = ({ cancel, render, rerender, existing }) => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [list, setList] = useState(null);
    const [sheetID, setSheetID] = useState('');
    const [tabName, setTabName] = useState('');
    const [options, setOptions] = useState([]);

    const modalRef = useRef(null);
    const loadingWindow = useRef(null);
    const createWindow = useRef(null);

    const checkDuplicate = (prop) => {
        if (prop === 'name') {
            return (existing.filter(webhook => webhook.name.title === name).length === 0) ? false : true;
        } else if (prop === 'listID') {
            return (existing.filter(webhook => webhook.list.id === list.value).length === 0) ? false : true;
        } else if (prop === 'sheetID') {
            return (existing.filter(webhook => webhook.sheet.id === sheetID).length === 0) ? false : true;
        } else if (prop === 'tabName') {
            return (existing.filter(webhook => webhook.sheet.tab === tabName).length === 0) ? false : true;
        }
    }

    const structureData = () => {
        return {
            name,
            description: desc,
            listid: list.value,
            sheetid: sheetID,
            tabname: tabName,
            listname: list.label,
            datecreated: moment().format('MMM D, YYYY'),
            timecreated: moment().format('h:mm A')
        }
    }

    const createClicked = () => {
        if (name && desc && list && sheetID && tabName) {
            if (checkDuplicate('name')) {
                alert('A webhook with this name already exists');
            } else if (checkDuplicate('listID'))  {
                alert('A webhook with this listID already exists');
            } else if (checkDuplicate('sheetID') && checkDuplicate('tabName')) {
                alert('A webhook with this spreadsheet ID and tab name exists. Two webhooks cannot have the same spreadsheet and tab name. This well result in data overriding on the current spreadsheet data.');
            } else {
                createWindow.current.style.display = 'none';
                loadingWindow.current.style.display = 'block';
                const webhookData = structureData();
                createWebhook('admin@bluestacks.com', list.value, webhookData)
                .then(res => {
                    if (res === 201) {
                        setTimeout(() => {
                            rerender(render+1);
                            cancelClicked();
                        }, 2000);
                    }
                })
                .catch(() => {
                    alert('Something went wrong while trying to create your webhook. Please try again later');
                    rerender(render+1);
                    cancelClicked();
                });
            }
        } else {
            alert('Missing fields detected. Please fill out all fields to continue!');
        }
    }

    const cancelClicked = () => {
        modalRef.current.className = modalRef.current.className.replace('animate__fadeInUp', '');
        modalRef.current.className = modalRef.current.className+'animate__fadeOutDown';
        setTimeout(() => cancel(), 200);
    }

    const changeValue = (limit, current, original, func) => {
        if (current.length <= limit) {
            func(current);
        } else if (current.length < original.length) {
            func(current);
        }
    }

    useEffect(() => {
        const generateOptions = async () => {
            getTokens('admin@bluestacks.com')
            .then(async (tokens) => {
                const { data, err } = await axios.get(`https://api.trello.com/1/boards/9khsMGic/lists`, {
                    params: {
                        id: '9khsMGic',
                        key: process.env.REACT_APP_TRELLO_API_KEY,
                        token: tokens.trellotoken,
                    }
                });
                if (err) console.log(err);
                const optionsArray = [];
                data.forEach(({ id, name }) => optionsArray.push({ value: id, label: name }));
                setOptions(optionsArray);
            })
            .catch(() => {
                alert('There was a problem while trying to retrieve the existing Trello lists on your board');
                cancelClicked();
            })
            
        }
        generateOptions();
    }, []);

    return (
        <div ref={modalRef} className={`new-webhook animate__animated animate__fadeInUp`} >
            <div className='new-webhook-loading' ref={loadingWindow}>
                <div className='new-webhook-loading-content'>
                    <img src={loading} alt='loading' className='new-webhook-loading-img' />
                    <div className='new-webhook-loading-text'>
                        <h1 className='new-webhook-loading-title'>Creating Webhook</h1>
                        <h1 className='new-webhook-loading-desc'>Please wait. Your webhook is being created as we speak.</h1>
                    </div>
                </div>
            </div>
            <div ref={createWindow}>
                <div className='new-webhook-header'>
                    <h1 className='new-webhook-title'>Create Webhook</h1>
                    <h3 className='new-webhook-desc'>Just fill out the below details to get your new webhook up and running.</h3>
                </div>
                <div className='new-webhook-line'>
                    <div className='new-webhook-name input-group'>
                        <label className='new-webhook-label'>Name of Webhook</label>
                        <input placeholder=' ' type='text' className='new-webhook-input' value={name} onChange={(e) => changeValue(30, e.target.value, name, setName)} />
                    </div>
                    <div className='new-webhook-list input-group'>
                        <label className='new-webhook-label'>List ID</label>
                        <Select options={options}  styles={customStyles} placeholder='' value={list} onChange={({ value, label }) => setList({ value, label })} />
                    </div>
                </div>
                <div className='new-webhook-line'>
                    <div className='new-webhook-desc input-group'>
                        <label className='new-webhook-label'>Webhook Description</label>
                        <input placeholder=' ' type='text' className='new-webhook-input-desc' value={desc} onChange={(e) => changeValue(42, e.target.value, desc, setDesc)} />
                    </div>
                </div>
                <div className='new-webhook-line'>
                    <div className='new-webhook-id input-group'>
                        <label className='new-webhook-label'>Spreadsheet ID</label>
                        <input placeholder=' ' type='text' className='new-webhook-input' value={sheetID} onChange={(e) => setSheetID(e.target.value)} />
                    </div>
                    <div className='new-webhook-tab input-group'>
                        <label className='new-webhook-label'>Spreadsheet Tab Name</label>
                        <input placeholder=' ' type='text' className='new-webhook-input' value={tabName} onChange={(e) => setTabName(e.target.value)} />
                    </div>
                </div>
                <div className='new-webhook-btns'>
                    <button onClick={cancelClicked} className='new-webhook-cancel'>Cancel</button>
                    <button onClick={createClicked} className='new-webhook-create'>Create</button>
                </div>
            </div>
        </div>
    );
}

export default NewWebhook;