import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './toggleButton.module.scss';

const cx = classNames.bind(styles);

function ToggleButton({ label, value, onChange }) {
    const [isOn, setIsOn] = useState(value);

    const handleClick = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        onChange(newValue);
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
