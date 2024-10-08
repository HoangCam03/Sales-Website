import image1 from '~/assets/images/book.png';
import image2 from '~/assets/images/phone.png';
import image3 from '~/assets/images/pc.png';

import styles from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <img src={image1} alt="Hình ảnh sách" />,
        title: 'Nhà Sách',
    },
    {
        icon: <img src={image2} alt="Hình ảnh điện thoại" />,
        title: 'Điện Thoại - Máy Tính Bảng ',
        to: '/feedback',
    },
    {
        icon: <img src={image3} alt="Hình ảnh máy tính " />,
        title: 'Máy Tính',
    },
];
function Menu() {
    return (
        <div>
            {MENU_ITEMS.map((item, index) => (
                <div
                    key={index}
                    className={cx('Menu')} // Áp dụng class hover và clicked
                >
                    <div className={cx('Menu-icons')}>{item.icon}</div> {/* Render icon */}
                    <div className={cx('Menu-title')}>{item.title}</div> {/* Render title */}
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
console.log(MENU_ITEMS);
export default Menu;
