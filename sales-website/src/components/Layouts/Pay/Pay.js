import classNames from 'classnames/bind';
import styles from './Pay.module.scss';
import HeaderOnly from '../HeaderOnly';
import OrderInfor from './OrderInfor';
import SidebarPayMentMethod from './SidebarPayMentMethod';
import Top from './Top';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDetailProduct } from '~/service/ProductService/getDetailProduct';
import { getConfig } from '~/service/PaymentService/Paypal';

const cx = classNames.bind(styles);

function Pay() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { state } = useLocation();
    console.log('state', state);

    const [sdkReady, setSdkReady] = useState(false);

    const order = state?.order; // Lấy thông tin đơn hàng từ state
    console.log('order: ', order);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Theo dõi phương thức thanh toán
    const location = useLocation();

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

    const addPaypalScript = async () => {
        const { data } = await getConfig();
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
        console.log('data getconfig', data);
    };
    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    }, []);

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
    }, [id]);

    const handlePayment = async () => {
        if (!selectedPaymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán trước khi tiếp tục!');
            return;
        }
        console.log('Phương thức thanh toán đã chọn:', selectedPaymentMethod);

        if (selectedPaymentMethod === 'paypal') {
            // Nếu chọn PayPal, hiển thị PayPalButton
            alert('Tiến hành thanh toán qua PayPal');
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
                        sdkReady={sdkReady}
                        selectedPaymentMethod={selectedPaymentMethod}
                        isPaymentEnabled={!!selectedPaymentMethod} // Kiểm tra xem phương thức thanh toán đã được chọn chưa
                        order={order} // Truyền thông tin đơn hàng xuống
                    />
                </div>
            </div>
        </div>
    );
}

export default Pay;
