import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './Routes';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './action/actions';
import PrivateRoute from './components/PrivateRoute';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        console.log('StoreData->', storedUserData);
        if (storedUserData) {
            dispatch(restoreUser(JSON.parse(storedUserData)));
        }
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = route.layout || Fragment;

                        const element = route.protected ? (
                            <PrivateRoute>
                                <Layout>
                                    <Page />
                                </Layout>
                            </PrivateRoute>
                        ) : (
                            <Layout>
                                <Page />
                            </Layout>
                        );

                        return <Route key={index} path={route.path} element={element} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
