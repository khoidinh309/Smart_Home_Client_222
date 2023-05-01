import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Home, Navigation } from './components';
import classNames from 'classnames/bind';
import styles from './GlobalStyles/app.module.scss';

const cx = classNames.bind(styles);
//const socket = io('https://127.0.0.1:3001');

const socket = null;

const routes = [
    { path: '/', component: Home, exact: true },
    //{ path: '/about', component: About },
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
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={<route.component socket={socket} />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
