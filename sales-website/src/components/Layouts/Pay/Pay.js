import classNames from 'classnames/bind';
import styles from './Pay.module.scss';
import HeaderOnly from '../HeaderOnly';
import OrderInfor from './OrderInfor';
import SidebarPayMentMethod from './SidebarPayMentMethod';
import Top from './Top';
import { useLocation, useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getDetailProduct } from '~/service/ProductService/getDetailProduct';

const cx = classNames.bind(styles);

function Pay() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { state } = useLocation();
    console.log('state', state);

    const order = state?.order; // Lấy thông tin đơn hàng từ state
    console.log('order: ', order);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Theo dõi phương thức thanh toán
    const location = useLocation();
    const navigate = useNavigate();
    const { totalPrice } = location.state || { quantity: 1, totalPrice: 0 };
    console.log('Giá tiền bên tạo sản phẩm', totalPrice);

    const user = useSelector((state) => state.userSlide);
    const { address, phone, name: userName } = user;

    const price = order?.totalPrice || state?.totalPrice || 0;
    // const shippingFee = order?.shippingPrice || state?.shippingPrice || 0;

    // Kiểm tra nếu hôm nay là thứ Hai
    const today = new Date();
    const isMonday = today.getDay() === 1;
    const discount = isMonday ? 77000 : 0;
    const finalPrice = price - discount;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productData = await getDetailProduct(id);
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();

        // Thay đổi lịch sử trình duyệt để ngăn chặn quay lại trang đặt hàng
        window.history.replaceState(null, '', window.location.href);

        // Lắng nghe sự kiện "popstate" để điều hướng về trang chủ khi người dùng bấm nút quay lại
        const handlePopState = () => {
            navigate('/');
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup event listener khi component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [id, navigate]);

    const handlePayment = async () => {
        if (!selectedPaymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán trước khi tiếp tục!');
            return;
        }

        if (selectedPaymentMethod === 'zalo') {
            // Nếu chọn Zalo Pay, thực hiện logic thanh toán qua Zalo
            try {
                const response = await axios.post('http://localhost:3001/api/payment', {
                    description: `Payment for order ${id}`,
                    image: product.data.image,
                    user: userName,
                    name: product.data.name,
                    phone: phone,
                    address: address,
                    provisionalPrice: finalPrice,
                    paymentMethod: selectedPaymentMethod,
                });
                const { data } = response;
                if (data && data.payment_url) {
                    window.location.href = data.payment_url; // Chuyển hướng đến trang thanh toán Zalo
                }
            } catch (error) {
                console.error('Lỗi khi thanh toán qua Zalo Pay:', error.message);
            }
        } else {
            // Nếu chọn phương thức khác, xử lý logic tương ứng (hoặc hiển thị thông báo)
            alert(`Bạn đã chọn phương thức thanh toán: ${selectedPaymentMethod}. Tiến hành xử lý!`);
            // Gọi API hoặc thực hiện logic xử lý đơn hàng ở đây
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('top-header')}>
                    <Top />
                </div>
                <div className={cx('bottom-header')}>
                    <HeaderOnly />
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <SidebarPayMentMethod
                        setSelectedPaymentMethod={setSelectedPaymentMethod} // Truyền hàm update state xuống component
                    />
                </div>
                <div className={cx('order-Information')}>
                    <OrderInfor
                        userName={userName}
                        phone={phone}
                        address={address}
                        totalPrice={finalPrice}
                        discount={discount}
                        handlePayment={handlePayment}
                        isPaymentEnabled={!!selectedPaymentMethod} // Kiểm tra xem phương thức thanh toán đã được chọn chưa
                    />
                </div>
            </div>
        </div>
    );
}

export default Pay;
