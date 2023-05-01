import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCloud, faDroplet, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Device from '../utils/deviceControl/deviceControl';
import MessageModal from '../utils/messageModal/messageModal';
import styles from './home.module.scss';

const cx = classNames.bind(styles);

function Home({ socket }) {
    const [ledStatus, setLedStatus] = useState(false);
    const [fanStatus, setFanStatus] = useState(false);
    const [lockStatus, setLockStatus] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //     socket.on('init-data', (data) => {
    //         console.log(data);
    //         for (let i = 0; i < data.length; i++) {
    //             if (data[i].feed === 'led') {
    //                 setLedStatus(parseInt(data[i].data) !== 0);
    //             } else if (data[i].feed === 'fan') {
    //                 setFanStatus(parseInt(data[i].data) !== 0);
    //             }
    //         }
    //     });

    //     socket.on('change-data', (data) => {
    //         if (data.feed === 'led') {
    //             setLedStatus(parseInt(data.value) !== 0);
    //         } else if (data.feed === 'fan') {
    //             setFanStatus(parseInt(data.value) !== 0);
    //         }
    //     });
    // }, [socket]);

    const handleLedChange = (newValue) => {
        setLedStatus(newValue);
    };

    const handleFanChange = (newValue) => {
        setFanStatus(newValue);
    };

    const handleLockChange = (newValue) => {
        setLockStatus(newValue);
    };

    function handleClose() {
        setShowModal(false);
    }

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('control-side')}>
                    <div className={cx('control-content')}>
                        <div className={cx('header')}>
                            <div className={cx('hello-section')}>
                                <h2>Hi Jasica!</h2>
                            </div>
                            <div className={cx('status-weather-section')}>
                                <p>Welcome Home! The air quality is good & Fresh you can go out today</p>
                            </div>
                            <div className={cx('weather-data')}>
                                <div className={cx('temp-data')}>
                                    <div className={cx('temp-icon')}>
                                        <FontAwesomeIcon icon={faTemperatureHalf} />
                                    </div>
                                    <h4>
                                        +25<sup>&deg;</sup>C
                                    </h4>
                                    <p>Nhiệt độ ngoài trời</p>
                                </div>
                                <div className={cx('humi-data')}>
                                    <div className={cx('humi-icon')}>
                                        <FontAwesomeIcon icon={faDroplet} />
                                    </div>
                                    <h4>62%</h4>
                                    <p>Độ ẩm ngoài trời</p>
                                </div>
                                <div className={cx('weather-status')}>
                                    <div className={cx('cloud-icon')}>
                                        <FontAwesomeIcon icon={faCloud} />
                                    </div>
                                    <p>Trời nhiều mây không mưa mới lạ</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('control-section')}>
                            <div className={cx('control-header')}>
                                <h4>Thiết bị của bạn</h4>
                            </div>
                            <div className={cx('control-list')}>
                                <Device
                                    label={'led'}
                                    value={ledStatus}
                                    onChange={handleLedChange}
                                    iconCode={'lightbulb-on'}
                                    deviceName={'Đèn'}
                                />
                                <Device
                                    label={'fan'}
                                    value={fanStatus}
                                    onChange={handleFanChange}
                                    iconCode={'lightbulb-on'}
                                    deviceName={'Quạt'}
                                />
                                <Device
                                    label={'lock'}
                                    value={lockStatus}
                                    onChange={handleLockChange}
                                    iconCode={'lightbulb-on'}
                                    deviceName={'Khóa'}
                                />
                            </div>
                        </div>
                        <div className={cx('data-section')}>
                            <div className={cx('room-temp-data')}>
                                <div className={cx('room-temp-header')}>
                                    <div className={cx('room-temp-icon')}>
                                        <FontAwesomeIcon icon={faTemperatureHalf} />
                                    </div>
                                    <p>Nhiệt độ</p>
                                </div>
                                <div className={cx('room-temp-content')}>
                                    <h1>
                                        100<sup>&deg;</sup>C
                                    </h1>
                                </div>
                            </div>
                            <div className={cx('room-humi-data')}>
                                <div className={cx('room-humi-header')}>
                                    <div className={cx('room-humi-icon')}>
                                        <FontAwesomeIcon icon={faCloud} />
                                    </div>
                                    <p>Độ ẩm</p>
                                </div>
                                <div className={cx('room-humi-content')}>
                                    <h1>62%</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('info-side')}>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Launch vertically centered modal
                    </Button>
                    <MessageModal show={showModal} onHide={() => setShowModal(false)} />
                </div>
            </div>
        </div>
    );
}

// <ToggleButton label="LED" value={ledStatus} onChange={handleLedChange} />
//                 <ToggleButton label="Fan" value={fanStatus} onChange={handleFanChange} />

export default Home;
