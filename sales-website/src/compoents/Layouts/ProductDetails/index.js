import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import Header from '~/compoents/Layouts/compoents/Header';
import book1 from '~/assets/images/book2.jpg';
import logoOffice from '~/assets/images/logoOffice.png';
import logoTiki from '~/assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { InputNumber } from 'antd';
import Button from '~/compoents/Button';

const cx = classNames.bind(styles);

const onChange = () => {};

function ProductDetails() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header></Header>
            </div>
            <div className={cx('body')}>
                <div className={cx('wrapper-Header-Body')}>
                    <div className={cx('header-Body')}>Trang chu</div>
                </div>
                <div className={cx('main')}>
                    <div className={cx('main-Styled')}>
                        <div className={cx('wrapper-img')}>
                            <img src={book1} alt="sach" className={cx('img-Styled')}></img>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title-Product')}>
                            Mười Hai Học Thuyết Cơ Bản Về Bản Tính Con Người (Tái Bản Lần 4)
                        </div>
                        <div className={cx('rate-Product')}>
                            <div className={cx('number-Star')}>5.0</div>
                            <div className={cx('star-Product')}>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                            </div>
                            <div className={cx('quantity-Voted')}>
                                (8386)
                                <span>|</span>
                                <span className={cx('quantity-Sold')}>1000+</span>
                            </div>
                        </div>
                        <div className={cx('price-Product')}>
                            <div className={cx('cost-Product')}>
                                181000 <span className={cx('sup')}>đ</span>
                            </div>
                            <div className={cx('discount-Product')}> -34%</div>
                            <div className={cx('original-Price')}>
                                275000 <span className={cx('sup')}>đ</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('Seller')}>
                        <div className={cx('SellerHeader')}>
                            <div className={cx('logo-tiki')}>
                                <img src={logoTiki} alt="logoTiki"></img>
                            </div>
                            <div className={cx('tikiTrading')}>
                                Tiki Trading
                                <span className={cx('logoOffice')}>
                                    <img src={logoOffice} className={cx('style-Logo-Office')} alt="logoOffice"></img>
                                </span>
                            </div>
                            <div className={cx('rate-Trading-Tiki')}>
                                <span>|</span>
                                <div className={cx('Star-vote')}>
                                    4.7
                                    <FontAwesomeIcon icon={faStar} className={cx('Star')}></FontAwesomeIcon>
                                </div>
                                <div className={cx('rate')}>(5.5 triệu đánh giá)</div>
                            </div>
                        </div>
                        <div className={cx('purchase-Quantity-Product')}>
                            <div className={cx('Quantity-Product')}>
                                <div className={cx('QuantityLetters')}>Số lượng</div>
                                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                            </div>
                        </div>
                        <div>
                            <div className={cx('provisionalPrice')}>Tạm Tính</div>
                            <div className={cx('cost-Product')}>
                                181000 <span className={cx('sup')}>đ</span>
                            </div>
                        </div>
                        <div className={cx('btn-Buy')}>
                            <Button large>Mua Ngay</Button>
                            <Button add>Thêm vào giỏ hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
