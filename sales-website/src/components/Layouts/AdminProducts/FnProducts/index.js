import styles from './FnProducts.module.scss';
import classNames from 'classnames/bind';

import FnProductsTitle from '../FnProductsTitle';

const cx = classNames.bind(styles);

function FnProducts() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('title-FnProducts')}>
                <FnProductsTitle></FnProductsTitle>
            </div>
        </aside>
    );
}

export default FnProducts;
