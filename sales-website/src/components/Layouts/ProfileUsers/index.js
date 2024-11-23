import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileUsers.module.scss';
import Header from '~/components/Layouts/components/Header';
import { Form, Input, Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailUser } from '~/service/UserService/getDetailUser';
import { UpdateUser } from '~/service/UserService/UpdateUser';
import { UpdateUserInfo } from '~/action/actions';

const cx = classNames.bind(styles);

function ProfileUsers() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSlide);
    console.log('User-->', user);
    const [file, setFile] = useState(null); // Quản lý file ảnh

    useEffect(() => {
        // Lấy thông tin người dùng khi có ID????
        if (user.id) {
            console.log('User ID:', user.id);
            getDetailUser(user.id).then((userData) => {
                dispatch(UpdateUserInfo(userData));
            });
        }
    }, [dispatch, user.id]);

    useEffect(() => {
        // Thiết lập giá trị cho form
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            confirmPassword: user.confirmPassword,
            address: user.address,
            avatar: user.avatar,
        });
    }, [user, form]);

    const handleUploadChange = (info) => {
        setFile(info.file.originFileObj);
    };

    const handleFinish = async (values) => {
        if (
            values.name !== user.name ||
            values.phone !== user.phone ||
            values.confirmPassword !== user.confirmPassword ||
            values.address !== user.address ||
            file
        ) {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('phone', values.phone);
                formData.append('confirmPassword', values.confirmPassword);
                formData.append('address', values.address);
                if (file) formData.append('avatar', file); // Thêm ảnh nếu có

                console.log('Updating user with ID:', user.id);
                console.log('Form data:', formData);

                // Gọi hàm cập nhật người dùng
                const updatedUser = await UpdateUser(user._id, formData);
                dispatch(UpdateUserInfo(updatedUser.user));

                message.success('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating user:', error);
                message.error('Failed to update profile');
            }
        } else {
            message.info('No changes detected.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('profile-container')}>
                <h2>Hồ Sơ Của Tôi</h2>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item label="Tên đăng nhập" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" name="confirmPassword">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Địa chỉ" name="address">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Upload Ảnh">
                        <Upload.Dragger
                            name="profile"
                            listType="picture"
                            maxCount={1}
                            accept=".jpeg,.jpg,.png"
                            onChange={handleUploadChange}
                            beforeUpload={(file) => {
                                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                if (!isJpgOrPng) {
                                    message.error('Bạn chỉ có thể tải lên các tệp JPG/PNG!');
                                    return Upload.LIST_IGNORE;
                                }
                                const isLt1M = file.size / 1024 / 1024 < 1;
                                if (!isLt1M) {
                                    message.error('Dung lượng ảnh phải nhỏ hơn 1MB!');
                                    return Upload.LIST_IGNORE;
                                }
                                return true;
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Chọn Ảnh</p>
                            <p className="ant-upload-hint">Dung lượng file tối đa 1 MB. Định dạng: JPEG, PNG</p>
                        </Upload.Dragger>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default ProfileUsers;
