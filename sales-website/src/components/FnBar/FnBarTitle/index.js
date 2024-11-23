import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './FnBarTitle.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useLocation } from 'react-router';

// Kết nối styles với classNames
const cx = classNames.bind(styles);

// Cấu trúc items cho menu
const items = [
    {
        key: '/admin/user',
        label: 'User',
        icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
        key: '/admin/products',
        label: 'Products',
        icon: <AppstoreOutlined />,
    },
];

// Component FnBarTitle
function FnBarTitle() {
    const navigate = useNavigate();
    const location = useLocation();

    // Xử lý sự kiện click
    const handleClick = (e) => {
        navigate(e.key);
    };

    return (
        <div className={cx('FnMenu')}>
            <Menu
                onClick={handleClick}
                style={{ width: 256, textAlign: 'center' }}
                selectedKeys={[location.pathname]}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default FnBarTitle;
