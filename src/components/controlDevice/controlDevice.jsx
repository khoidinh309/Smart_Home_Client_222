import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './controlDevice.module.scss';
import ToggleButton from '../utils/toggleButton/toggleButton';
import TimeRangePicker from '../utils/timePicker/timePicker';

const cx = classNames.bind(styles);

function ControlDevice() {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [ledStatus, setLedStatus] = useState(false);
    const [fanStatus, setFanStatus] = useState(false);

    const handleStartTimeChange = (value) => {
        setStartTime(value);
    };

    const handleEndTimeChange = (value) => {
        setEndTime(value);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h3>Điều khiển đèn và quạt</h3>
            </div>
            <div className={cx('control-section')}>
                <div className={cx('light-section')}>
                    <div className={cx('toggle-section')}>
                        <div className={cx('image-btn')}>
                            <div className={cx('light-image')}></div>
                            <div className={cx('light-toggle-btn')}>
                                <ToggleButton />
                            </div>
                        </div>
                        <div className={cx('color-picker')}>
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className={cx('schedule-section')}>
                        <div className={cx('schedule-toggle-section')}>
                            <div className={cx('schedule-title')}>
                                <h3>Đèn tự động</h3>
                            </div>
                            <div className={cx('schedule-toggle-btn')}>
                                <ToggleButton />
                            </div>
                        </div>
                        <div className={cx('time-section')}>
                            <div className={cx('time-picker')}>
                                <TimeRangePicker
                                    startTime={startTime}
                                    endTime={endTime}
                                    handleStartTimeChange={handleStartTimeChange}
                                    handleEndTimeChange={handleEndTimeChange}
                                />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default ControlDevice;
