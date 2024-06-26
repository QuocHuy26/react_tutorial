import React, { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import Login from '../components/Login';

const AppRoutes = () => {
    const ListProducts = React.lazy(() => import('../components/ListProducts'));
    const AddProduct = React.lazy(() => import('../components/AddProduct'));
    const ProductDetails = React.lazy(() => import('../components/ProductDetails'));
    return (
        <>
            <Suspense fallback={<h1>Loading ...</h1>}>
                <Routes>
                    <Route
                        path='/'
                        element={<Login />}
                    />
                    <Route
                        path='/list'
                        element={
                            <PrivateRoute>
                                <ListProducts/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/add'
                        element={
                            <PrivateRoute>
                                <AddProduct/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={`/detail/:id`}
                        element={
                            <PrivateRoute>
                                <ProductDetails />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default AppRoutes;