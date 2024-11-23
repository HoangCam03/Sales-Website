import React from 'react';

import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

import rose from '~/assets/images/rose.jpg';
import Header from '../components/Header';
import FnHeader from '~/components/FnBar/FnHeader';
import FnBar from '~/components/FnBar';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('Fn-header')}>
                <FnHeader></FnHeader>
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <FnBar></FnBar>
                </div>
                <div className={cx('content')}>
                    <img src={rose} alt="rose" className={cx('product-image')} />
                    icontent
                </div>
            </div>
        </div>
    );
}

export default Admin;
