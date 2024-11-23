import React from 'react';
import { Menu } from 'antd';
import styles from './FnProductsTitle.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

// Kết nối styles với classNames
const cx = classNames.bind(styles);

// Cấu trúc items cho menu
const items = [
    {
        key: 'sub2',
        label: 'Products',
        icon: <FontAwesomeIcon icon={faUser} />,
    },
];

// Component FnProductsTitle
function FnProductsTitle() {
    return (
        <div className={cx('FnMenu')}>
            <Menu
                className={cx('selectedItem')} // Thêm lớp `selectedItem` vào đây
                defaultSelectedKeys={['sub2']}
                defaultOpenKeys={['sub2']}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default FnProductsTitle;
