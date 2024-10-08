import HomePage from '~/Pages/HomePage/HomePage';
import OrderPage from '~/Pages/OrderPage/OrderPage';
import { DefaultLayout } from '~/compoents/Layouts';
import HeaderOnly from '~/compoents/Layouts/HeaderOnly';
import ListProducts from '~/compoents/Layouts/ListProducts';
import ProductDetails from '~/compoents/Layouts/ProductDetails';
import SignIn from '~/compoents/Layouts/SignIn';
const publicRoutes = [
    { path: '/', compoent: HomePage, layout: DefaultLayout },
    { path: '/list-product', OrderPage, layout: ListProducts },
    { path: '/feedback', compoent: OrderPage, layout: HeaderOnly },
    { path: '/product-details', compoent: OrderPage, layout: ProductDetails },
    { path: '/sign-in', layout: SignIn },
];

const privatRoutes = [];
export { publicRoutes, privatRoutes };
