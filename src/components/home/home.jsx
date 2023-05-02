import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCloud, faDroplet, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Device from '../utils/deviceControl/deviceControl';
import MessageModal from '../utils/messageModal/messageModal';
import styles from './home.module.scss';
import { useFeedContext, actions } from '../../feedProvider';

const cx = classNames.bind(styles);

function Home() {
    const [state, dispatch, socket] = useFeedContext();
    const [outdoorTemp, setOutdoorTemp] = useState(0);
    const [outdoorHumi, setOutdoorHumi] = useState(0);
    const [outdoorDesc, setOutdoorDesc] = useState('');
    const API_KEY = '02d8dc2b7e722da5518d9962fef61767';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Ho%20Chi%20Minh%20City&appid=${API_KEY}&units=metric`;

    useEffect(() => {
        socket.on('init-data', (data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].feed === 'led') {
                    dispatch(actions.setLedStatus(parseInt(data[i].data) !== 0));
                } else if (data[i].feed === 'fan') {
                    dispatch(actions.setFanStatus(parseInt(data[i].data) !== 0));
                } else if (data[i].feed === 'lock') {
                    dispatch(actions.setLockStatus(parseInt(data[i].data) !== 0));
                } else if (data[i].feed === 'temp') {
                    dispatch(actions.setTempValue(parseFloat(data[i].data)));
                } else {
                    dispatch(actions.setHumiValue(parseFloat(data[i].data)));
                }
            }
        });

        socket.on('change-data', (data) => {
            if (data.feed === 'led') {
                dispatch(actions.setLedStatus(parseInt(data.value) !== 0));
            } else if (data.feed === 'fan') {
                dispatch(actions.setFanStatus(parseInt(data.value) !== 0));
            } else if (data.feed === 'lock') {
                dispatch(actions.setLockStatus(parseInt(data.value) !== 0));
            } else if (data.feed === 'temp') {
                dispatch(actions.setTempValue(parseFloat(data.value)));
            } else if (data.feed === 'humi') {
                dispatch(actions.setHumiValue(parseFloat(data.value)));
            } else {
                dispatch(actions.setShowModal(parseInt(data.value) !== 0));
            }
        });
    }, [socket]);

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                const data = response.data;
                setOutdoorTemp((prev) => data.main.temp);
                setOutdoorHumi((prev) => data.main.humidity);
                // Get the long description of the weather condition
                setOutdoorDesc((prev) => data.weather[0].description);
            })
            .catch((error) => console.log(error));
    }, []);

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
                                        +{outdoorTemp}
                                        <sup>&deg;</sup>C
                                    </h4>
                                    <p>Nhiệt độ ngoài trời</p>
                                </div>
                                <div className={cx('humi-data')}>
                                    <div className={cx('humi-icon')}>
                                        <FontAwesomeIcon icon={faDroplet} />
                                    </div>
                                    <h4>{outdoorHumi}%</h4>
                                    <p>Độ ẩm ngoài trời</p>
                                </div>
                                <div className={cx('weather-status')}>
                                    <div className={cx('cloud-icon')}>
                                        <FontAwesomeIcon icon={faCloud} />
                                    </div>
                                    <p>{outdoorDesc}</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('control-section')}>
                            <div className={cx('control-header')}>
                                <h4>Thiết bị của bạn</h4>
                            </div>
                            <div className={cx('control-list')}>
                                <Device label={'led'} deviceName={'Đèn'} />
                                <Device label={'fan'} deviceName={'Quạt'} />
                                <Device label={'lock'} deviceName={'Khóa'} />
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
                                        {state.temp}
                                        <sup>&deg;</sup>C
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
                                    <h1>{state.humi}%</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('info-side')}>
                    <MessageModal show={state.showModal} onHide={() => dispatch(actions.setShowModal(false))} />
                </div>
            </div>
        </div>
    );
}

// <ToggleButton label="LED" value={ledStatus} onChange={handleLedChange} />
//                 <ToggleButton label="Fan" value={fanStatus} onChange={handleFanChange} />

export default Home;
