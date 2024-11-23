import styles from './FnBar.module.scss';
import classNames from 'classnames/bind';

import FnBarTitle from './FnBarTitle';

const cx = classNames.bind(styles);

function FnBar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('title-Fnbar')}>
                <FnBarTitle></FnBarTitle>
            </div>
        </aside>
    );
}

export default FnBar;
