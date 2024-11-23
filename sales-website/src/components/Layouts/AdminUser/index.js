import React from 'react';

import classNames from 'classnames/bind';
import styles from './AdminUser.module.scss';

import Header from '../components/Header';
import FnHeader from '~/components/FnBar/FnHeader';
import FnUser from './FnUser';
import FnUserContent from './FnUserContent';

const cx = classNames.bind(styles);

function AdminUser() {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('Fn-header')}>
                <FnHeader></FnHeader>
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <FnUser></FnUser>
                </div>
                <div className={cx('content')}>
                    <FnUserContent></FnUserContent>
                </div>
            </div>
        </div>
    );
}

export default AdminUser;
