import styles from './FnUser.module.scss';
import classNames from 'classnames/bind';

import FnUserTitle from '../FnUserTitle';

const cx = classNames.bind(styles);

function FnUser() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('title-FnUser')}>
                <FnUserTitle></FnUserTitle>
            </div>
        </aside>
    );
}

export default FnUser;
