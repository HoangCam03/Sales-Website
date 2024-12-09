import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faFaceSmile,
    faHome,
    faMagnifyingGlass,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/logo.png';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Popover, Menu } from 'antd'; // Import Popover và Menu từ Ant Design
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, setSearchQuery } from '~/action/actions'; // Đảm bảo đường dẫn đúng
import { getAllType } from '~/service/ProductService/getAllType';

const cx = classNames.bind(styles);

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [productTypes, setProductTypes] = useState([]); // State để lưu trữ loại sản phẩm
    const user = useSelector((state) => state.userSlide); // Lấy thông tin người dùng từ Redux store

    const { name, isLoggedIn, isAdmin, _id } = user; // Lấy thông tin trực tiếp từ user
    console.log('user==>', user);

    console.log('User  Info in Header:', { name, isLoggedIn, isAdmin });

    // Hàm chuyển hướng tới trang đăng nhập
    const handleNav = () => {
        navigate('/sign-in');
    };
    const handleCartShopping = () => {
        navigate(`/shopping-cart/${_id}`);
    };

    // Hàm đăng xuất
    const handleLogout = () => {
        dispatch(logoutUser()); // Gửi hành động đăng xuất
        navigate('/'); // Điều hướng lại trang chủ
    };

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const response = await getAllType();
                if (response.status === 'OK' && Array.isArray(response.data)) {
                    setProductTypes(response.data); // Lưu trữ loại sản phẩm vào state
                } else {
                    console.error('API response is not as expected:', response);
                }
            } catch (error) {
                console.error('Error fetching product types:', error);
            }
        };

        fetchProductTypes();
    }, []);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === '') {
            dispatch(setSearchQuery(''));
        }
    };

    const onSearchClick = () => {
        dispatch(setSearchQuery(search));
        console.log('Search Query:', search);
    };

    const onClearSearch = () => {
        setSearch('');
        dispatch(setSearchQuery(''));
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(setSearchQuery(search));
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            if (search === '') {
                dispatch(setSearchQuery(''));
            }
        }
    };

    // Menu khi nhấn vào avatar hoặc tên người dùng
    const userMenuItems = [
        {
            key: 'profile',
            label: 'Xem thông tin',
            onClick: () => navigate('/profile-user'),
        },
        {
            key: 'order',
            label: 'Đơn Hàng',
            onClick: () => navigate(`/order/${_id}`),
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            onClick: handleLogout,
        },
        ...(isAdmin
            ? [
                  {
                      key: 'admin',
                      label:
                          location.pathname === '/admin' ? ( // Kiểm tra đường dẫn
                              <Link to="/" className={cx('admin-linkHome')}>
                                  Hỗ trợ
                              </Link>
                          ) : (
                              <Link to="/admin" className={cx('admin-link')}>
                                  Quản lý
                              </Link>
                          ),
                  },
              ]
            : []),
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-tiki')} src={images} alt="Tiki" />
                    <span className={cx('logo-slogan')}>Tốt & nhanh</span>
                </div>
                <div className={cx('container')}>
                    <div className={cx('search')}>
                        <input
                            placeholder="Search products"
                            spellCheck={false}
                            value={search}
                            onChange={onSearchChange}
                            onKeyDown={onKeyDown}
                        />
                        {search && (
                            <button className={cx('Clear')} onClick={onClearSearch}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        <button className={cx('btn-Search')} onClick={onSearchClick}>
                            <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div>
                        <ul className={cx('options-list')}>
                            {Array.isArray(productTypes) &&
                                productTypes.map((type, index) => (
                                    <li key={index}>
                                        <Link to={`/list-product?type=${type}`} className={cx('tag-a')}>
                                            {type}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className={cx('action')}>
                    {location.pathname !== '/admin' && (
                        <Button small home={<FontAwesomeIcon icon={faHome} />} onClick={() => navigate('/')}>
                            Trang chủ
                        </Button>
                    )}

                    {/* Hiển thị tên người dùng nếu đã đăng nhập */}
                    {isLoggedIn ? (
                        <Popover
                            content={<Menu items={userMenuItems} />}
                            trigger="hover" // Đổi từ hover sang click
                            placement="bottom"
                        >
                            <Button
                                small
                                home={<FontAwesomeIcon icon={faFaceSmile} />}
                                className={cx('fixed-button')} // Đảm bảo kích thước nút cố định
                            >
                                <span>Xin chào, {name}</span>
                            </Button>
                        </Popover>
                    ) : (
                        <Button small home={<FontAwesomeIcon icon={faFaceSmile} />} onClick={handleNav}>
                            Đăng Nhập
                        </Button>
                    )}

                    <Badge count={4}>
                        <Button small home={<FontAwesomeIcon icon={faCartShopping} />} onClick={handleCartShopping}>
                            Giỏ hàng
                        </Button>
                    </Badge>
                </div>
            </div>
        </header>
    );
}

export default Header;
