import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import Header from '../Layouts/components/Header';
import OrderHeader from './OrderHeader/OrderHeader';
import rose from '~/assets/images/rose.jpg';
import OrderContent from './OrderContent';

const cx = classNames.bind(styles);
function Order() {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('order-header')}>
                <OrderHeader></OrderHeader>
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}></div>
                <div className={cx('content')}>
                    <OrderContent></OrderContent>
                </div>
            </div>
        </div>
    );
}

export default Order;
