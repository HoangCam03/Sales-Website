import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import Header from '~/components/Layouts/components/Header';
import Button from '~/components/Button';
import avtfb from '~/assets/images/avtfb.png';
import avtgg from '~/assets/images/gg.png';
import { Form, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '~/service/UserService/LoginUser';
import { error, success } from '~/service/UserService/notificationService';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode'; // Sửa lại import jwtDecode
import { useDispatch } from 'react-redux'; // Import useDispatch
import { updateUser } from '~/action/actions'; // Import action updateUser
import { getDetailUser } from '~/service/UserService/getDetailUser';

const cx = classNames.bind(styles);

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Tạo dispatch để gọi Redux action

    const handleClose = () => {
        navigate('/'); // Điều hướng đến trang '/'
    };

    // Hàm lấy thông tin chi tiết người dùng từ API
    const handleGetDetailUser = async (_id, access_token) => {
        try {
            const res = await getDetailUser(_id);
            console.log('GetDetailUser response:', res);

            if (res.status === 'OK') {
                const { _id, name, email, isAdmin, phone, confirmPassword, address, avatar } = res.data;
                console.log('User details before dispatch:', {
                    _id,
                    name,
                    email,
                    isAdmin,
                    phone,
                    confirmPassword,
                    address,
                    avatar,
                });

                // Dispatch với đầy đủ thông tin
                dispatch(
                    updateUser(
                        _id,
                        name,
                        email,
                        access_token,
                        phone || '',
                        confirmPassword || '',
                        address || '',
                        avatar || '',
                        isAdmin,
                    ),
                );

                // Log state sau khi dispatch
                console.log('User details dispatched to Redux');
            }
        } catch (error) {
            console.error('Error in handleGetDetailUser:', error);
        }
    };
    const onFinish = (values) => {
        console.log('Form values: ', values);
        mutation.mutate(values);
    };
    const mutation = useMutation({
        mutationFn: (values) => loginUser(values),
        onSuccess: async (data) => {
            console.log('Login API Response:', data);

            if (data.status === 'OK') {
                success('Đăng nhập thành công!');

                const accessToken = data.access_token;

                // Lưu vào localStorage
                localStorage.setItem('access_token', accessToken);

                // Giải mã JWT
                const decoded = jwtDecode(accessToken);
                console.log('Decoded JWT:', decoded);

                // Lấy thông tin chi tiết người dùng nếu có _ID
                if (decoded?.id) {
                    await handleGetDetailUser(decoded.id, accessToken);
                }
                navigate('/');
            } else {
                error(data.message || 'Thông tin đăng nhập không đúng!');
            }
        },
        onError: (err) => {
            console.error('Login error:', err);
            error('Đăng nhập thất bại!');
        },
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('Modal-SignIn')}>
                <div className={cx('ReactModal-Content')}>
                    <div className={cx('Style-Content')}>
                        <Button className={cx('Close')}>
                            <img
                                className={cx('close-img')}
                                src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
                                alt="icon"
                                onClick={handleClose}
                            />
                        </Button>
                        <div className={cx('Styles-Left')}>
                            <div className={cx('Login')}>
                                <div className={cx('login-Header')}>
                                    <h4>Xin chào,</h4>
                                    <p>
                                        Đăng nhập hoặc <a href="./sign-up">tạo tài khoản</a>
                                    </p>
                                </div>

                                {/* Form đăng nhập */}
                                <Form onFinish={onFinish}>
                                    <div className={cx('input')}>
                                        {/* Input email */}
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập Email!' },
                                                { type: 'email', message: 'Email không hợp lệ!' },
                                            ]}
                                        >
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className={cx('input-email')}
                                            />
                                        </Form.Item>

                                        {/* Input password */}
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                        >
                                            <Input.Password
                                                placeholder="Mật khẩu"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={cx('input-password')}
                                            />
                                        </Form.Item>
                                    </div>

                                    {/* Nút submit */}
                                    <Form.Item>
                                        <Button large className={cx('style-btn')}>
                                            Đăng Nhập
                                        </Button>
                                    </Form.Item>
                                </Form>

                                <p className={cx('login-with-email')}>Đăng nhập bằng email</p>

                                <div className={cx('StyleSocial')}></div>
                                <p className={cx('social-heading')}>
                                    <span>Hoặc tiếp tục bằng</span>
                                </p>
                                <ul className={cx('social__items')}>
                                    <li className={cx('social__item')}>
                                        <img src={avtfb} alt="facebook" />
                                    </li>
                                    <li className={cx('social__item')}>
                                        <img className={cx('style-avtGG')} src={avtgg} alt="google" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('styles-Right')}>
                            <img
                                src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
                                className={cx('style-avt-login')}
                                alt="avtLogin"
                            />
                            <div className={cx('content')}>
                                <h4>Mua sắm tại Tiki</h4>
                                <span>Siêu ưu đãi mỗi ngày</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
