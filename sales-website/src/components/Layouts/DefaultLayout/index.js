import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Layouts/components/Header';
import Sidebar from './Sidebar';
import Slidercomponent from '~/components/Slidercomponent';
import Button from '~/components/Button';
import Products from '~/components/Products';
import { useQuery } from '@tanstack/react-query';
import * as productService from '~/service/ProductService/index';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function removeVietnameseTones(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
}

function DefaultLayout() {
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const searchProduct = useSelector((state) => state.productSlide);
    console.log('searchProduct', searchProduct);

    // Sử dụng `useQuery` để lấy tất cả sản phẩm
    const { data: products } = useQuery(
        ['products', limit, page, searchProduct.search],
        () => productService.getAllProduct(searchProduct.search, limit, page),
        {
            retry: 3,
            retryDelay: 1000,
            keepPreviousData: true,
        },
    );
    console.log('products', products);

    useEffect(() => {
        if (searchProduct.search.trim() !== '') {
            // Nếu có từ khóa tìm kiếm, tải tất cả sản phẩm phù hợp
            productService.getAllProduct(searchProduct.search, 1000, 0).then((data) => {
                setAllProducts(data.data);
            });
        } else {
            // Nếu không có từ khóa tìm kiếm, sử dụng dữ liệu phân trang
            setAllProducts(products?.data || []);
        }
    }, [searchProduct.search, products]);

    // Lọc sản phẩm trên client-side
    const filteredProducts = allProducts.filter((product) => {
        if (typeof searchProduct.search === 'string' && searchProduct.search.trim() !== '') {
            const normalizedSearch = removeVietnameseTones(searchProduct.search.toLowerCase());
            const normalizedProductName = removeVietnameseTones(product.name.toLowerCase());
            return normalizedProductName.includes(normalizedSearch);
        }
        return true; // Nếu `searchProduct.search` không phải là chuỗi hoặc rỗng, không lọc
    });

    // Hàm xử lý khi nhấn nút "Xem Thêm"
    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleGoBack = () => {
        setPage(0);
    };

    // Kiểm tra xem có còn sản phẩm nào để tải thêm không
    const isLastPage = products?.pageCurrent >= products?.totalPage;

    return (
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar></Sidebar>
                </div>
                <div className={cx('content')}>
                    <Slidercomponent></Slidercomponent>
                    <div className={cx('Products')}>
                        <div className={cx('Products-items')}>
                            {filteredProducts?.map((product) => {
                                return (
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
                                    ></Products>
                                );
                            })}
                        </div>
                        {searchProduct.search.trim() === '' && (
                            <div className={cx('add-Btn')}>
                                {page === 0 ? null : ( // Hide "Go Back" on homepage
                                    <Button small onClick={handleGoBack}>
                                        Quay Lại
                                    </Button>
                                )}
                                {!isLastPage && (
                                    <Button small onClick={handleLoadMore}>
                                        Xem Thêm
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
