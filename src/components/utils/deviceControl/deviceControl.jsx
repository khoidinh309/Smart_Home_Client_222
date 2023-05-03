import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToggleButton from '../toggleButton/toggleButton';
import styles from './deviceControl.module.scss';
import { faFan, faLightbulb, faLock } from '@fortawesome/free-solid-svg-icons';
import { useFeedContext, actions } from '../../../feedProvider';

const cx = classNames.bind(styles);

function Device({ label, deviceName }) {
    const [status, setStatus] = useState(false);
    const [state, dispatch] = useFeedContext();

    useEffect(() => {
        if (label === 'led') {
            setStatus(state.ledStatus !== 0);
        } else if (label === 'fan') {
            setStatus(state.fanStatus !== 0);
        } else {
            setStatus(state.lockStatus);
        }
    }, [state]);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h5>{status ? 'Bật' : 'Tắt'}</h5>
                <div className={cx('toggle-btn')}>
                    <ToggleButton
                        label={label}
                        value={status}
                        action={
                            label === 'led'
                                ? actions.setLedStatus
                                : label === 'fan'
                                ? actions.setFanStatus
                                : actions.setLockStatus
                        }
                    />
                </div>
            </div>
            <div className={cx('device-icon')}>
                <FontAwesomeIcon icon={label === 'led' ? faLightbulb : label === 'fan' ? faFan : faLock} />
            </div>
            <div className={cx('device-name')}>
                <h4>{deviceName}</h4>
            </div>
        </div>
    );
}

export default Device;
