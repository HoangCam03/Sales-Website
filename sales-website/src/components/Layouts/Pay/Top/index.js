import classNames from 'classnames/bind';
import styles from './Top.module.scss';
import imgShip from '~/assets/images/freeShip/shipextra.png';

const cx = classNames.bind(styles);

function Top() {
    return (
        <div style={{ position: 'relative', zIndex: 999 }}>
            <a href="/">
                <div className={cx('banner')} style={{ backgroundColor: '#EFFFF4' }}>
                    <div className={cx('title-banner')} style={{ color: '#00AB56' }}>
                        Freeship đơn từ 45k, giảm nhiều hơn cùng
                    </div>
                    <picture className={cx('webpimg-container')}>
                        <img
                            src={imgShip}
                            className={cx('StyledImg', 'hbqSye', 'title-img')}
                            alt="icon"
                            width="79"
                            height="16"
                            style={{ width: '79px', height: '16px', opacity: 1 }}
                        />
                    </picture>
                </div>
            </a>
        </div>
    );
}

export default Top;
