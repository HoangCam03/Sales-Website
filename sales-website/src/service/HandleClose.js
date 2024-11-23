import { useNavigate } from 'react-router';
const navigate = useNavigate();
const handleClose = () => {
    navigate('/'); // Điều hướng tới trang chủ
};
export { handleClose };
