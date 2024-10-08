import Menu from '~/compoents/Menu';
import styles from './sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('title-Sidebar')}>
                Danh mục
                <Menu></Menu>
            </div>
            <div className={cx('title-Sidebar')}>
                Tiện ích
                <Menu></Menu>
            </div>
        </aside>
    );
}

export default Sidebar;
