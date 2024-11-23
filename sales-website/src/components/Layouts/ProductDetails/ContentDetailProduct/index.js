import classNames from 'classnames/bind';
import styles from './ContentDetailProduct.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ContentDetailProduct(props) {
    const { name, price, rating, discount, sold } = props;

    return (
        <div className={cx('content')}>
            <div className={cx('title-Product')}>{name}</div>
            <div className={cx('rate-Product')}>
                <div className={cx('star-Product')}>
                    {/* Hiển thị số ngôi sao tương ứng với rating */}
                    {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className={index < rating ? cx('filled-star') : cx('empty-star')}
                        />
                    ))}
                </div>
                <div className={cx('quantity-Voted')}>
                    (800)
                    <span>|</span>
                    <span className={cx('quantity-Sold')}> đã bán {sold}+</span>
                </div>
            </div>
            <div className={cx('price-Product')}>
                <div className={cx('cost-Product')}>
                    {price.toLocaleString()} <span className={cx('sup')}>đ</span>
                </div>
                <div className={cx('discount-Product')}> -{discount}%</div>
                <div className={cx('original-Price')}>
                    {Math.round(price / (1 - discount / 100)).toLocaleString()} <span className={cx('sup')}>đ</span>
                </div>
            </div>
        </div>
    );
}

export default ContentDetailProduct;
