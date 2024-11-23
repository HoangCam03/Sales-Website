import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Input({ label, type = 'text', value, onChange, className, ...props }) {
    return (
        <div className={cx('input-wrapper', className)}>
            {label && <label className={cx('label')}>{label}</label>}
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange && onChange(e)}
                className={cx('input')}
                {...props}
            />
        </div>
    );
}

export default Input;
