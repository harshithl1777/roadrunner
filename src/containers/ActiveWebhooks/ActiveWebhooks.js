import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import deleteIcon from './assets/deleteIcon.svg';
import addIcon from './assets/addIcon.svg';
import WebhookRow from '../../components/WebhookRow/WebhookRow';
import NewWebhook from '../NewWebhook/NewWebhook';
import DeleteWebhook from '../DeleteWebhook/DeleteWebhook';
import Onboarding from '../Onboarding/Onboarding';
import { getTokens } from '../../services/api/oAuth';
import { retrieveWebhooks } from '../../services/api/webhooks';
import loading from './assets/loading.svg';
import './activewebhooks.css';

const ActiveWebhooks = () => {
    const [createWebhookOpen, setCreateWebhook] = useState(false);
    const [deleteWebhookOpen, setDeleteWebhook] = useState(false);
    const [onboardingOpen, setOnboardingOpen] = useState(null);
    const [selectedWebhooks, setSelected] = useState([]);
    const [renderNum, forceRerender] = useState(0);
    const [webhookData, setWebhookData] = useState(null);
    const loadingRef = useRef(null);
    const contentListRef = useRef(null);
    console.log(selectedWebhooks);

    const renderModal = () => {
        if (createWebhookOpen) return <NewWebhook  cancel={() => setCreateWebhook(false)} render={renderNum} rerender={forceRerender} existing={webhookData} />;
        else if (deleteWebhookOpen) return <DeleteWebhook  cancel={() => setDeleteWebhook(false)} toDelete={selectedWebhooks} render={renderNum} rerender={forceRerender}  />;
        else if (onboardingOpen) return <Onboarding cancel={() => setOnboardingOpen(false)} />;
    }

    const renderOnboarding = () => {
        if (onboardingOpen === null) {
            getTokens('bluestacks-master')
            .then(data => {
                if (!(data.gapiaccess && data.gapirefresh && data.trellotoken)) {
                    setOnboardingOpen(true);
                }
            })
            .catch((err) => {
                alert(err);
                const confirmMsg = 'Something went wrong while we were trying to confirm whether you\'ve onboarded or not. Have you already allowed Roadrunner to access your Google and Trello accounts?';
                if (!window.confirm(confirmMsg)) return <Onboarding cancel={() => setOnboardingOpen(false)} />;
            });
        }
    }
        

    const checkboxClicked = (data) => {
        if (selectedWebhooks.findIndex(webhook => _.isEqual(webhook, data)) !== -1) {
            if (selectedWebhooks.length === 1) {
                setSelected([]);
            } else {
                setSelected(selectedWebhooks.filter(webhook => !(_.isEqual(webhook, data))));
            }
        } else {
            setSelected([...selectedWebhooks, data]);
        }
    }

    const renderWebhooks = () => {
        if (webhookData === null) return null;
        return webhookData.map((item, index) => {
            return (
                <WebhookRow onSelect={checkboxClicked} data={item} key={index} />
            );
        });
    }

    useEffect(() => {
        setSelected([]);
        setTimeout( async () => {
            retrieveWebhooks()
                .then((data) => {
                    setWebhookData(data);
                })
                .catch(() => alert('Unable to retrieve existing webhooks. Please reload the page and try again.'));
        }, 1500);
    }, [renderNum]);

    return (
        <div>
            <div className={(createWebhookOpen || deleteWebhookOpen || onboardingOpen) ? 'modal-backdrop' : null} >
                {renderModal()}
                {renderOnboarding()}
            </div>
            <div className='webhooks'>
                <div className='webhooks-content'>
                    <div className='webhooks-header'>
                        <div className='webhooks-header-text'>
                            <h1 className='webhooks-header-title'>Active Webhooks</h1>
                            <h3 className='webhooks-header-desc'>Here’s where you’ll be able to see all the webhooks that are currently active.</h3>
                        </div>
                        <div className='webhooks-header-btns'>
                            <button className='webhooks-delete-btn' onClick={() => {
                                if (selectedWebhooks.length > 0) setDeleteWebhook(true);
                                else alert('No webhooks selected. Select some webhooks to delete.');
                            }}>
                                <div className='webhooks-btn-content'>
                                    <img src={deleteIcon} alt='delete' className='webhooks-btn-icon' />
                                    <div className='webhooks-btn-text'>Delete</div>
                                </div>
                            </button>
                            <button className='webhooks-add-btn' onClick={() => setCreateWebhook(true)}>
                                <div className='webhooks-btn-content'>
                                    <img src={addIcon} alt='add' className='webhooks-btn-icon' />
                                    <div className='webhooks-btn-text'>New Webhook</div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='webhooks-list'>
                        <div className='webhooks-seperator' />
                            <div className='webhooks-list-headers'>
                                <h3 className='webhooks-list-header head1'>NAME</h3>
                                <h3 className='webhooks-list-header head2'>SPREADSHEET ID</h3>
                                <h3 className='webhooks-list-header head3'>LIST NAME</h3>
                                <h3 className='webhooks-list-header head4'>CREATOR</h3>
                                <h3 className='webhooks-list-header head5'>CREATED</h3>
                            </div>
                        <div className='webhooks-seperator' />
                    </div>
                    <div className='webhooks-loading-wrap' ref={loadingRef} style={{ display: (webhookData === null) ? 'flex' : 'none' }}>
                        <img className='webhooks-loading' alt='loading' src={loading}/>
                    </div>
                    <div className='webhooks-list-wrap' ref={contentListRef} style={{ display: (webhookData === null) ? 'none' : 'block' }}>
                        {(webhookData !== null) ? renderWebhooks() : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveWebhooks;