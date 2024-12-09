import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ShippingPlan.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShippingPlan(props) {
    const { name, quantity, image, price, discount, totalPrice, onShippingChange, setSelectedShippingMethod } = props;

    const [selectedMethod, setSelectedMethod] = useState(null); // Khởi tạo với giá trị null
    const [shippingFee, setShippingFee] = useState(0);
    const [deliveryTime, setDeliveryTime] = useState('');

    const location = useLocation(); // Lấy đường dẫn hiện tại

    const calculateDeliveryTime = (hours) => {
        const now = new Date();
        const delivery = new Date(now.getTime() + hours * 60 * 60 * 1000);

        const hoursText = delivery.getHours();
        const minutesText = delivery.getMinutes().toString().padStart(2, '0');
        const isToday = now.getDate() === delivery.getDate();
        const timeText = isToday
            ? `trước ${hoursText}:${minutesText} hôm nay`
            : `lúc ${hoursText}:${minutesText} ngày ${delivery.getDate()}/${delivery.getMonth() + 1}`;

        setDeliveryTime(`Giao siêu tốc 2h ${timeText}`);
    };

    const handleSelectMethod = (method) => {
        setSelectedShippingMethod(method); // Cập nhật state với phương thức thanh toán được chọn
    };

    const handleChange = (event) => {
        const method = event.target.value;
        setSelectedMethod(method);

        // Tính phí giao hàng dựa trên phương thức
        let fee = 0;
        if (method === '1') {
            fee = 10000; // Ví dụ: Giao siêu tốc 2h
            calculateDeliveryTime(2); // Call the function to calculate delivery time
        } else if (method === '2') {
            fee = 5000; // Ví dụ: Giao tiết kiệm
        }
        setShippingFee(fee);

        // Gửi phí giao hàng lên component cha
        onShippingChange(fee);
    };

    useEffect(() => {
        // Gửi phí giao hàng ban đầu lên cha khi component được render
        if (selectedMethod !== null) {
            onShippingChange(shippingFee);
        }
    }, [shippingFee, onShippingChange, selectedMethod]);

    const isProductDetailsPage = location.pathname.includes('product-details'); // Kiểm tra đường dẫn hiện tại

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
                                value="1"
                                checked={selectedMethod === '1'}
                                onChange={handleChange}
                                onClick={() => handleSelectMethod('1')}
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
                                    <span className={cx('freeship-badge')}>(-15K)</span>
                                </div>
                            </span>
                        </label>

                        {/* Method 2 */}
                        <label className={cx('radio-button')}>
                            <input
                                type="radio"
                                name="shipping-method-infor"
                                value="2"
                                checked={selectedMethod === '2'}
                                onClick={() => handleSelectMethod('2')}
                                onChange={handleChange}
                            />
                            <span className={cx('radio-fake')}></span>
                            <span className={cx('label')}>
                                <div className={cx('delivery-method')}>
                                    <span className={cx('method-text')}>Giao tiết kiệm</span>
                                    <span className={cx('freeship-badge')}>(-5K)</span>
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
                {isProductDetailsPage && (
                    <div className={cx('shipping-details')}>
                        <div className={cx('shipping-package')}>
                            <div className={cx('package-title')}>
                                <img
                                    width="24"
                                    height="24"
                                    alt="icon"
                                    src="https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png"
                                />
                                Gói:
                                {selectedMethod === '1' ? deliveryTime : 'Giao tiết kiệm, nhận hàng sau 3-5 ngày'}
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
                                            {selectedMethod === '1' ? 'Giao siêu tốc 2h' : 'Giao tiết kiệm'}
                                        </span>
                                    </div>
                                    <div className={cx('ShippingFeeShippingFee', 'XUTGR')}>
                                        <span className={cx('original-fee')}>
                                            {selectedMethod === '1' ? '25000 ₫' : '10000 ₫'}
                                        </span>
                                        <span className={cx('current-fee')}>
                                            {shippingFee ? shippingFee.toLocaleString() : '0'} ₫
                                        </span>
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
                                                                {price && discount
                                                                    ? Math.round(
                                                                          (price / (1 - discount / 100)) * quantity,
                                                                      ).toLocaleString()
                                                                    : '0'}
                                                                ₫
                                                            </span>
                                                            <span className={cx('item-info__price-sale')}>
                                                                {totalPrice ? totalPrice.toLocaleString() : '0'}₫
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
                                <svg className={cx('couponIcon')}>
                                    <FontAwesomeIcon icon={faTicket}> </FontAwesomeIcon>
                                </svg>
                                <span className={cx('seller-coupons-heading__title')}>Mã giảm giá của người bán</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default ShippingPlan;
