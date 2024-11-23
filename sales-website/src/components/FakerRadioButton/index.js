import React from 'react';
import classNames from 'classnames/bind';
import styles from './FakerRadioButton.module.scss';

const cx = classNames.bind(styles);

function FakerRadioButton() {
    return (
        <div className={cx('method-list')}>
            {/* Method 1 */}
            <label className={cx('radio-button')}>
                <input type="radio" name="shipping-method" value="2" />
                <span className={cx('radio-fake')}></span>
            </label>
        </div>
    );
}

export default FakerRadioButton;
