import React from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarPayMentMethod.module.scss';
import FakerRadioButton from '~/components/FakerRadioButton';
import cash from '~/assets/images/PaymentMethod/cash.png';
import zalo from '~/assets/images/PaymentMethod/Zalo.png';
import viettelPay from '~/assets/images/PaymentMethod/viettel money.png';
import momo from '~/assets/images/PaymentMethod/Momo.jpg';
import vnpay from '~/assets/images/PaymentMethod/Vnpay.png';
import fecredit from '~/assets/images/PaymentMethod/fe-card.png';
import creditImg from '~/assets/images/PaymentMethod/Credit.png';

const cx = classNames.bind(styles);

function SidebarPayMentMethod({ setSelectedPaymentMethod }) {
    const handleSelectMethod = (method) => {
        setSelectedPaymentMethod(method); // Cập nhật state với phương thức thanh toán được chọn
    };

    return (
        <div className={cx('payMentMethod')}>
            <h3 className={cx('title')}>Chọn hình thức thanh toán</h3>
            <div className={cx('list-method')}>
                <div className={cx('payment')} onClick={() => handleSelectMethod('cash')}>
                    <FakerRadioButton />
                    <div className={cx('titlePayment')}>
                        <img className={cx('method-icon')} src={cash} width="32" height="32" alt="icon" />
                        <div className={cx('method-content')}>
                            <div className={cx('method-content__title')}>
                                <span>Thanh toán tiền mặt</span>
                            </div>
                            <div className={cx('method-content__sub-title')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('payment')} onClick={() => handleSelectMethod('viettelPay')}>
                    <FakerRadioButton />
                    <div className={cx('titlePayment')}>
                        <img className={cx('method-icon')} src={viettelPay} width="32" height="32" alt="icon" />
                        <div className={cx('method-content')}>
                            <div className={cx('method-content__title')}>
                                <span>Viettel Money</span>
                            </div>
                            <div className={cx('method-content__sub-title')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('payment')} onClick={() => handleSelectMethod('momo')}>
                    <FakerRadioButton />
                    <div className={cx('titlePayment')}>
                        <img className={cx('method-icon')} src={momo} width="32" height="32" alt="icon" />
                        <div className={cx('method-content')}>
                            <div className={cx('method-content__title')}>
                                <span>Ví MoMo</span>
                            </div>
                            <div className={cx('method-content__sub-title')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('payment')} onClick={() => handleSelectMethod('zalo')}>
                    <FakerRadioButton />
                    <div className={cx('titlePayment')}>
                        <img className={cx('method-icon')} src={zalo} width="32" height="32" alt="icon" />
                        <div className={cx('method-content')}>
                            <div className={cx('method-content__title')}>
                                <span>Ví Zalo Pay</span>
                            </div>
                            <div className={cx('method-content__sub-title')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('payment')} onClick={() => handleSelectMethod('vnpay')}>
                    <FakerRadioButton />
                    <div className={cx('titlePayment')}>
                        <img className={cx('method-icon')} src={vnpay} width="32" height="32" alt="icon" />
                        <div className={cx('method-content')}>
                            <div className={cx('method-content__title')}>
                                <span>Ví Vnpay</span>
                            </div>
                            <div className={cx('method-content__sub-title')}>Quét Mã QR Qua Ứng Dụng Ngân Hàng</div>
                        </div>
                    </div>
                </div>
                <div className={cx('payment')} onClick={() => handleSelectMethod('fecredit')}>
                    <FakerRadioButton />
                    <div className={cx('titlePayment')}>
                        <img className={cx('method-icon')} src={fecredit} width="32" height="32" alt="icon" />
                        <div className={cx('method-content')}>
                            <div className={cx('method-content__title')}>
                                <span>Thẻ Tín Dụng /Ghi nợ</span>
                            </div>
                            <div className={cx('method-content__sub-title')}>
                                <img
                                    alt="credit-card"
                                    src={creditImg}
                                    height="24"
                                    width="auto"
                                    className={cx('credit-card', 'fWjUGo')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarPayMentMethod;
