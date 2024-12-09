import React from 'react';
import classNames from 'classnames/bind';
import styles from './CartShoppingInfor.module.scss';
import Button from '~/components/Button'; // Giả sử bạn có component Button

const cx = classNames.bind(styles);

function CartShoppingInfor(props) {
    const { itemsPrice = 0, shippingPrice = 0, totalPriceOrder = 0, handlePaymentPage } = props;
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('order-summary')}>
                <div className={cx('block-header')}>
                    <div className={cx('order')}>
                        <h3 className={cx('block-header__title')}>Đơn hàng</h3>
                        <div className={cx('block-header__sub-title')}>
                            <p className={cx('sub-title-text')}>
                                {/* {order.orderItems && order.orderItems.amount ? order.orderItems.amount : '0'} sản phẩm. */}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('order-information')}>
                    <div className={cx('list-container')}>
                        <div className={cx('summary-lable')}>Tổng Tiền Hàng</div>
                        <div className={cx('summary-value')}>{itemsPrice.toLocaleString()}₫</div>
                    </div>
                    <div className={cx('list-container')}>
                        <div className={cx('summary-lable')}>Phí vận chuyển</div>
                        <div className={cx('summary-value')}>{shippingPrice.toLocaleString()}₫</div>
                    </div>
                    <div className={cx('list-container')}>
                        <div className={cx('summary-lable')}>Giảm giá trực tiếp</div>
                        {/* <div className={cx('summary-value', 'text-green')}>-{discount.toLocaleString()}₫</div> */}
                    </div>

                    <div className={cx('grid')}></div>
                    <div className={cx('order-total')}>
                        <div className={cx('order-total__label')}>Tổng tiền thanh toán</div>
                        <div className={cx('order-total__value')}>
                            <div className={cx('order-total__total')}>{totalPriceOrder.toLocaleString()}₫</div>
                            {/* <div className={cx('order-total__saving')}>Tiết kiệm {discount.toLocaleString()}₫</div> */}
                        </div>
                    </div>
                    <div className={cx('Vat', 'bSkntM')}>
                        <div className={cx('order-total__additional-text')}>
                            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                        </div>
                    </div>
                    <div className={cx('buy')}>
                        <Button large onClick={handlePaymentPage}>
                            Mua Hàng
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default CartShoppingInfor;
