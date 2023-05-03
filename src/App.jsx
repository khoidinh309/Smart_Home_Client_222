import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Home, Navigation, ControlDevice } from './components';
import classNames from 'classnames/bind';
import styles from './GlobalStyles/app.module.scss';

const cx = classNames.bind(styles);

const routes = [
    { path: '/', component: Home, exact: true },
    { path: '/control', component: ControlDevice },
];

function App() {
    return (
        <BrowserRouter>
            <div className={cx('app-container')}>
                <div className={cx('sidebar')}>
                    <Navigation />
                </div>
                <div className={cx('content')}>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} exact={route.exact} element={<route.component />} />
                        ))}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
