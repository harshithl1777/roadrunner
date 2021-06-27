import React, { useState, useEffect, useRef } from 'react';
import authorizeTrello from '../../services/trello/authorize';
import { getTokens, sendTrelloToken, generateGoogleAuthURL } from '../../services/api/oAuth';
import googleIcon from './assets/google.svg';
import googleRed from './assets/googleRed.svg';
import trelloBlue from './assets/trelloBlue.svg';
import trelloIcon from './assets/trello.svg';
import loading from './assets/loading.svg';
import './onboarding.css';

const Onboarding = ({ cancel }) => {
    const [oAuthExists, setOAuthExists] = useState([null, null]);
    console.log(oAuthExists);
    const modalRef = useRef(null);
    const loadingWindow = useRef(null);
    const contentWindow = useRef(null);

    const closeModal = () => {
        modalRef.current.className = modalRef.current.className.replace('animate__fadeInUp', '');
        modalRef.current.className = modalRef.current.className+'animate__fadeOutDown';
        setTimeout(() => {
            cancel();
        }, 800);
    }

    useEffect(() => {
            if (oAuthExists[0] === null && oAuthExists[1] === null) {
                getTokens('bluestacks-master')
                .then(data => {
                    if (data.gapiaccess && data.gapirefresh && !data.trellotoken) setOAuthExists([true, false]);
                    else if (!data.gapiaccess && !data.gapirefresh && data.trellotoken) setOAuthExists([false, true]);
                    else if (data.gapiaccess && data.gapirefresh && data.trellotoken) closeModal();
                    else if (!data.gapiaccess && !data.gapirefresh && !data.trellotoken) setOAuthExists([false, false])
                })
                .catch((err) => {
                    alert(err);
                    const confirmMsg = 'Something went wrong while we were trying to confirm whether you\'ve onboarded or not. Have you already allowed Roadrunner to access your Google and Trello accounts?';
                    if (window.confirm(confirmMsg)) closeModal();
                });
            }
    }, [oAuthExists]);

    const googleClicked = () => {
        generateGoogleAuthURL()
        .then(url => { window.location.href = url })
        .catch((err) => alert(err));
    }

    const trelloSuccess = () => {
        sendTrelloToken('bluestacks-master', window.Trello.token())
        .then(status => {
            if (status === 201) window.location.reload();
        })
        .catch(err => alert(err));
    }

    const trelloError = () => alert('You must allow Roadrunner to access your Trello account in order to proceed. Please try again.');

    const trelloClicked = () => {
        authorizeTrello(trelloSuccess, trelloError);
    }

    return (
        <div className='onboarding animate__animated animate__fadeInUp' ref={modalRef}>
            <div className='onboarding-loading' ref={loadingWindow}>
                <div className='onboarding-loading-content'>
                    <img src={loading} alt='loading' className='onboarding-loading-img' />
                    <div className='onboarding-loading-text'>
                        <h1 className='onboarding-loading-title'>Confirming Google Auth</h1>
                        <h1 className='onboarding-loading-desc'>Just wait one second. Your Google authentication is being proccessed as we speak.</h1>
                    </div>
                </div>
            </div>
            <div className='onboarding-content' ref={contentWindow}>
                <h1 className='onboarding-header'>Third-Party Services</h1>
                <h3 className='onboarding-desc'>Hey there! Looks like you've disconnected your Google / Trello accounts from Roadrunner. Please sign in again.</h3>
                <div className='onboarding-labels'>
                    <label className='onboarding-google-label'>Connect your Google Account</label>
                    <label className='onboarding-trello-label'>Connect your Trello Account</label>
                </div>
                <div className='onboarding-btns'>
                    <button onClick={googleClicked} className={`onboarding-google-btn--${(oAuthExists[0]) ? 'done': 'active'}`} disabled={oAuthExists[0]}>
                        <div className={`onboarding-btn-content`}>
                            <img src={(oAuthExists[0]) ? googleRed : googleIcon} alt='google' className='onboarding-google-icon' />
                            <div className={`onboarding-btn-text${(oAuthExists[0]) ? '--done-google' : ''}`}>{(oAuthExists[0]) ? 'Google Connected' : 'Continue with Google'}</div>
                        </div>
                    </button>
                    <button onClick={trelloClicked} className={`onboarding-trello-btn--${(oAuthExists[1]) ? 'done' : 'active'}`} disabled={oAuthExists[1]}>
                        <div className={`onboarding-btn-content`}>
                            <img src={(oAuthExists[1]) ? trelloBlue : trelloIcon} alt='trello' className='onboarding-trello-icon' />
                            <div className={`onboarding-btn-text${(oAuthExists[1]) ? '--done-trello' : ''}`}>{(oAuthExists[1]) ? 'Trello Connected' : 'Continue with Trello'}</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Onboarding;