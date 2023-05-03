import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './toggleButton.module.scss';
import { useFeedContext } from '../../../feedProvider';

const cx = classNames.bind(styles);

function ToggleButton({ label, value, action }) {
    const [isOn, setIsOn] = useState(value);
    const [state, dispatch, socket] = useFeedContext();

    useEffect(() => {
        if (label === 'led') {
            setIsOn(state.ledStatus !== 0);
        } else if (label === 'fan') {
            setIsOn(state.fanStatus !== 0);
        } else if (label === 'lock') {
            setIsOn(state.lockStatus);
        } else {
            setIsOn(state.scheduleStatus);
        }
    }, [state]);

    const handleClick = () => {
        const newValue = !isOn;
        const value = newValue !== true ? 0 : label === 'fan' ? 100 : 1;
        if (label !== 'schedule') {
            socket.emit('toggle-message', {
                feed: label,
                value: value,
            });
        } else {
            if (newValue === false) {
                socket.emit('turn-off-time-interval', false);
            }
        }
        dispatch(action(label === 'lock' || label === 'schedule' ? newValue : value));
    };

    return (
        <div className={cx('toggle')}>
            <div className={cx('toggle__button', { 'toggle__button--on': isOn })} onClick={handleClick}>
                <div className={cx('toggle__button__thumb', { 'toggle__button__thumb--on': isOn })} />
            </div>
        </div>
    );
}

export default ToggleButton;
