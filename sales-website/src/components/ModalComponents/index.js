import { Modal } from 'antd';

function ModalComponents({ title, isOpen, children, ...rest }) {
    return (
        <Modal title={title} open={isOpen} {...rest}>
            {children}
        </Modal>
    );
}

export default ModalComponents;
