import React from 'react';

import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import logo from '~/assets/images/logo2.png';
import photo from '~/assets/images/mew.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Products() {
    return (
        <div className={cx('product-frame')}>
            <div className={cx('prd-img')}>
                <img src={photo} alt="anh meo" className={cx('product-photo')} />
                <img src={logo} alt="anh meo" className={cx('product-logo')} />
            </div>
            <div className={cx('content')}>
                <div className={cx('title')}>Iphone</div>
                <div className={cx('rate')}>
                    <div className={cx('star')}>
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    </div>
                    <span className={cx('sold')}>|Đã bán 1000+</span>
                </div>
                <div className={cx('product-price')}>
                    8386 <span className={cx('sup')}>đ</span>
                </div>
                <div className={cx('price-discount')}>-25%</div>
            </div>
        </div>
    );
}

export default Products;
