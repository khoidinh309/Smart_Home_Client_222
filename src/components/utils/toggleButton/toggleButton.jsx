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
            setIsOn(state.ledStatus);
        } else if (label === 'fan') {
            setIsOn(state.fanStatus);
        } else {
            setIsOn(state.lockStatus);
        }
    }, [state]);

    const handleClick = () => {
        const newValue = !isOn;
        socket.emit('toggle-message', {
            feed: label,
            value: newValue === true ? 1 : 0,
        });
        dispatch(action(newValue));
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
