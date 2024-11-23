import React from 'react';

import styles from './OrderContent.module.scss';
import classNames from 'classnames/bind';

// Kết nối styles với classNames
const cx = classNames.bind(styles);

// Component OrderContent
function OrderContent() {
    const orders = [
        {
            id: 1,
            title: 'Payback Time - Ngày Đòi Nợ',
            seller: 'HappyLive',
            price: '299.000 đ',
            returnPolicy: '30 NGÀY ĐỔI TRẢ',
            image: 'https://via.placeholder.com/60x80',
        },
        {
            id: 2,
            title: 'Atomic Habits - Thói Quen Nguyên Tử',
            seller: 'NXB Trẻ',
            price: '259.000 đ',
            returnPolicy: '30 NGÀY ĐỔI TRẢ',
            image: 'https://via.placeholder.com/60x80',
        },
    ];
    return (
        <div className={cx('order-container')}>
            <div className={cx('tabs')}>
                <div className={cx('tab', 'active')}>Tất cả đơn</div>
                {/* <div className={cx('tab')}>Chờ thanh toán</div>
                <div className={cx('tab')}>Đang xử lý</div>
                <div className={cx('tab')}>Đang vận chuyển</div>
                <div className={cx('tab')}>Đã giao</div>
                <div className={cx('tab')}>Đã hủy</div> */}
            </div>
            <div className={cx('search-bar')}>
                <input
                    type="text"
                    placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
                    className={cx('search-input')}
                />
            </div>
            <div className={cx('orders')}>
                {orders.map((order) => (
                    <div key={order.id} className={cx('order-item')}>
                        <div className={cx('order-info')}>
                            <img src={order.image} alt={order.title} className={cx('order-image')} />
                            <div className={cx('order-details')}>
                                <div className={cx('order-title')}>{order.title}</div>
                                <div className={cx('order-seller')}>{order.seller}</div>
                                <div className={cx('order-return')}>{order.returnPolicy}</div>
                            </div>
                        </div>
                        <div className={cx('order-actions')}>
                            <div>
                                Tổng tiền: <strong>{order.price}</strong>
                            </div>
                            <button className={cx('btn-buy')}>Mua lại</button>
                            <button className={cx('btn-details')}>Xem chi tiết</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderContent;
