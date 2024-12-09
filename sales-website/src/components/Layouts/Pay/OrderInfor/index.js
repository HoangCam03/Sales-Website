import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderInfor.module.scss';
import Button from '~/components/Button'; // Giả sử bạn có component Button
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { PayPalButton } from 'react-paypal-button-v2';
import { updateOrderStatus } from '~/service/OrderService/updateOrderStatus';
import { Modal } from 'antd';

const cx = classNames.bind(styles);

function OrderInfor({
    userName,
    phone,
    address,
    totalPrice = 0, // Gán giá trị mặc định là 0
    discount = 0, // Gán giá trị mặc định là 0
    handlePayment,
    selectedPaymentMethod,
    isPaymentEnabled,
    sdkReady,
    order = {}, // Gán giá trị mặc định là một đối tượng rỗng
}) {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onSuccessPaypal = async (details, data) => {
        console.log('details, data:', details, data);

        try {
            const orderId = order._id; // Lấy order ID từ props
            const status = details.status; // Lấy trạng thái từ PayPal

            // Gọi API cập nhật trạng thái thanh toán
            const response = await updateOrderStatus(orderId, status);
            console.log('Order status updated successfully:', response);

            // Hiển thị thông báo thành công
            setIsModalVisible(true);
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Thanh toán thành công nhưng không thể cập nhật trạng thái đơn hàng.');
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/'); // Điều hướng người dùng đến trang order/:id
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('Section__Container')}>
                <div className={cx('block-header')}>
                    <h3 className={cx('block-header__title')}>Giao tới</h3>
                    <Link to="/profile-user" className={cx('block-header__nav')}>
                        Thay đổi
                    </Link>
                </div>
                <div className={cx('customer_info')}>
                    <p className={cx('customer_info__name')}>{userName}</p>
                    <i></i>
                    <p className={cx('customer_info__phone')}>{phone}</p>
                </div>
                <div className={cx('address')}>
                    <span className={cx('address__type--home')}>Nhà</span>
                    {address}
                </div>
            </div>
            <div className={cx('order-summary')}>
                <div className={cx('block-header')}>
                    <div className={cx('order')}>
                        <h3 className={cx('block-header__title')}>Đơn hàng</h3>
                        <div className={cx('block-header__sub-title')}>
                            <p className={cx('sub-title-text')}>
                                {order.orderItems && order.orderItems.amount ? order.orderItems.amount : '0'} sản phẩm.
                            </p>
                            <p className={cx('sub-title-link')}>
                                Xem thông tin
                                <svg
                                    className={cx('sub-title-link__arrow')}
                                    width="20"
                                    height="20"
                                    fontSize="5"
                                    viewBox="0 0 24 24"
                                >
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('order-information')}>
                    <div className={cx('list-container')}>
                        <div className={cx('summary-lable')}>Tổng Tiền Hàng</div>
                        <div className={cx('summary-value')}>{(totalPrice + discount).toLocaleString()}₫</div>
                    </div>
                    <div className={cx('list-container')}>
                        <div className={cx('summary-lable')}>Giảm giá trực tiếp</div>
                        <div className={cx('summary-value', 'text-green')}>-{discount.toLocaleString()}₫</div>
                    </div>

                    <div className={cx('grid')}></div>

                    <div className={cx('order-total')}>
                        <div className={cx('order-total__label')}>Tổng tiền thanh toán</div>
                        <div className={cx('order-total__value')}>
                            <div className={cx('order-total__total')}>{totalPrice.toLocaleString()}₫</div>
                            <div className={cx('order-total__saving')}>Tiết kiệm {discount.toLocaleString()}₫</div>
                        </div>
                    </div>
                    <div className={cx('Vat', 'bSkntM')}>
                        <div className={cx('order-total__additional-text')}>
                            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                        </div>
                    </div>
                    <div className={cx('buy')}>
                        {/* Hiển thị PayPal Button nếu chọn PayPal */}
                        {selectedPaymentMethod === 'paypal' && sdkReady === true ? (
                            <div className={cx('paypal-button-container')}>
                                <PayPalButton
                                    amount={totalPrice}
                                    onSuccess={onSuccessPaypal}
                                    onError={() => {
                                        alert('Error');
                                    }}
                                />
                            </div>
                        ) : (
                            <Button
                                large
                                onClick={handlePayment}
                                disabled={!isPaymentEnabled} // Nút sẽ bị vô hiệu hóa nếu chưa chọn phương thức thanh toán
                            >
                                Thanh Toán
                            </Button>
                        )}
                        {!isPaymentEnabled && (
                            <p style={{ color: 'red', marginTop: '8px' }}>Vui lòng chọn phương thức thanh toán!</p>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                title="Thanh toán thành công"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                okText="OK"
            >
                <p>Thanh toán của bạn đã thành công và trạng thái đơn hàng đã được cập nhật!</p>
            </Modal>
        </aside>
    );
}

export default OrderInfor;
