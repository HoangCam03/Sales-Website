import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBarPay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SidebarPayInfor(props) {
    const { name, quantity, image, price, discount, provisionalPrice } = props;
    const [selectedMethod, setSelectedMethod] = useState('3');

    const handleChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('shipping-plan')}>
                <h3 className={cx('section-title')}>Chọn hình thức giao hàng</h3>
                <div className={cx('method-list')}>
                    <div className={cx('shipping-method-list')}>
                        {/* Method 1 */}
                        <label className={cx('radio-button')}>
                            <input
                                type="radio"
                                name="shipping-method-infor"
                                value="3"
                                checked={selectedMethod === '3'}
                                onChange={handleChange}
                            />
                            <span className={cx('radio-fake')}></span>
                            <span className={cx('label')}>
                                <div className={cx('delivery-method')}>
                                    <img
                                        className={cx('method-logo')}
                                        alt="delivery-method-icon"
                                        width="32"
                                        height="16"
                                        src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                                    />
                                    <span className={cx('method-text')}>Giao siêu tốc 2h</span>
                                    <span className={cx('freeship-badge')}>-12K</span>
                                </div>
                            </span>
                        </label>

                        {/* Method 2 */}
                        <label className={cx('radio-button')}>
                            <input
                                type="radio"
                                name="shipping-method-infor"
                                value="1"
                                checked={selectedMethod === '1'}
                                onChange={handleChange}
                            />
                            <span className={cx('radio-fake')}></span>
                            <span className={cx('label')}>
                                <div className={cx('delivery-method')}>
                                    <span className={cx('method-text')}>Giao tiết kiệm</span>
                                    <span className={cx('freeship-badge')}>-12K</span>
                                </div>
                            </span>
                        </label>
                    </div>

                    <img
                        alt="arrow"
                        className={cx('methods-arrow')}
                        src="https://salt.tikicdn.com/ts/upload/05/9e/d8/f13e86df128f19d197397e44924f9616.png"
                        width="32"
                    ></img>
                </div>

                {/* Package Details */}
                <div className={cx('shipping-details')}>
                    <div className={cx('shipping-package')}>
                        <div className={cx('package-title')}>
                            <img
                                width="24"
                                height="24"
                                alt="icon"
                                src="https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png"
                            />
                            Gói: Giao siêu tốc 2h, trước 11h hôm nay
                        </div>
                        {/* Left content */}
                        <div className={cx('left-content')}>
                            <div className={cx('package-summary')}>
                                <div className={cx('delivery-method')}>
                                    <img
                                        className={cx('method-logo')}
                                        alt="delivery-method-icon"
                                        width="32"
                                        height="16"
                                        src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                                    />
                                    <span className={cx('method-text')} style={{ lineHeight: '16px' }}>
                                        Giao siêu tốc 2h
                                    </span>
                                </div>
                                <div className={cx('ShippingFeeShippingFee', 'XUTGR')}>
                                    <span className={cx('original-fee')}>25.000 ₫</span>
                                    <span className={cx('current-fee')}>10.000 ₫</span>
                                    <img
                                        className={cx('info-icon')}
                                        src="https://salt.tikicdn.com/ts/ta/0f/a3/a2/962b12a6d4c8425cefcffdee06d294ad.png"
                                        alt="info"
                                        aria-describedby="popup-4"
                                        style={{ width: '14px', height: '14px' }}
                                    />
                                </div>
                            </div>

                            <div className={cx('package-item-list')}>
                                <div>
                                    <div className={cx('PackageItem')}>
                                        <div className={cx('item-icon')}>
                                            <img src={image} alt="Product" />
                                        </div>
                                        <div className={cx('item-info')}>
                                            <div className={cx('item-info__first-line')}>
                                                <span className={cx('item-info__product-name')} title={name}>
                                                    {name}
                                                </span>
                                            </div>
                                            <div className={cx('item-info__second-line')}>
                                                <div className={cx('item-info__qty')}>SL: x{quantity}</div>
                                                <div>
                                                    <div className={cx('item-info-price')}>
                                                        <span className={cx('item-info__original-price')}>
                                                            {Math.round(
                                                                (price / (1 - discount / 100)) * quantity,
                                                            ).toLocaleString()}
                                                            ₫
                                                        </span>
                                                        <span className={cx('item-info__price-sale')}>
                                                            {provisionalPrice.toLocaleString()}₫
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('right-content')}>
                            <div className={cx('Fulfillmentstyles', 'isrDZd')}>
                                <svg className={cx('fulfillment-icon')}>
                                    <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon>
                                </svg>

                                <p className={cx('fulfillment-text')}>
                                    Được giao bởi CMAI Smart Logistics (giao từ Hà Nội)
                                </p>
                                <p className={cx('fulfillment-text--warning')}></p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('seller-coupons-heading')}>
                        <div className={cx('sellerCouponsHeading')}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={cx('couponIcon')}
                            >
                                <g clipPath="url(#clip0_1392_114948)">
                                    <path
                                        d="M7.9165 9.16659C8.60686 9.16659 9.1665 8.60694 9.1665 7.91659C9.1665 7.22623 8.60686 6.66659 7.9165 6.66659C7.22615 6.66659 6.6665 7.22623 6.6665 7.91659C6.6665 8.60694 7.22615 9.16659 7.9165 9.16659Z"
                                        fill="#0A68FF"
                                    ></path>
                                    <path
                                        d="M13.3332 12.0833C13.3332 12.7736 12.7735 13.3333 12.0832 13.3333C11.3928 13.3333 10.8332 12.7736 10.8332 12.0833C10.8332 11.3929 11.3928 10.8333 12.0832 10.8333C12.7735 10.8333 13.3332 11.3929 13.3332 12.0833Z"
                                        fill="#0A68FF"
                                    ></path>
                                    <path
                                        d="M12.2558 8.92251C12.5812 8.59707 12.5812 8.06943 12.2558 7.744C11.9303 7.41856 11.4027 7.41856 11.0772 7.744L7.74392 11.0773C7.41848 11.4028 7.41848 11.9304 7.74392 12.2558C8.06935 12.5813 8.59699 12.5813 8.92243 12.2558L12.2558 8.92251Z"
                                        fill="#0A68FF"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.33317 3.33325C2.4127 3.33325 1.6665 4.07944 1.6665 4.99992V7.64295C1.6665 7.86396 1.7543 8.07592 1.91058 8.23221L2.49978 8.82141C3.15066 9.47228 3.15066 10.5276 2.49978 11.1784L1.91058 11.7676C1.7543 11.9239 1.6665 12.1359 1.6665 12.3569V14.9999C1.6665 15.9204 2.4127 16.6666 3.33317 16.6666L16.6665 16.6666C17.587 16.6666 18.3332 15.9204 18.3332 14.9999V12.3569C18.3332 12.127 18.2387 11.9125 18.0798 11.7584L17.4998 11.1784C16.8489 10.5276 16.8489 9.47228 17.4998 8.82141L18.0798 8.24143C18.2387 8.08737 18.3332 7.87288 18.3332 7.64295V4.99992C18.3332 4.07945 17.587 3.33325 16.6665 3.33325H3.33317ZM16.3213 12.3569L16.6665 12.7022V14.9999H3.33317V12.7021L3.6783 12.3569C4.98004 11.0552 4.98004 8.94464 3.6783 7.6429L3.33317 7.29777V4.99992L16.6665 4.99992V7.29766L16.3213 7.6429C15.0195 8.94464 15.0195 11.0552 16.3213 12.3569Z"
                                        fill="#0A68FF"
                                    ></path>
                                </g>
                            </svg>
                            <span className={cx('seller-coupons-heading__title')}>Mã giảm giá của người bán</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default SidebarPayInfor;
