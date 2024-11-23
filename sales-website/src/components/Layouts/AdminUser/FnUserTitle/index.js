import React from 'react';
import { Menu } from 'antd';
import styles from './FnUserTitle.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

// Kết nối styles với classNames
const cx = classNames.bind(styles);

// Cấu trúc items cho menu
const items = [
    {
        key: 'sub1',
        label: 'User',
        icon: <FontAwesomeIcon icon={faUser} />,
    },
];

// Component FnUserTitle
function FnUserTitle() {
    return (
        <div className={cx('FnMenu')}>
            <Menu
                className={cx('selectedItem')} // Thêm lớp `selectedItem` vào đây
                defaultSelectedKeys={['sub1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default FnUserTitle;
