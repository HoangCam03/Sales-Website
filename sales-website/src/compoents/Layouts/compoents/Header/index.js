import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleXmark,
    faFaceSmile,
    faHome,
    faMagnifyingGlass,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/logo.png';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '~/compoents/Button';
import { Badge } from 'antd';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-tiki')} src={images} alt="Tiki" />
                    <span className={cx('logo-slogan')}>Tốt & nhanh</span>
                </div>
                <div className={cx('container')}>
                    <div className={cx('search')}>
                        <input placeholder="Search products" spellCheck={false} />
                        <button className={cx('Clear')}>
                            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                        </button>

                        <FontAwesomeIcon icon={faSpinner} className={cx('Loading')}></FontAwesomeIcon>

                        <button className={cx('btn-Search')}>
                            <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div>
                        <ul className={cx('options-list')}>
                            <li>
                                <a href="/" className={cx('tag-a')}>
                                    Phone
                                </a>
                            </li>
                            <li>
                                <a href="/">Laptop</a>
                            </li>
                            <li>
                                <a href="/">Airpod</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('action')}>
                    <Button small home={<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>}>
                        Trang chủ
                    </Button>
                    <Button small home={<FontAwesomeIcon icon={faFaceSmile}></FontAwesomeIcon>}>
                        Tài Khoản
                    </Button>
                    <Badge count={4}>
                        <Button small home={<FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>}>
                            Giỏ hàng
                        </Button>
                    </Badge>
                </div>
            </div>
        </header>
    );
}

export default Header;
