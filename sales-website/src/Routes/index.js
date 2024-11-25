import HomePage from '~/Pages/HomePage/HomePage';
import OrderPage from '~/Pages/OrderPage/OrderPage';
import { DefaultLayout } from '~/components/Layouts';
import HeaderOnly from '~/components/Layouts/HeaderOnly';
import ListProducts from '~/components/Layouts/ListProducts';

import SignUp from '~/components/Layouts/SignUp';

import SignIn from '~/components/Layouts/SignIn';
import ProfileUsers from '~/components/Layouts/ProfileUsers';
import PrivateRoute from '~/components/PrivateRoute';
import Products from '~/components/Products';
import Admin from '~/components/Layouts/Admin';
import AdminUser from '~/components/Layouts/AdminUser';
import AdminProducts from '~/components/Layouts/AdminProducts';
import ProductDetails from '~/components/Layouts/ProductDetails';
import Pay from '~/components/Layouts/Pay/Pay';
import Order from '~/components/Order';

const publicRoutes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/list-product', OrderPage, layout: ListProducts },
    { path: '/feedback', component: OrderPage, layout: HeaderOnly },
    { path: '/product-details/:id', layout: ProductDetails },
    { path: '/sign-in', layout: SignIn },
    { path: '/sign-up', layout: SignUp },
    { path: '/profile-user', layout: ProfileUsers },
    { path: '/order/:id', component: Order, layout: Order },

    { path: '/pay/:id', layout: Pay },

    {
        path: '/products',
        element: (
            <PrivateRoute>
                <Products />
            </PrivateRoute>
        ),
    },
    {
        path: '/admin',
        element: (
            <PrivateRoute>
                <Admin />
            </PrivateRoute>
        ),
        layout: Admin,
    },
    {
        path: '/admin/user',
        element: (
            <PrivateRoute>
                <AdminUser />
            </PrivateRoute>
        ),
        layout: AdminUser,
    },
    {
        path: '/admin/products',
        element: (
            <PrivateRoute>
                <AdminProducts />
            </PrivateRoute>
        ),
        layout: AdminProducts,
    },
];

const privatRoutes = [];
export { publicRoutes, privatRoutes };
