import React, { useRef, useState } from 'react';
import { deleteWebhooks } from '../../services/api/webhooks';
import loading from './assets/loading.svg';
import './deletewebhook.css';

const DeleteWebhook = ({ cancel, toDelete, render, rerender }) => {
    const modalRef = useRef(null);
    const loadingWindow = useRef(null);
    const confirmWindow = useRef(null);
    const [confirmInput, changeConfirmInput] = useState('');

    const cancelClicked = () => {
        modalRef.current.className = modalRef.current.className.replace('animate__fadeInUp', '');
        modalRef.current.className = modalRef.current.className+'animate__fadeOutDown';
        setTimeout(() => cancel(), 200);
    }

    const deleteClicked = () => {
        confirmWindow.current.style.display = 'none';
        loadingWindow.current.style.display = 'block';
        const ids = [];
        toDelete.forEach((hook) => {
            ids.push(hook.id);
        });
        deleteWebhooks('admin@bluestacks.com', ids)
        .then((status) => {
            if (status === 200) {
                setTimeout(() => {
                    rerender(render+1);
                    cancelClicked();
                }, 2000);
            }
        })
        .catch(() =>  {
            alert('Unable to delete any webhooks. Please try again later.');
            rerender(render+1);
            cancelClicked();
        });
    }

    return (
        <div ref={modalRef} className='delete-webhook animate__animated animate__fadeInUp'>
            <div className='delete-webhook-loading' ref={loadingWindow}>
                <div className='delete-webhook-loading-content'>
                    <img src={loading} alt='loading' className='delete-webhook-loading-img' />
                    <div className='delete-webhook-loading-text'>
                        <h1 className='delete-webhook-loading-title'>Deleting Webhook</h1>
                        <h1 className='delete-webhook-loading-desc'>Just wait one second. Your webhook is being deleted as we speak.</h1>
                    </div>
                </div>
            </div>
            <div ref={confirmWindow} className='delete-webhook-confirm-window'>
                <h1 className='delete-webhook-header'>Delete {toDelete.length} {(toDelete.length > 1) ? 'webhooks' : 'webhook'}</h1>
                <h3 className='delete-webhook-subtitle'>Are you sure that you want to delete these webhooks? Once deleted, you won't be able to restore them.</h3>
                <label className='delete-webhook-input-sub'>Enter “{(toDelete !== null && toDelete.length !== 0) ? toDelete[0].name : ''}” below to confirm.</label>
                <input value={confirmInput} className='delete-webhook-confirm' placeholder=' ' type='text' onChange={(e) => changeConfirmInput(e.target.value)}/>
                <div className='delete-webhook-btns'>
                    <button className='delete-webhook-btn-cancel' onClick={cancelClicked}>Cancel</button>
                    <button className='delete-webhook-btn-del' onClick={() => {
                        if (confirmInput === toDelete[0].name) deleteClicked();
                        else if (confirmInput === '') alert('You must confirm that you wish to delete these webhooks');
                        else alert('Inputted confirmation does not equal the requested confirmation.');
                    }}>Delete {(toDelete.length > 1) ? 'webhooks' : 'webhook'}</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteWebhook;