import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useFeedContext, actions } from '../../feedProvider';
import styles from './controlDevice.module.scss';
import ToggleButton from '../utils/toggleButton/toggleButton';
import TimeRangePicker from '../utils/timePicker/timePicker';
import lightOnImage from '../../assets/images/light-on.jpg';
import lightOffImage from '../../assets/images/light-off.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { isValidTime } from '../utils/checkValidTime';
import fanImage from '../../assets/images/fan-off.svg';

const cx = classNames.bind(styles);

function ControlDevice() {
    const [scheduleStatus, setScheduleStatus] = useState(false);
    const [state, dispatch, socket] = useFeedContext();
    const [selectedColor, setSelectedColor] = useState(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const [startTime, setStartTime] = useState(JSON.parse(localStorage.getItem('startTime')) || '18:00');
    const [endTime, setEndTime] = useState(JSON.parse(localStorage.getItem('endTime')) || '6:00');

    const handleColorClick = (color) => {
        socket.emit('toggle-message', {
            feed: 'led',
            value: color,
        });
    };

    const handleSpeedClick = (speed) => {
        socket.emit('toggle-message', {
            feed: 'fan',
            value: speed,
        });
    };

    const handleStartTimeChange = (value) => {
        if (isValidTime(value)) {
            localStorage.setItem('startTime', JSON.stringify(value));
        }
        setStartTime(value);
    };

    const handleEndTimeChange = (value) => {
        if (isValidTime(value)) {
            localStorage.setItem('endTime', JSON.stringify(value));
        }
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
                            <div className={cx('light-image')}>
                                <img src={state.ledStatus !== 0 ? lightOnImage : lightOffImage} />
                            </div>
                            <div className={cx('light-toggle-btn')}>
                                <div className={cx('led-status')}>
                                    <h4>{state.ledStatus ? 'Bật' : 'Tắt'}</h4>
                                </div>
                                <div className={cx('toggle-btn')}>
                                    <ToggleButton label={'led'} value={state.ledStatus} action={actions.setLedStatus} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('color-picker')}>
                            <div className={cx('color-picker-title')}>
                                <h3>Chọn màu</h3>
                            </div>
                            <div className={cx('white-color')}>
                                <div className={cx('w-color')} onClick={() => handleColorClick(1)}>
                                    <p></p>
                                </div>
                                {state.ledStatus === 1 ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                            </div>
                            <div className={cx('red-color')}>
                                <div className={cx('r-color')} onClick={() => handleColorClick(2)}>
                                    <p></p>
                                </div>
                                {state.ledStatus === 2 ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                            </div>
                            <div className={cx('warm-color')}>
                                <div className={cx('o-color')} onClick={() => handleColorClick(4)}>
                                    <p></p>
                                </div>
                                {state.ledStatus === 4 ? <FontAwesomeIcon icon={faCheck} /> : <></>}
                            </div>
                        </div>
                    </div>
                    <div className={cx('schedule-section')}>
                        <div className={cx('schedule-toggle-section')}>
                            <div className={cx('schedule-title')}>
                                <h3>Đèn tự động</h3>
                            </div>
                            <div className={cx('schedule-toggle-btn')}>
                                <ToggleButton
                                    label={'schedule'}
                                    value={state.scheduleStatus}
                                    action={actions.setScheduleStatus}
                                />
                            </div>
                        </div>
                        <div className={cx('time-section')}>
                            <div className={cx('start-time')}>
                                <h4>Thời gian bật</h4>
                                <input
                                    type="text"
                                    value={startTime}
                                    onChange={(e) => handleStartTimeChange(e.target.value)}
                                />
                            </div>
                            <div className={cx('end-time')}>
                                <h4>Thời gian tắt</h4>
                                <input
                                    type="text"
                                    value={endTime}
                                    onChange={(e) => handleEndTimeChange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('fan-section')}>
                    <div className={cx('fan-toggle-section')}>
                        <div className={cx('fan-image-btn')}>
                            <div className={cx('fan-image')}>
                                <img src={fanImage} />
                            </div>
                            <div className={cx('fan-toggle-btn')}>
                                <div className={cx('fan-status')}>
                                    <h4>{state.fanStatus ? 'Bật' : 'Tắt'}</h4>
                                </div>
                                <div className={cx('fan-toggle-btn')}>
                                    <ToggleButton label={'fan'} value={state.fanStatus} action={actions.setFanStatus} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('speed-picker')}>
                        <div className={cx('speed-picker-title')}>
                            <h3>Chọn tốc độ</h3>
                        </div>
                        <div className={cx('full-speed')}>
                            <h5>Tối đa: 100%</h5>
                            <input
                                type="checkbox"
                                checked={state.fanStatus === 100}
                                onClick={() => handleSpeedClick(100)}
                            />
                        </div>
                        <div className={cx('half-speed')}>
                            <h5>Vừa phải: 50%</h5>
                            <input
                                type="checkbox"
                                checked={state.fanStatus === 50}
                                onClick={() => handleSpeedClick(50)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlDevice;
