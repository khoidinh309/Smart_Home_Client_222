import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faSliders } from '@fortawesome/free-solid-svg-icons';
import styles from './navigation.module.scss';

const cx = classNames.bind(styles);

const Navigation = () => {
    const location = useLocation();

    return (
        <div className={cx('container')}>
            <ul className={cx('item-list')}>
                <li
                    className={cx('item', {
                        active: location.pathname === '/',
                    })}
                >
                    <div className={cx('icon')}>
                        <Link to={'/'}>
                            <FontAwesomeIcon icon={faHouseUser} />
                        </Link>
                    </div>
                </li>
                <li
                    className={cx('item', {
                        active: location.pathname === '/control',
                    })}
                >
                    <div className={cx('icon')}>
                        <Link to={'/control'}>
                            <FontAwesomeIcon icon={faSliders} />
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
