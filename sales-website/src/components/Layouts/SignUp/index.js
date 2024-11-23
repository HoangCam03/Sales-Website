import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import Header from '~/components/Layouts/components/Header';
import Button from '~/components/Button';
import avtfb from '~/assets/images/avtfb.png';
import avtgg from '~/assets/images/gg.png';
import { useMutation } from '@tanstack/react-query';
import { Form, Input } from 'antd'; // Import các component từ Ant Design
import { SignUpUser } from '~/service/UserService/SignUpUser';
import { error, success } from '~/service/UserService/notificationService';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/'); // Điều hướng đến trang '/'
    };

    const onFinish = (values) => {
        console.log('Form values: ', values);
        mutation.mutate(values); // Xử lý dữ liệu form
    };

    const mutation = useMutation({
        mutationFn: (values) => SignUpUser(values),
        onSuccess: (data) => {
            console.log('API Response:', data); // Kiểm tra phản hồi từ API

            // Kiểm tra xem status có phải là 'OK' hay không
            if (data.status === 'Ok') {
                success('Đăng ký thành công!');
                // Hiển thị thông báo thành công
                navigate('/sign-in'); // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
            } else {
                // Nếu không thành công, hiển thị thông báo lỗi
                error(data.message || 'Thông tin đăng ký không đúng!'); // Thông báo từ API hoặc mặc định
            }
        },
        onError: (err) => {
            console.error(err); // Ghi lại lỗi
            error('Đăng ký thất bại!'); // Hiển thị thông báo lỗi nếu có lỗi xảy ra
        },
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('Modal-up')}>
                <div className={cx('ReactModal-Content')}>
                    <div className={cx('Style-Content')}>
                        <Button className={cx('Close')}>
                            <img
                                className={cx('close-img')}
                                src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
                                alt="icon"
                                onClick={handleClose} // Thêm sự kiện onClick vào nút X để điều hướng trang
                            />
                        </Button>
                        <div className={cx('Styles-Left')}>
                            <div className={cx('SignUp')}>
                                <div className={cx('SignUp-Header')}>
                                    <h4>Xin chào,</h4>
                                    <p>
                                        <a href="./sign-in">Bạn muốn đăng nhập?</a>
                                    </p>
                                </div>
                                {/* Form đăng ký */}
                                <Form onFinish={onFinish}>
                                    <div className={cx('input')}>
                                        {/* Input name */}
                                        <Form.Item
                                            name="name"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                        >
                                            <Input
                                                type="text"
                                                placeholder="Tên"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={cx('input-name')}
                                            />
                                        </Form.Item>
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

                                        {/* Input confirm password */}
                                        <Form.Item
                                            name="confirmPassword"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject('Mật khẩu không khớp!');
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder="Xác nhận mật khẩu"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className={cx('input-password')}
                                            />
                                        </Form.Item>
                                    </div>

                                    {/* Nút submit */}
                                    <Form.Item>
                                        <Button large className={cx('style-btn')}>
                                            Đăng Ký
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <p className={cx('SignUp-with-email')}>Đăng ký bằng email</p>
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
                                className={cx('style-avt-SignUp')}
                                alt="avtSignUp"
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

export default SignUp;
