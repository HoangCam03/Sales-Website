import React from 'react';

import images from '~/assets/images/logo.png';
import avt from '~/assets/images/freeShip/avt.jpg';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Styles mặc định của Tippy
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);
function HeaderOnly() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Tippy
                    content="Về trang chủ mà chưa thanh toán à"
                    placement="bottom"
                    animation="fade"
                    className={cx('hotline-title')}
                >
                    <div className={cx('logo')} onClick={handleClick}>
                        <img className={cx('logo-tiki')} src={images} alt="Tiki" />
                        <span className={cx('logo-slogan')}>Tốt & nhanh</span>
                    </div>
                </Tippy>
                <span className={cx('divider')}> </span>
                <div className={cx('container')}>
                    <div className={cx('title')}>Thanh Toán</div>
                </div>
                <div className={cx('action')}></div>
                <div className={cx('hotline')}>
                    <Tippy
                        content="Facebook của CMAi"
                        placement="bottom"
                        animation="fade"
                        className={cx('hotline-title')}
                    >
                        <a href="https://www.facebook.com/Cmaiiii/?locale=vi_VN">
                            <picture className={cx('webpimg-container')}>
                                <img src={avt} alt="Avatar" className={cx('avatar')} />
                            </picture>
                        </a>
                    </Tippy>
                </div>
            </div>
        </header>
    );
}

export default HeaderOnly;
