import classNames from 'classnames/bind';
import styles from './AddressUser.module.scss';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

function AddressUser(props) {
    const { address } = props;
    const navigate = useNavigate();
    const handleChangeAddress = () => {
        navigate('/profile-user');
    };

    return (
        <div className={cx('content')}>
            <div className={cx('title-Product')}>Thông tin vận chuyển</div>
            <div className={cx('product-delivery-address')}>
                <div className={cx('font-product-delivery-address')}>Giao đến {address}</div>
                <span className={cx('span-change-product-delivery-address')} onClick={handleChangeAddress}>
                    Đổi
                </span>
            </div>
        </div>
    );
}

export default AddressUser;
