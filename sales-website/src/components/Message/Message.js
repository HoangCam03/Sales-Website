import { message } from 'antd';
const [messageApi, contextHolder] = message.useMessage(); // Sử dụng message từ Ant Design

const success = (mes = 'Success') => {
    messageApi.open({
        type: 'success',
        content: mes,
    });
};

const error = (mes = 'Error') => {
    messageApi.open({
        type: 'error',
        content: mes,
    });
};

export { success, error, contextHolder };
