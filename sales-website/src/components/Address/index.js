import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Address.module.scss';

const cx = classNames.bind(styles);
function Address(props) {
    const { userName, address, phone } = props;
    return (
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
    );
}

export default Address;
