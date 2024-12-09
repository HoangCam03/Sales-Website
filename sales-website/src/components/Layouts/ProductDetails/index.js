import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import Header from '~/components/Layouts/components/Header';
import logoOffice from '~/assets/images/logoOffice.png';
import logoTiki from '~/assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Image, InputNumber, message } from 'antd';
import Button from '~/components/Button';
import { useNavigate, useParams } from 'react-router';
import { getDetailProduct } from '~/service/ProductService/getDetailProduct';
import ContentDetailProduct from './ContentDetailProduct';
import AddressUser from './AddressUser';
import { useSelector } from 'react-redux';
import ShippingPlan from '~/components/ShippingPlan';
import { createOrder } from '~/service/OrderService/createOrder';
import Comment from '~/components/Comment';
import { addCartShopping } from '~/service/CartShoppingService/AddCartShopping';

const cx = classNames.bind(styles);

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [shippingFee, setShippingFee] = useState(0);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const user = useSelector((state) => state.userSlide);
    const { address, phone, name: userName, email, _id: userId } = user;

    useEffect(() => {
        // if (!isLoggedIn) {
        //     navigate('/sign-in');
        //     return;
        // }

        const fetchProductDetails = async () => {
            try {
                const productData = await getDetailProduct(id);
                if (productData && productData.data) {
                    setProduct(productData);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        // Kiểm tra trạng thái đơn hàng khi người dùng truy cập lại trang đặt hàng
        const isOrderConfirmed = sessionStorage.getItem('isOrderConfirmed');
        if (isOrderConfirmed) {
            navigate('/');
        } else {
            fetchProductDetails();
        }

        // Xóa trạng thái đơn hàng khi người dùng rời khỏi trang đặt hàng
        return () => {
            sessionStorage.removeItem('isOrderConfirmed');
        };
    }, [id, navigate]);

    // Khởi tạo Facebook SDK
    useEffect(() => {
        const initFacebookSDK = () => {
            if (window.FB) {
                window.FB.XFBML.parse();
            } else {
                window.fbAsyncInit = function () {
                    window.FB.init({
                        appId: '1678712749526266',
                        autoLogAppEvents: true,
                        xfbml: true,
                        version: 'v21.0',
                    });
                    window.FB.XFBML.parse();
                };

                (function (d, s, id) {
                    let js,
                        fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = 'https://connect.facebook.net/vi_VN/sdk.js';
                    fjs.parentNode.insertBefore(js, fjs);
                })(document, 'script', 'facebook-jssdk');
            }
        };

        initFacebookSDK();
    }, []);

    const handleQuantityChange = (value) => {
        setQuantity(value);
    };

    const handleComeBackHome = () => {
        navigate('/');
    };

    const handlePaymentPage = async () => {
        setIsLoading(true);
        const orderData = {
            orderItems: [
                {
                    name: name,
                    amount: quantity,
                    image: image,
                    price: price,
                    product: id,
                },
            ],
            shippingAddress: {
                name: userName,
                address: address,
                phone: phone,
                email: email,
            },

            itemsPrice: provisionalPrice,
            shippingPrice: shippingFee,
            totalPrice: totalPrice,
        };

        try {
            const response = await createOrder(orderData);
            console.log('Order created successfully:', response);
            message.success('Order created successfully!');
            // Lưu trạng thái đơn hàng vào sessionStorage
            sessionStorage.setItem('isOrderConfirmed', 'true');
            navigate(`/pay/${id}`, { state: { quantity, totalPrice } });
        } catch (error) {
            console.error('Order creation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCartShopping = async () => {
        setIsLoading(true);
        const cartShoppingData = {
            CartShoppingItems: [
                {
                    name: name,
                    amount: quantity,
                    image: image,
                    price: price,
                    product: id,
                },
            ],
            shippingAddress: {
                name: userName,
                address: address,
                phone: phone,
                email: email,
            },

            itemsPrice: provisionalPrice,
            shippingPrice: shippingFee,
            totalPrice: totalPrice,
        };

        try {
            const response = await addCartShopping(cartShoppingData);
            console.log('Order Added successfully:', response);
            message.success('Order Added successfully!');
            // Lưu trạng thái đơn hàng vào sessionStorage
            sessionStorage.setItem('isOrderConfirmed', 'true');
            navigate(`/shopping-cart/${userId}`, {
                state: { quantity, totalPrice, discount, price, image },
            });
        } catch (error) {
            console.error('Add Order in CartShopping failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShippingChange = (fee) => {
        setShippingFee(fee);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const { name, image, rating, sold, price, countInStock, discount, description } = product.data;
    const images = Array.isArray(image) ? image : [image];
    const provisionalPrice = price * quantity;
    const totalPrice = provisionalPrice + shippingFee;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('body')}>
                <div className={cx('wrapper-Header-Body')}>
                    <div className={cx('header-Body')} onClick={handleComeBackHome}>
                        Trang chủ
                    </div>
                </div>
                <div className={cx('main')}>
                    <div className={cx('main-Styled')}>
                        <div className={cx('wrapper-img')}>
                            <Image.PreviewGroup>
                                {images.map((imgSrc, index) => (
                                    <Image
                                        key={index}
                                        width={300}
                                        className={cx('img-Styled')}
                                        src={imgSrc}
                                        alt={`Product image ${index + 1}`}
                                    />
                                ))}
                            </Image.PreviewGroup>
                        </div>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('contentDetailProduct')}>
                            <ContentDetailProduct
                                name={name}
                                rating={rating}
                                countInStock={countInStock}
                                price={price}
                                sold={sold}
                                discount={discount}
                                description={description}
                            />
                        </div>
                        <div className={cx('AddressUser ')}>
                            <AddressUser address={address} />
                        </div>
                        <div className={cx('shipping-plan')}>
                            <ShippingPlan
                                name={name}
                                quantity={quantity}
                                image={images[0]}
                                price={price}
                                discount={discount}
                                totalPrice={totalPrice}
                                setSelectedShippingMethod={setSelectedShippingMethod}
                                onShippingChange={handleShippingChange}
                            />
                        </div>
                        <div className={cx('comment')}>
                            <Comment dataHref="https://developers.facebook.com/docs/plugins/comments#configurator"></Comment>
                        </div>
                    </div>

                    <div className={cx('Seller')}>
                        <div className={cx('SellerHeader')}>
                            <div className={cx('logo-tiki')}>
                                <img src={logoTiki} alt="logoTiki" />
                            </div>
                            <div className={cx('tikiTrading')}>
                                Tiki Trading
                                <span className={cx('logoOffice')}>
                                    <img src={logoOffice} className={cx('style-Logo-Office')} alt="logoOffice" />
                                </span>
                            </div>
                            <div className={cx('rate-Trading-Tiki')}>
                                <span>|</span>
                                <div className={cx('Star-vote')}>
                                    4.7
                                    <FontAwesomeIcon icon={faStar} className={cx('Star')} />
                                </div>
                                <div className={cx('rate')}>(5.5 triệu đánh giá)</div>
                            </div>
                        </div>
                        <div className={cx('purchase-Quantity-Product')}>
                            <div className={cx('Quantity-Product')}>
                                <div className={cx('QuantityLetters')}>Số lượng</div>
                                <InputNumber min={1} max={10} defaultValue={1} onChange={handleQuantityChange} />
                            </div>
                        </div>
                        <div>
                            <div className={cx('provisionalPrice')}>Tạm Tính</div>
                            <div className={cx('cost-Product')}>
                                {totalPrice.toLocaleString()} <span className={cx('sup')}>đ</span>
                            </div>
                        </div>
                        <div className={cx('btn-Buy')}>
                            <Button
                                large
                                onClick={handlePaymentPage}
                                disabled={selectedShippingMethod === null || countInStock <= 0 || isLoading}
                            >
                                {isLoading ? 'Đang xử lý...' : 'Đặt Hàng'}
                            </Button>
                            <Button add onClick={handleCartShopping} disabled={countInStock <= 0 || isLoading}>
                                {isLoading ? 'Đang xử lý...' : 'Thêm vào giỏ hàng'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
