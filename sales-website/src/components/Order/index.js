import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import Header from '../Layouts/components/Header';
import OrderHeader from './OrderHeader/OrderHeader';

import OrderContent from './OrderContent';
import { getOrders } from '~/service/OrderService/getOrders';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrders } from '~/action/actions';

const cx = classNames.bind(styles);

function Order() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders(id);
                if (ordersData && ordersData.data) {
                    dispatch(setOrders(ordersData.data)); // Lưu danh sách đơn hàng vào Redux
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchOrders();
    }, [id, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('order-header')}>
                <OrderHeader />
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}></div>
                <div className={cx('content')}>
                    <OrderContent /> {/* Không cần truyền danh sách đơn hàng xuống */}
                </div>
            </div>
        </div>
    );
}

export default Order;
