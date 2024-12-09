import React from 'react';
import classNames from 'classnames/bind';
import styles from './FakeCheckBox.module.scss';

const cx = classNames.bind(styles);

function FakeCheckBox({ checked, onChange }) {
    return (
        <label className={cx('Checkbox', 'ioqOoJ')}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className={cx('checkbox-fake')}>
                <svg
                    className={cx('checkbox-mark')}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.0725 5.45132C22.6517 6.04365 22.641 6.99334 22.0487 7.57251L10.7987 18.5725C10.2157 19.1425 9.28427 19.1425 8.70132 18.5725L1.95132 11.9725C1.35899 11.3933 1.34832 10.4437 1.92749 9.85132C2.50666 9.25899 3.45635 9.24832 4.04868 9.82749L9.75 15.4021L19.9513 5.42749C20.5437 4.84832 21.4933 4.85899 22.0725 5.45132Z"
                            fill="#ffffff"
                        ></path>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="21" height="21" fill="white" transform="translate(1.5 1.5)"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </span>
        </label>
    );
}

export default FakeCheckBox;
