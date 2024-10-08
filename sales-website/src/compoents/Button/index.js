import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    onClick,
    home,
    primary = false,
    outline = false,
    disabled = false,
    small = false,
    large = false,
    text = false,
    add = false,
    children,
    ...passProps
}) {
    const props = {
        onClick,
        ...passProps,
    };
    ///Remove event listener when click btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    let Comp = 'button';

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        to,
        primary,
        outline,
        disabled,
        small,
        large,
        text,
        home,
        add,
    });

    return (
        <Comp className={classes} {...props}>
            {home && <span className={cx('icon')}>{home}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
