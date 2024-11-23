import React from 'react';
import Slider from 'react-slick';
import slider1 from '~/assets/images/banner1.png';
import slider2 from '~/assets/images/banner2.png';
import slider3 from '~/assets/images/banner3.png';

import classNames from 'classnames/bind';
import styles from './Slidercomponent.module.scss';
const cx = classNames.bind(styles);

const images = [slider1, slider2, slider3];

const Slidercomponent = () => {
    const settings = {
        // dots: true, // Hiển thị các dấu chấm chỉ mục
        // infinite: true, // Vòng lặp vô hạn
        // speed: 500, // Tốc độ chuyển slide
        // slidesToShow: 1, // Số lượng slide hiển thị cùng lúc
        // slidesToScroll: 1, // Số slide di chuyển khi chuyển tiếp
        // autoplay: true, // Tự động chạy slide
        // autoplaySpeed: 2000, // Tốc độ chuyển tự động giữa các slide

        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
    };

    return (
        <div>
            <Slider {...settings}>
                {images.map((images, index) => (
                    <div key={index}>
                        <img src={images} alt="má nó" className={cx('img')} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Slidercomponent;
