import classNames from 'classnames/bind';
import styles from './CartShopping.module.scss';
import Top from '../Layouts/Pay/Top';
import Header from '../Layouts/components/Header';
import { useLocation, useNavigate, useParams } from 'react-router';
import trash from '~/assets/images/freeShip/trash.svg';
import FakeCheckBox from '../FakerRadioButton/FakeCheckBox';

import { InputNumber, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartShopping } from '~/service/CartShoppingService/GetCartShopping';
import { setCartShopping } from '~/action/actions';
import Address from '../Address';
import CartShoppingInfor from './CartShoppingInfor';
import ShippingPlan from '../ShippingPlan';
import { createOrder } from '~/service/OrderService/createOrder';

const cx = classNames.bind(styles);

function CartShopping() {
    const { id } = useParams();
    const location = useLocation();
    // const { discount, image, price } = location.state || {};
    const [shippingFee, setShippingFee] = useState(0);
    const navigate = useNavigate();
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]); // Khởi tạo mảng rỗng
    const cartShopping = useSelector((state) => state.cartShoppingReducer.orders); // Lấy dữ liệu giỏ hàng từ Redux store
    const user = useSelector((state) => state.userSlide);
    const [selectedItems, setSelectedItems] = useState([]); // Lưu trữ các sản phẩm được chọn
    // const [isLoading, setIsLoading] = useState(false);

    const { address, phone, name: userName, email } = user;

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const cartShoppingData = await getCartShopping(id);
                if (cartShoppingData && cartShoppingData.data) {
                    dispatch(setCartShopping(cartShoppingData.data));
                    console.log('cartShoppingData', cartShoppingData.data);
                    // Lưu danh sách đơn hàng vào Redux
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchOrders();
    }, [id, dispatch]);

    useEffect(() => {
        if (cartShopping && cartShopping.length > 0) {
            const initialCheckedItems = cartShopping.map((order) => order.CartShoppingItems.map(() => false));
            setCheckedItems(initialCheckedItems);
        }
    }, [cartShopping]);

    const handleQuantityChange = (orderIndex, itemIndex, value) => {
        const newSelectedItems = [...selectedItems];
        const item = cartShopping[orderIndex].CartShoppingItems[itemIndex];
        const selectedItemIndex = newSelectedItems.findIndex((selectedItem) => selectedItem.product === item.product);

        if (selectedItemIndex !== -1) {
            newSelectedItems[selectedItemIndex] = {
                ...newSelectedItems[selectedItemIndex],
                amount: value,
            };
            setSelectedItems(newSelectedItems);
        }
    };

    const handleComeBackHome = () => {
        navigate('/');
    };

    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const newCheckedItems = cartShopping.map((order) => order.CartShoppingItems.map(() => newSelectAll));
        setCheckedItems(newCheckedItems);

        if (newSelectAll) {
            const allSelectedItems = cartShopping.flatMap((order) => order.CartShoppingItems);
            setSelectedItems(allSelectedItems);
        } else {
            setSelectedItems([]);
        }
    };

    const handlePaymentPage = async () => {
        // setIsLoading(true);

        // Tạo danh sách sản phẩm trong đơn hàng từ selectedItems
        const orderItems = selectedItems.map((item) => ({
            name: item.name,
            amount: item.amount,
            image: [item.image], // Đảm bảo hình ảnh là một mảng
            price: item.price,
            product: item.product,
        }));

        // Tính tổng giá trị đơn hàng
        const itemsPrice = calculateTotalPrice();
        const totalPrice = calculateFinalPrice();

        // Dữ liệu đơn hàng
        const orderData = {
            orderItems,
            shippingAddress: {
                name: userName,
                address: address,
                phone: phone,
                email: email,
            },
            itemsPrice,
            shippingPrice: shippingFee,
            totalPrice,
        };

        try {
            const response = await createOrder(orderData);
            console.log('Order created successfully:', response);
            message.success('Order created successfully!');
            // Lưu trạng thái đơn hàng vào sessionStorage
            sessionStorage.setItem('isOrderConfirmed', 'true');
            navigate(`/pay/${id}`, { state: { quantity: selectedItems.length, totalPrice } });
        } catch (error) {
            console.error('Order creation failed:', error);
            message.error('Order creation failed!');
        } finally {
            // setIsLoading(false);
        }
    };

    const handleItemChange = (orderIndex, itemIndex) => {
        const newCheckedItems = [...checkedItems];
        if (newCheckedItems[orderIndex] && newCheckedItems[orderIndex][itemIndex] !== undefined) {
            newCheckedItems[orderIndex][itemIndex] = !newCheckedItems[orderIndex][itemIndex];
            setCheckedItems(newCheckedItems);

            const selectedItem = cartShopping[orderIndex].CartShoppingItems[itemIndex];
            if (newCheckedItems[orderIndex][itemIndex]) {
                setSelectedItems((prevSelectedItems) => [...prevSelectedItems, selectedItem]);
            } else {
                setSelectedItems((prevSelectedItems) =>
                    prevSelectedItems.filter((item) => item.product !== selectedItem.product),
                );
            }
        }
    };

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => total + item.price * item.amount, 0);
    };

    const calculateFinalPrice = () => {
        // Tính tổng giá trị đơn hàng bao gồm phí giao hàng
        return calculateTotalPrice() + shippingFee;
    };

    if (!cartShopping || cartShopping.length === 0) {
        return <div>Loading...</div>; // Hoặc hiển thị một thông báo khác khi dữ liệu đang được tải
    }

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('top')}>
                    <Top />
                </div>
                <div className={cx('main-header')}>
                    <Header />
                </div>
            </header>
            <div className={cx('body')}>
                <div className={cx('wrapper-Header-Body')}>
                    <div className={cx('header-Body')} onClick={handleComeBackHome}>
                        Giỏ hàng
                    </div>
                    {cartShopping.length === 0 ? (
                        <div className={cx('no-orders')}>Bạn không có đơn hàng nào, hãy mua hàng ngay!</div>
                    ) : (
                        <div className={cx('content')}>
                            <div className={cx('left-content')}>
                                <div className={cx('upper-bar')}>
                                    <label className={cx('checkbox')}>
                                        <FakeCheckBox checked={selectAll} onChange={handleSelectAllChange} />
                                        <span className={cx('check-all', 'chckall')}>
                                            {' '}
                                            Tất cả ({cartShopping.length} sản phẩm)
                                        </span>
                                    </label>
                                    <span className={cx('type', 'font')}>Đơn giá</span>
                                    <span className={cx('type', 'font')}>Số lượng</span>
                                    <span className={cx('type', 'font')}>Thành tiền</span>
                                    <img className={cx('remove-all', 'dl')} src={trash} alt="trash" />
                                </div>
                                {cartShopping.map((order, orderIndex) =>
                                    order.CartShoppingItems.map((item, itemIndex) => (
                                        <div key={`${order._id}-${item.product}`} className={cx('row')}>
                                            <div className={cx('title-img-check')}>
                                                <div className={cx('checkBox', 'chckall')}>
                                                    <FakeCheckBox
                                                        checked={
                                                            checkedItems[orderIndex]
                                                                ? checkedItems[orderIndex][itemIndex]
                                                                : false
                                                        }
                                                        onChange={() => handleItemChange(orderIndex, itemIndex)}
                                                    />
                                                </div>
                                                <div className={cx('imgProduct')}>
                                                    <img className={cx('img')} src={item.image} alt={item.name} />
                                                </div>
                                                <div className={cx('title')}>
                                                    <div className={cx('Headline')}>{item.name}</div>
                                                    <span className={cx('shipping-plan')}>
                                                        <img
                                                            className={cx('method-logo')}
                                                            alt="delivery-method-icon"
                                                            width="32"
                                                            height="16"
                                                            src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                                                        />
                                                        <span className={cx('method-text')}>Giao siêu tốc 2h</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('price')}>
                                                <span className={cx('first-price')}>
                                                    {item.price} <span className={cx('sup')}>₫</span>
                                                </span>
                                            </div>
                                            <div className={cx('purchase-Quantity-Product')}>
                                                <div className={cx('Quantity-Product')}>
                                                    <InputNumber
                                                        min={1}
                                                        max={10}
                                                        defaultValue={item.amount}
                                                        onChange={(value) =>
                                                            handleQuantityChange(orderIndex, itemIndex, value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('price')}>
                                                <span className={cx('total-price')}>{item.price * item.amount} đ</span>
                                            </div>
                                            <div className={cx('deletle')}>
                                                <img className={cx('remove-item', 'dl')} src={trash} alt="trash" />
                                            </div>
                                        </div>
                                    )),
                                )}
                            </div>
                            <div className={cx('right-content')}>
                                <div className={cx('infor')}>
                                    <div className={cx('address')}>
                                        <Address address={address} userName={userName} phone={phone}></Address>
                                    </div>
                                    <div className={cx('shipping-plan')}>
                                        <ShippingPlan
                                            onShippingChange={(fee) => setShippingFee(fee)}
                                            setSelectedShippingMethod={(method) =>
                                                console.log('Selected Method:', method)
                                            } // Thay thế logic này nếu cần
                                        ></ShippingPlan>
                                    </div>

                                    <div>
                                        <CartShoppingInfor
                                            itemsPrice={calculateTotalPrice()}
                                            shippingPrice={shippingFee}
                                            totalPriceOrder={calculateFinalPrice()}
                                            handlePaymentPage={handlePaymentPage} // Truyền hàm handlePaymentPage
                                        ></CartShoppingInfor>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartShopping;
