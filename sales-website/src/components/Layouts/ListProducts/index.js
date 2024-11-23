import classNames from 'classnames/bind';
import styles from './ListProducts.module.scss';
import Header from '~/components/Layouts/components/Header';
import Sidebar from '~/components/Layouts/DefaultLayout/Sidebar';
import Products from '~/components/Products';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import * as productService from '~/service/ProductService/getProductsByType';
import { useLocation } from 'react-router';

const cx = classNames.bind(styles);

function removeVietnameseTones(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
}

function ListProducts() {
    const [limit, setLimit] = useState(8); // Số sản phẩm trên mỗi trang
    const [page, setPage] = useState(1); // Bắt đầu từ trang đầu tiên
    const location = useLocation();
    const [allProducts, setAllProducts] = useState([]);
    const searchProduct = useSelector((state) => state.productSlide);

    // Lấy type từ URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || '';

    // Fetch dữ liệu sản phẩm với pagination
    const { data: products } = useQuery(
        ['products', limit, page, searchProduct.search, type],
        () => productService.getProductsByType(type, searchProduct.search, limit, page - 1),
        {
            retry: 3,
            retryDelay: 1000,
            keepPreviousData: true,
        },
    );

    useEffect(() => {
        if (searchProduct.search.trim() !== '' || type.trim() !== '') {
            productService.getProductsByType(type, searchProduct.search, 1000, 0).then((data) => {
                setAllProducts(data.data);
            });
        } else {
            setAllProducts(products?.data || []);
        }
    }, [searchProduct.search, type, products]);

    const filteredProducts = allProducts.filter((product) => {
        if (typeof searchProduct.search === 'string' && searchProduct.search.trim() !== '') {
            const normalizedSearch = removeVietnameseTones(searchProduct.search.toLowerCase());
            const normalizedProductName = removeVietnameseTones(product.name.toLowerCase());
            return normalizedProductName.includes(normalizedSearch);
        }
        return true;
    });

    const handlePageChange = (page, pageSize) => {
        setPage(page);
        setLimit(pageSize);
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>
                    <div className={cx('Products')}>
                        <div className={cx('Products-items')}>
                            {filteredProducts.map((product) => (
                                <Products
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    image={product.image}
                                    name={product.name}
                                    rating={product.rating}
                                    price={product.price}
                                    sold={product.sold}
                                    discount={product.discount}
                                    description={product.description}
                                    type={product.type}
                                    id={product._id}
                                />
                            ))}
                        </div>
                        <div className={cx('Pagination')}>
                            <div className={cx('Pagination')}>
                                <Pagination
                                    current={page}
                                    pageSize={limit}
                                    total={products?.totalCount || 0}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProducts;
