import React, { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom'

const AppRoutes = () => {
    const ListProducts = React.lazy(() => import('./components/ListProducts'));
    const AddProduct = React.lazy(() => import('./components/AddProduct'));
    const ProductDetails = React.lazy(() => import('./components/ProductDetails'));
    const Login = React.lazy(() => import('./components/Login'));
    return (
        <>
            <Suspense fallback={<h1>Loading ...</h1>}>
                <Routes>
                    <Route
                        path='/'
                        element={<Login />}
                    />
                    <Route 
                        path="/list"
                        element={<ListProducts />}
                    />
                    <Route 
                        path="/add"
                        element={<AddProduct />}
                    />
                    <Route 
                        path={`/detail/:id`}
                        element={<ProductDetails />}
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default AppRoutes;