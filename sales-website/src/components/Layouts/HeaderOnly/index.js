import React from 'react';

import images from '~/assets/images/logo.png';
import avt from '~/assets/images/freeShip/avt.jpg';

import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);
function HeaderOnly() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-tiki')} src={images} alt="Tiki" />
                    <span className={cx('logo-slogan')}>Tốt & nhanh</span>
                </div>
                <span className={cx('divider')}> </span>
                <div className={cx('container')}>
                    <div className={cx('title')}>Thanh Toán</div>
                </div>
                <div className={cx('action')}></div>
                <div className={cx('hotline')}>
                    <a href="https://www.facebook.com/Cmaiiii/?locale=vi_VN">
                        <picture className={cx('webpimg-container')}>
                            <img src={avt} alt="Avatar" className={cx('avatar')} />
                        </picture>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default HeaderOnly;
