import { useEffect } from 'react';
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Comment(props) {
    const { dataHref } = props;

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    return (
        <div className={cx('comment')}>
            <div className={cx('content')}>
                <div className="fb-comments" data-href={dataHref} data-width="" data-numposts="5"></div>
            </div>
        </div>
    );
}

export default Comment;
