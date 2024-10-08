import classNames from 'classnames/bind';
import styles from './ListProducts.module.scss';
import Header from '~/compoents/Layouts/compoents/Header';
import Sidebar from '~/compoents/Layouts/DefaultLayout/Sidebar';
import Products from '~/compoents/Products';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);
function ListProducts() {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar></Sidebar>
                </div>
                <div className={cx('content')}>
                    <div className={cx('Products')}>
                        <div className={cx('Products-items')}>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                        </div>
                        <div className={cx('Pagination')}>
                            <Pagination defaultCurrent={6} total={500} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProducts;
