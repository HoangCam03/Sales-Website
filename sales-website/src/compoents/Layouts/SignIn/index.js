import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import Header from '~/compoents/Layouts/compoents/Header';
import Button from '~/compoents/Button';
import avtfb from '~/assets/images/avtfb.png';
import avtgg from '~/assets/images/gg.png';

const cx = classNames.bind(styles);

function SignIn() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header></Header>
            </div>
            <div className={cx('Modal-SignIn')}>
                <div className={cx('ReactModal-Content')}>
                    <div className={cx('Style-Content')}>
                        <Button className={cx('Close')}>
                            <img
                                className={cx('close-img')}
                                src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
                                alt="icon"
                            ></img>
                        </Button>
                        <div className={cx('Styles-Left')}>
                            <div className={cx('Login')}>
                                <div className={cx('login-Header')}>
                                    <h4>Xin chào,</h4>
                                    <p>Đăng nhập hoặc Tạo tài khoản</p>
                                </div>
                                <form>
                                    <div className={cx('input')}>
                                        <input
                                            type="tel"
                                            name="tel"
                                            placeholder="Số điện thoại"
                                            maxlength="10"
                                            value=""
                                        ></input>
                                    </div>
                                    <Button large className={cx('style-btn')}>
                                        Tiếp Tục
                                    </Button>
                                </form>
                                <p className={cx('login-with-email')}>Đăng nhập bằng email</p>
                                <div className={cx('StyleSocial')}></div>
                                <p className={cx('social-heading')}>
                                    <span>Hoặc tiếp tục bằng</span>
                                </p>
                                <ul className={cx('social__items')}>
                                    <li className={cx('social__item')}>
                                        <img src={avtfb} alt="facebook"></img>
                                    </li>
                                    <li class="social__item">
                                        <img className={cx('style-avtGG')} src={avtgg} alt="google"></img>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('styles-Right')}>
                            <img
                                src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
                                className={cx('style-avt-login')}
                                alt="avtLogin"
                            ></img>
                            <div className={cx('content')}>
                                <h4>Mua sắm tại Tiki</h4>
                                <span>Siêu ưu đãi mỗi ngày</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
