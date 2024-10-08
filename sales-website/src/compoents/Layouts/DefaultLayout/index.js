import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/compoents/Layouts/compoents/Header';
import Sidebar from './Sidebar';
import Slidercompoent from '~/compoents/Slidercompoent';
import Products from '~/compoents/Products';
import Button from '~/compoents/Button';

const cx = classNames.bind(styles);

function DefaultLayout() {
    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar></Sidebar>
                </div>
                <div className={cx('content')}>
                    <Slidercompoent></Slidercompoent>
                    <div className={cx('Products')}>
                        <div className={cx('Products-items')}>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                            <Products></Products>
                        </div>
                        <div className={cx('add-Btn')}>
                            <Button small>Xem Thêm</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
