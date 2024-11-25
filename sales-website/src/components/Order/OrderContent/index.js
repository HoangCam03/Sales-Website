import React, { useState, useEffect } from 'react';
import styles from './OrderContent.module.scss';
import classNames from 'classnames/bind';
import { Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder, setOrders, updateOrderStatus } from '~/action/actions';
import { deleteOrder } from '~/service/OrderService/deleteOrder';
import { getOrders } from '~/service/OrderService/getOrders';

const cx = classNames.bind(styles);

function OrderContent() {
    const { id } = useParams();
    const [search, setSearch] = useState('');
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderReducer.orders);

    useEffect(() => {
        // Fetch orders from API or localStorage and dispatch setOrders action
        const fetchOrders = async () => {
            const fetchedOrders = await getOrders(id);
            if (fetchedOrders && fetchedOrders.data) {
                dispatch(setOrders(fetchedOrders.data));
            }
        };

        fetchOrders();
    }, [dispatch, id]);

    const onSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
    };

    const handlePayment = (order) => {
        dispatch(setOrder(order));
        navigate(`/pay/${id}`, { state: { order } });
    };

    // const onKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //     } else if (e.key === 'Delete' || e.key === 'Backspace') {
    //         if (search === '') {
    //         }
    //     }
    // };

    const handleCancel = () => {
        setIsModalDeleteOpen(false);
        setOrderToDelete(null);
    };

    const handleDeleteOk = async () => {
        if (orderToDelete) {
            try {
                await deleteOrder(orderToDelete._id);
                dispatch(updateOrderStatus(orderToDelete._id, 'Đã hủy'));
                setOrderToDelete(null);
                setIsModalDeleteOpen(false);
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    const showDeleteModal = (order) => {
        setOrderToDelete(order);
        setIsModalDeleteOpen(true);
    };

    const filteredOrders = orders.filter(
        (order) =>
            order._id.toLowerCase().includes(search) ||
            order.orderItems.some((item) => item.name.toLowerCase().includes(search)) ||
            (order.shippingAddress?.address || '').toLowerCase().includes(search),
    );

    const onClearSearch = () => {
        setSearch('');
    };

    return (
        <div className={cx('order-container')}>
            <div className={cx('tabs')}>
                <div className={cx('tab', 'active')}>Tất cả đơn</div>
            </div>
            <div className={cx('search-bar')}>
                <div className={cx('search-wrapper')}>
                    <input
                        type="text"
                        placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
                        className={cx('search-input')}
                        value={search}
                        onChange={onSearchChange}
                        onKeyDown={onKeyDown}
                    />
                    <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                    {search && (
                        <button className={cx('clear-btn')} onClick={onClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                </div>
            </div>

            <div className={cx('styled-order')}>
                {orders.length === 0 ? (
                    <div className={cx('no-orders')}>Bạn không có đơn hàng nào, hãy mua hàng ngay!</div>
                ) : filteredOrders.length === 0 ? (
                    <div className={cx('no-orders')}>Không có đơn hàng nào phù hợp.</div>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order._id} className={cx('order-item')}>
                            <div className={cx('left-and-status')}>
                                <span className={cx('status')}>
                                    {order.status === 'Đã hủy'
                                        ? 'Đã hủy'
                                        : order.paymentMethod === true
                                        ? 'Đang giao hàng...'
                                        : 'Chưa thanh toán'}
                                </span>
                                <div className={cx('left-order-items')}>
                                    <div className={cx('left-image')}>
                                        <img
                                            src={order.orderItems[0]?.image || ''}
                                            alt={order.orderItems[0]?.name || 'Sản phẩm'}
                                            className={cx('order-image')}
                                        />
                                        <span className={cx('order-quantity')}>
                                            x{order.orderItems[0].amount || 'Không xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('order-details')}>
                                        <div className={cx('order-title')}>
                                            {order.orderItems[0]?.name || 'Tên sản phẩm'}
                                        </div>
                                        <div className={cx('order-return')}>
                                            Địa chỉ giao hàng: {order.shippingAddress?.address || 'Không xác định'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('right-order-items')}>
                                <div className={cx('totalPrice')}>
                                    Tổng tiền: <strong>{order.totalPrice.toLocaleString() || '0'}₫</strong>
                                </div>
                                <div className={cx('actions')}>
                                    {order.paymentMethod === true ? (
                                        <Button className={cx('btn-success')} disabled>
                                            Đã Thanh Toán
                                        </Button>
                                    ) : (
                                        <Button className={cx('btn-buy')} onClick={() => handlePayment(order)}>
                                            Thanh Toán
                                        </Button>
                                    )}

                                    <Button
                                        className={cx('btn-cancel')}
                                        onClick={() => showDeleteModal(order)}
                                        disabled={order.status === 'Đã hủy'}
                                    >
                                        Hủy đơn hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal title="Xóa sản phẩm" open={isModalDeleteOpen} onCancel={handleCancel} onOk={handleDeleteOk}>
                <div className={cx('modal-form')}>Bạn có chắc muốn Hủy đơn này không?</div>
            </Modal>
        </div>
    );
}

export default OrderContent;
