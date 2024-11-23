import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Form, Input, Upload, message, Drawer, Space, InputNumber, Select } from 'antd';
import styles from './FnProductsContent.module.scss';
import classNames from 'classnames/bind';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '~/service/ProductService/createProduct';
import * as ProductService from '~/service/ProductService/index';
import { updateProduct } from '~/service/ProductService/updateProduct';
import ModalComponents from '~/components/ModalComponents';
import { deleteProduct } from '~/service/ProductService/deleteProduct';
import { SearchOutlined } from '@ant-design/icons';
import { deleteManyProduct } from '~/service/ProductService/deleteAllProduct';

const cx = classNames.bind(styles);

function FnProductsContent() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [rowSelected, setRowSelected] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedRowKey, setSelectedRowKeys] = useState([]);
    const [isNewType, setIsNewType] = useState(false);
    const [typeOptions, setTypeOptions] = useState(['Smart Phone', 'Computer', 'Camera', 'AirPods', 'Sách']);

    const searchInput = useRef(null);

    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        discount: '',
        rating: '',
        sold: '',
        description: '',
        image: '',
    });
    const queryClient = useQueryClient();

    // Fetch products from the API
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        return res.data; // Adjust this line to match the structure of your API response
    };

    // Use useQuery to fetch products
    useQuery(['products'], getAllProduct, {
        onSuccess: (data) => {
            setProducts(data); // Set the products from the API response
        },
    });

    const handleOk = () => {
        form.validateFields()
            .then(() => {
                form.submit();
                setIsModalOpen(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };
    const handleDeleteOk = async () => {
        console.log('Row selected:', rowSelected); // Debugging line
        try {
            await deleteProduct(rowSelected._id); // Delete product
            console.log('id delete:', rowSelected._id);
            message.success('Sản phẩm đã được xóa thành công!');
            queryClient.invalidateQueries(['products']); // Refresh product list
            setIsModalDeleteOpen(false); // Close delete modal
        } catch (error) {
            message.error('Xóa sản phẩm thất bại!');
            setIsModalDeleteOpen(false); // Close delete modal
        }
    };

    const handleDelete = (record) => {
        setRowSelected(record);
        setIsModalDeleteOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalDeleteOpen(false);
        form.resetFields();
        setFileList([]);
        setRowSelected(null);
    };

    useEffect(() => {
        if (rowSelected) {
            form.setFieldsValue(rowSelected); // Cập nhật form với dữ liệu sản phẩm đã chọn
        } else {
            form.resetFields(); // Xóa dữ liệu khi không có sản phẩm được chọn
        }
    }, [rowSelected, form]);
    // Khi nhấn nút tạo sản phẩm mới
    const OpenModalCreateProduct = () => {
        if (rowSelected) {
            setRowSelected(null); // Đặt lại rowSelected trước khi mở modal
            form.resetFields();
            setFileList([]);
            console.log('Đã chuyển sang chế độ tạo mới, rowSelected:', null);
        }
        setIsModalOpen(true); // Mở modal tạo mới
    };

    // Xác định khi nào cần gọi hàm tạo hoặc cập nhật sản phẩm
    const onFinish = (values) => {
        console.log('Trước khi gọi onFinish, rowSelected:', rowSelected);
        if (rowSelected) {
            handleUpdateProduct(values); // Cập nhật sản phẩm nếu có rowSelected
        } else {
            handleCreateProduct(values); // Tạo sản phẩm mới nếu rowSelected là null
        }
    };

    // Hàm xử lý khi nhấn nút tạo sản phẩm
    const handleCreateProduct = async (values) => {
        try {
            const newProduct = { ...values, image: stateProduct.image };
            await createProduct(newProduct); // Gọi API tạo sản phẩm mới
            message.success('Tạo mới sản phẩm thành công!');
            queryClient.invalidateQueries(['products']); // Làm mới danh sách sản phẩm
            setRowSelected(null);

            setIsModalOpen(false); // Đóng modal tạo mới
            form.resetFields(); // Xóa dữ liệu form
            setFileList([]); // Xóa danh sách file
        } catch (error) {
            console.error('Lỗi khi tạo sản phẩm:', error);
            message.error('Tạo sản phẩm thất bại!');
        }
    };

    // Hàm xử lý khi nhấn nút Cập nhật
    const handleUpdateProduct = async (values) => {
        if (!rowSelected || !rowSelected._id) {
            console.error('Không có productId để cập nhật!');
            return;
        }

        // Tạo FormData để gửi dữ liệu
        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));

        // Nếu có ảnh mới được tải lên, thêm ảnh vào FormData
        if (fileList.length > 0) {
            formData.append('images', fileList[0].originFileObj); // Thêm ảnh mới
        }

        try {
            await updateProduct(rowSelected._id, formData); // Gọi API cập nhật sản phẩm

            message.success('Cập nhật sản phẩm thành công!');
            queryClient.invalidateQueries(['products']);
            setIsDrawerOpen(false); // Đóng Drawer cập nhật
            setRowSelected(null); // Đặt lại rowSelected sau khi cập nhật
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            message.error('Cập nhật sản phẩm thất bại!');
        }
    };
    const beforeUpload = (file) => {
        const isValidSize = file.size >= 1024 && file.size / 1024 / 1024 <= 10; // Kiểm tra nếu tệp nằm trong khoảng 1KB đến 10MB
        if (!isValidSize) {
            message.error('File size must be between 1KB and 10MB!');
            return Upload.LIST_IGNORE;
        }
        return false; // Không tự động upload
    };
    // Update state when image is uploaded
    // Cập nhật state và fileList khi upload ảnh mới
    // Handle upload changes
    const handleUploadChange = (info) => {
        const file = info.file;
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setStateProduct((prev) => ({ ...prev, image: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
        setFileList(info.fileList);
    };

    // Cập nhật khi mở Drawer chỉnh sửa sản phẩm
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

        // Đảm bảo cập nhật giá trị vào form khi mở Drawer
        form.setFieldsValue(record);
    };

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

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
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

    const handleDeleteAll = async () => {
        try {
            await deleteManyProduct(selectedRowKey);
            message.success('Xóa thành công các người dùng đã chọn!');
            queryClient.invalidateQueries(['products']);
            setSelectedRowKeys([]);
        } catch (error) {
            message.error('Xóa thất bại!');
        }
    };

    useEffect(() => {
        // Thiết lập giá trị cho form
        form.setFieldsValue({
            name: products.name,
            type: products.type,
            countInStock: products.countInStock,
            price: products.price,
            discount: products.discount,
            rating: products.rating,
            sold: products.sold,
            description: products.description,
            image: products.image,
        });
    }, [products, form]);
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (text) => (text ? `${text.toLocaleString()} VND` : 'N/A'),
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            align: 'center',
            render: (text) => (text ? `${text}%` : 'N/A'),
            sorter: (a, b) => a.discount - b.discount,
        },
        {
            title: 'Count In Stock',
            dataIndex: 'countInStock',
            key: 'countInStock',
            align: 'center',
            sorter: (a, b) => a.countInStock - b.countInStock,
            filters: [
                {
                    text: '>= 5000',
                    value: '>=',
                },
                {
                    text: '<= 5000',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.countInStock >= 5000;
                } else return record.countInStock <= 5000;
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            align: 'center',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
            align: 'center',
            sorter: (a, b) => a.sold - b.sold,
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
            <h2>Quản lý sản phẩm</h2>
            <Button className={cx('add-product-btn')} onClick={OpenModalCreateProduct}>
                <PlusOutlined />
            </Button>
            <div className={cx('button-deleteAllUser')}>
                {selectedRowKey.length > 0 && <Button onClick={handleDeleteAll}> Xóa tất cả</Button>}
            </div>
            <ModalComponents title="Tạo Sản Phẩm" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                <div className={cx('modal-form')}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div className={cx('modal-content-form')}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your product name!' }]}
                                style={{ width: '100%' }}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[{ required: true, message: 'Please input your Type!' }]}
                                style={{ width: '100%' }}
                            >
                                {isNewType ? (
                                    <Input
                                        placeholder="Enter new type"
                                        onBlur={(e) => {
                                            const newType = e.target.value;
                                            if (newType) {
                                                setTypeOptions([...typeOptions, newType]);
                                                form.setFieldsValue({ type: newType });
                                            }
                                            setIsNewType(false);
                                        }}
                                    />
                                ) : (
                                    <Select
                                        placeholder="Select a type"
                                        onChange={(value) => {
                                            if (value === 'newType') {
                                                setIsNewType(true);
                                                form.setFieldsValue({ type: '' });
                                            } else {
                                                form.setFieldsValue({ type: value });
                                            }
                                        }}
                                    >
                                        {typeOptions.map((type) => (
                                            <Select.Option key={type} value={type}>
                                                {type}
                                            </Select.Option>
                                        ))}
                                        <Select.Option value="newType">New Type</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item
                                label="Count In Stock"
                                name="countInStock"
                                rules={[
                                    { required: true, message: 'Please input your Count In Stock!' },
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: 'Count In Stock must be a non-negative number!',
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    { required: true, message: 'Please input your Price!' },
                                    { type: 'number', min: 0, message: 'Price must be a non-negative number!' },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Discount (%)"
                                name="discount"
                                rules={[
                                    { required: true, message: 'Please input your Discount!' },
                                    {
                                        type: 'number',
                                        min: 0,
                                        max: 100,
                                        message: 'Discount must be between 0 and 100!',
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[
                                    { required: true, message: 'Please input your Rating!' },
                                    { type: 'number', min: 0, max: 5, message: 'Rating must be between 0 and 5!' },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Sold"
                                name="sold"
                                rules={[
                                    { required: true, message: 'Please input your sold!' },
                                    { type: 'number', min: 0, message: 'Sold must be a non-negative number!' },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input your Description!' }]}
                                style={{ width: '100%' }}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Upload Ảnh"
                                name="image"
                                rules={[{ required: true, message: 'Please upload an image!' }]}
                            >
                                <Upload.Dragger
                                    name="image"
                                    listType="picture"
                                    maxCount={1}
                                    accept=".jpeg,.jpg,.png"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={beforeUpload}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single upload. Strictly prohibit from uploading company data or
                                        other band files
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>

                            {stateProduct.image && (
                                <div className={cx('uploaded-image')}>
                                    <img
                                        src={stateProduct.image}
                                        alt="Uploaded"
                                        style={{
                                            width: '100%',
                                            maxHeight: '200px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </Form>
                </div>
            </ModalComponents>
            <Table columns={columns} dataSource={products} rowSelection={rowSelection} rowKey="_id" />
            <Drawer
                title="Cập Nhật Sản Phẩm"
                width={720}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Please input your product name!' }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your Type!' }]}
                        style={{ width: '100%' }}
                    >
                        {isNewType ? (
                            <Input
                                placeholder="Enter new type"
                                onBlur={(e) => {
                                    const newType = e.target.value;
                                    if (newType) {
                                        setTypeOptions([...typeOptions, newType]);
                                        form.setFieldsValue({ type: newType });
                                    }
                                    setIsNewType(false);
                                }}
                            />
                        ) : (
                            <Select
                                placeholder="Select a type"
                                onChange={(value) => {
                                    if (value === 'newType') {
                                        setIsNewType(true);
                                        form.setFieldsValue({ type: '' });
                                    } else {
                                        form.setFieldsValue({ type: value });
                                    }
                                }}
                            >
                                {typeOptions.map((type) => (
                                    <Select.Option key={type} value={type}>
                                        {type}
                                    </Select.Option>
                                ))}
                                <Select.Option value="newType">New Type</Select.Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Số lượng trong kho"
                        name="countInStock"
                        rules={[
                            { required: true, message: 'Please input your Count In Stock!' },
                            { type: 'number', min: 0, message: 'Count In Stock must be a non-negative number!' },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            { required: true, message: 'Please input your Price!' },
                            { type: 'number', min: 0, message: 'Price must be a non-negative number!' },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Giảm giá (%)"
                        name="discount"
                        rules={[
                            { required: true, message: 'Please input your Discount!' },
                            { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100!' },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Đánh giá"
                        name="rating"
                        rules={[
                            { required: true, message: 'Please input your Rating!' },
                            { type: 'number', min: 0, max: 5, message: 'Rating must be between 0 and 5!' },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng bán"
                        name="sold"
                        rules={[
                            { required: true, message: 'Please input your sold!' },
                            { type: 'number', min: 0, message: 'Sold must be a non-negative number!' },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Please input your Description!' }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Upload Ảnh"
                        name="image"
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload.Dragger
                            name="image"
                            listType="picture"
                            maxCount={1}
                            accept=".jpeg,.jpg,.png"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Select an Image</p>
                            <p className="ant-upload-hint">Max file size: 1 MB. Supported formats: JPEG, PNG</p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <ModalComponents
                title="Xóa sản phẩm"
                open={isModalDeleteOpen}
                onCancel={handleCancel}
                onOk={handleDeleteOk}
            >
                <div className={cx('modal-form')}>Bạn có chắc muốn xóa sản phẩm này không?</div>
            </ModalComponents>
        </div>
    );
}

export default FnProductsContent;
