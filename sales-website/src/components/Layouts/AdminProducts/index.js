import React from 'react';

import classNames from 'classnames/bind';
import styles from './AdminProduct.module.scss';

import Header from '../components/Header';
import FnHeader from '~/components/FnBar/FnHeader';
import FnProducts from './FnProducts';
import FnProductsContent from './FnProductsContent';

const cx = classNames.bind(styles);

function AdminProducts() {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('Fn-header')}>
                <FnHeader></FnHeader>
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <FnProducts></FnProducts>
                </div>
                <div className={cx('content')}>
                    <FnProductsContent></FnProductsContent>
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
