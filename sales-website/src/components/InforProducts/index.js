import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './InforProducts.module.scss';
import classNames from 'classnames/bind';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const INFOR_ITEMS = [
    {
        title: 'Mười Hai Học Thuyết Cơ Bản Về Bản Tính Con Người',
        icon: <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>,
    },
];
function InforProduct() {
    return (
        <div>
            {INFOR_ITEMS.map((item, index) => (
                <div
                    key={index}
                    className={cx('infor')} // Áp dụng class hover và clicked
                >
                    <div className={cx('infor-title')}>{item.title}</div> {/* Render title */}
                    <div className={cx('infor-icons')}>{item.icon}</div>
                    {/* Render icon */}
                    {/* Kiểm tra xem item có children hay không */}
                    {/* {item.children && (
                        <ul>
                            {item.children.data.map((child, childIndex) => (
                                <li key={childIndex}>
                                    {child.title} ({child.code}) {/* Render children */}
                    {/* </li>
                            ))}
                        </ul>
                    )}* */}
                </div>
            ))}
        </div>
    );
}
export default InforProduct;
