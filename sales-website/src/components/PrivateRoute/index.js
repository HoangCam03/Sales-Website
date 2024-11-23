import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user);

    if (!user.isLoggedIn || !user.isAdmin) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default PrivateRoute;
