import React, { useState } from 'react';
import firebase from "firebase/app";
import 'firebase/auth';

import FeedbackModal from '../FeedbackModal/FeedbackModal';
import Button from '../Button/Button';
import logo from './assets/logo.svg';
import webhooksIcon from './assets/activeHooksLogo.svg';
import docsIcon from './assets/docsIcon.svg';
import profilePic from './assets/profilePic.svg';
import logoutIcon from './assets/logout.svg';
import './sidebar.css';


const Sidebar = () => {
    const [feedbackModal, changeFeedbackModal] = useState(false);

    const logoutUser = () => {
        firebase.auth().signOut()
        .then(() => {
            window.localStorage.removeItem('roadrunnerUserIsAuthenticated');
            window.location.href = '/';
        })
        .catch(() => {
            alert('There was a problem when trying to log you out. Try again later.');
        });
    }

    const renderModal = () => {
        return (feedbackModal) ? <FeedbackModal /> : null;
    }

    return (
        <div className='sidebar-wrap'>
            {renderModal()}
            <div className={(feedbackModal) ? 'modal-backdrop' : null}></div>
                <div className='sidebar'>
                    <div className='sidebar-top'> 
                        <div className='sidebar-logo-wrapper'>
                            <img alt='interior logo' src={logo} className='sidebar-logo' draggable='false'/>
                        </div>
                        <div className='sidebar-nav'>
                            <Button color='white' bg='#1968DD' width='237px' height='40px' weight='800' font='14px' border='6px'>
                                <div className='sidebar-btn-content'>
                                    <img src={webhooksIcon} alt='webhooks icon' className='sidebar-webhooks-icon' />
                                    <div className='sidebar-webhooks-text'>Active Webhooks</div>
                                </div>
                            </Button>
                            <Button color='rgba(255, 255, 255, 0.4)' bg='none' width='237px' height='40px' weight='600' font='14px' className='sidebar-nav-btn'>
                                <div className='sidebar-btn-content'>
                                    <img src={docsIcon} alt='webhooks icon' className='sidebar-webhooks-icon' />
                                    <div className='sidebar-webhooks-text'>Documentation</div>
                                </div>
                            </Button>
                        </div>
                    </div> 
                    <div className='sidebar-bottom'>
                        <div className='sidebar-feedback'>
                            <h3 className='sidebar-feedback-header'>Got any feedback?</h3>
                            <h3 className='sidebar-feedback-desc'>Whether you've got some feature suggestions or you're experiencing difficulties, we'd be happy to hear your feedback. Just send us a quick email and we'll make sure to get back to you.</h3>
                            <Button onClick={() => window.open('mailto:harshithl1777@gmail.com')} color='white' bg='#1968DD' width='191px' height='32px' border='6px' weight='800' font='12.5px'>Send Feedback</Button>
                        </div>
                        <div className='sidebar-user'>
                            <img src={profilePic} alt='profile' className='sidebar-user-photo' />
                            <div className='sidebar-user-content'>
                                <div className='sidebar-user-name'>Bluestacks Master</div>
                                <div className='sidebar-user-email'>bluestacks-master</div>
                            </div>
                            <div onClick={logoutUser} className='sidebar-logout'><img className='sidebar-logout-icon' src={logoutIcon} alt='logout' /></div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Sidebar;