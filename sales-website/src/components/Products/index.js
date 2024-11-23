import React from 'react';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import logo from '~/assets/images/logo2.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

function Products(props) {
    const navigate = useNavigate();
    const { image, name, price, rating, discount, sold, id } = props;
    console.log('Rating:', rating, typeof rating);
    const handleDetailProduct = (id) => {
        navigate(`/product-details/${id}`);
    };

    return (
        <div className={cx('product-frame')} onClick={() => handleDetailProduct(id)}>
            <div className={cx('prd-img')}>
                <img src={image} alt="anh meo" className={cx('product-photo')} />
                {/* <img src={logo} alt="anh meo" className={cx('product-logo')} /> */}
            </div>
            <div className={cx('content')}>
                <img src={logo} alt="anh meo" className={cx('product-logo')} />
                <div className={cx('title')}>{name}</div>
                <div className={cx('rate')}>
                    <div className={cx('star')}>
                        {/* Hiển thị số ngôi sao tương ứng với rating */}
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={index < rating ? cx('filled-star') : cx('empty-star')}
                            />
                        ))}
                    </div>
                    <span className={cx('sold')}>|Đã bán {sold}+</span>
                </div>
                <div className={cx('price-Product')}>
                    <div className={cx('price')}>
                        {price ? price.toLocaleString() : 'N/A'} <span className={cx('sup')}>đ</span>
                    </div>
                    <div className={cx('original-Price')}>
                        {Math.round(price / (1 - discount / 100)).toLocaleString()} <span className={cx('sup')}>đ</span>
                    </div>
                </div>
                <div className={cx('price-discount')}>-{discount}%</div>
            </div>
        </div>
    );
}

export default Products;
