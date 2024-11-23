import React, { useRef, useState } from 'react';
import { Table, Drawer, Form, Input, message, Upload, Checkbox, Modal, Space, Button } from 'antd';
import styles from './FnUserContent.module.scss';
import classNames from 'classnames/bind';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getAllUser } from '~/service/UserService/getAllUser';
import { UpdateUser } from '~/service/UserService/UpdateUser';
import { InboxOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteUser } from '~/service/UserService/deleteUser';
import { deleteManyUser } from '~/service/UserService/deleteAllUser';

const cx = classNames.bind(styles);

function FnUserContent() {
    const [form] = Form.useForm();

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const [users, setUsers] = useState([]);

    const [rowSelected, setRowSelected] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [selectedRowKey, setSelectedRowKeys] = useState([]);

    const queryClient = useQueryClient();

    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: '',
    });

    useQuery(['users'], getAllUser, {
        onSuccess: (response) => {
            // Kiểm tra nếu response.data là một mảng
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        },
    });

    const handleUpdate = (record) => {
        setRowSelected(record);
        setIsDrawerOpen(true);

        if (record.image) {
            setFileList([
                {
                    uid: '-1',
                    name: 'current_image.png',
                    status: 'done',
                    url: record.image,
                },
            ]);
        } else {
            setFileList([]);
        }

        // Đảm bảo cập nhật giá trị vào form khi mở Drawer, bao gồm cả isAdmin
        form.setFieldsValue({
            ...record,
            isAdmin: record.isAdmin || false, // Đặt giá trị mặc định cho isAdmin
        });
    };

    // Cập nhật state và fileList khi upload ảnh mới
    const handleUploadChange = (info) => {
        const file = info.file;
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                setStateUser((prev) => ({ ...prev, image: base64Image })); // Cập nhật hình ảnh trong stateUser
            };
            reader.readAsDataURL(file);
        }
        setFileList(info.fileList);
    };

    const handleFinish = async (values) => {
        if (!rowSelected) {
            message.error('Không có dữ liệu người dùng để cập nhật.');
            return;
        }

        if (
            values.name !== rowSelected.name ||
            values.email !== rowSelected.email ||
            values.phone !== rowSelected.phone ||
            values.isAdmin !== rowSelected.isAdmin ||
            values.file !== rowSelected.file
        ) {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('phone', values.phone);
                formData.append('isAdmin', values.isAdmin ? 'true' : 'false'); // Thêm isAdmin vào formData

                // Nếu có file trong fileList, thêm file vào formData
                if (fileList.length > 0) {
                    formData.append('images', fileList[0].originFileObj);
                }

                await UpdateUser(rowSelected._id, formData);
                message.success('Cập nhật người dùng thành công!');
                queryClient.invalidateQueries(['users']); // Làm mới danh sách người dùng
                setIsDrawerOpen(false);
            } catch (error) {
                console.error('Lỗi khi cập nhật người dùng:', error);
                message.error('Cập nhật người dùng thất bại');
            }
        } else {
            message.info('Không có thay đổi nào được phát hiện.');
        }
    };
    ///Xoa user
    const handleDelete = (record) => {
        setRowSelected(record);
        setIsModalDeleteOpen(true);
    };

    const handleDeleteOk = async () => {
        console.log('Row selected:', rowSelected); // Debugging line
        try {
            await deleteUser(rowSelected._id); // Delete user
            console.log('id delete:', rowSelected._id);
            message.success('Sản phẩm đã được xóa thành công!');
            queryClient.invalidateQueries(['users']); // Refresh user list
            setIsModalDeleteOpen(false); // Close delete modal
        } catch (error) {
            message.error('Xóa sản phẩm thất bại!');
            setIsModalDeleteOpen(false); // Close delete modal
        }
    };

    const handleCancel = () => {
        setIsModalDeleteOpen(false);
        form.resetFields();
        setFileList([]);
    };

    ////

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        confirm(); // Xác nhận lại để cập nhật bảng
    };
    const handleDeleteAll = async () => {
        try {
            await deleteManyUser(selectedRowKey);
            message.success('Xóa thành công các người dùng đã chọn!');
            queryClient.invalidateQueries(['users']);
            setSelectedRowKeys([]);
        } catch (error) {
            message.error('Xóa thất bại!');
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => {
            if (searchedColumn === dataIndex && searchText) {
                const regex = new RegExp(`(${searchText})`, 'gi');
                const parts = text.toString().split(regex);
                return (
                    <span>
                        {parts.map((part, index) =>
                            part.toLowerCase() === searchText.toLowerCase() ? (
                                <span key={index} style={{ backgroundColor: '#ffc069', fontWeight: 'bold' }}>
                                    {part}
                                </span>
                            ) : (
                                part
                            ),
                        )}
                    </span>
                );
            }
            return text;
        },
    });

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const columns = [
        {
            title: 'Tên Người Dùng',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
            sorter: (a, b) => a.phone - b.phone,
        },
        {
            title: 'IsAdmin',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            align: 'center',
            render: (isAdmin) => (isAdmin ? 'Yes' : 'No'),
            sorter: (a, b) => a.isAdmin - b.isAdmin,
            filters: [
                {
                    text: 'Yes',
                    value: 'true',
                },
                {
                    text: 'No',
                    value: 'false',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'true') {
                    return record.isAdmin === true; // So sánh đúng kiểu dữ liệu (boolean)
                } else {
                    return record.isAdmin === false; // So sánh đúng kiểu dữ liệu (boolean)
                }
            },

            sortDirections: ['descend'],
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => handleUpdate(record)}>
                        Sửa
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record)}>
                        Xóa
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className={cx('content')}>
            <h2>Quản lý Người dùng</h2>
            <div className={cx('button-deleteAllUser')}>
                {selectedRowKey.length > 0 && <Button onClick={handleDeleteAll}> Xóa tất cả</Button>}
            </div>
            <Table columns={columns} dataSource={users} rowSelection={rowSelection} rowKey="_id" />
            <Drawer
                title="Cập Nhật thông tin người dùng"
                width={720}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="Nhập tên" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            {
                                pattern: /^[0-9]{1,11}$/,
                                message: 'Số điện thoại không hợp lệ!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    {/* Thêm checkbox cho isAdmin */}
                    <Form.Item name="isAdmin" valuePropName="checked">
                        <Checkbox>Quản trị viên</Checkbox>
                    </Form.Item>

                    <Form.Item label="Upload Ảnh" name="image">
                        <Upload.Dragger
                            name="image"
                            listType="picture"
                            maxCount={1}
                            accept=".jpeg,.jpg,.png"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={(file) => {
                                const isValidSize = file.size / 1024 / 1024 < 1;
                                if (!isValidSize) {
                                    message.error('Kích thước file vượt quá 1 MB!');
                                    return Upload.LIST_IGNORE;
                                }
                                return false; // Không tự động upload
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Chọn ảnh</p>
                            <p className="ant-upload-hint">Dung lượng tối đa 1 MB, định dạng JPEG hoặc PNG</p>
                        </Upload.Dragger>
                        {stateUser.image && (
                            <div className={cx('uploaded-image')}>
                                <img
                                    src={stateUser.image}
                                    alt="Uploaded"
                                    style={{
                                        width: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Modal title="Xóa sản phẩm" open={isModalDeleteOpen} onCancel={handleCancel} onOk={handleDeleteOk}>
                <div className={cx('modal-form')}>Bạn có chắc muốn xóa sản phẩm này không?</div>
            </Modal>
        </div>
    );
}

export default FnUserContent;
