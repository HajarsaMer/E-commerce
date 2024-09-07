import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Componnets/Products';
import Home from './Componnets/Home';
import Login from './Componnets/Login';
import Register from './Componnets/Register';
import Cart from './Componnets/Cart';
import Brand from './Componnets/Brand';
import NotFound from './Componnets/NotFound';
import Layout from './Componnets/Layout';
import ProtectedRoute from './Componnets/ProtectedRoute';
import Forget from './Componnets/Forget';
import ResetCode from './Componnets/ResetCode';
import NewPassword from './Componnets/NewPassword';
import ProductsDetails from './Componnets/ProductsDetails';
import Orders from './Componnets/Orders';
import Parent from './Componnets/memoization/Parent';
import Memory from './Componnets/memoization/Memory';
import { WishlistProvider } from 'react-use-wishlist';
import Wishlist from './Componnets/Wishlist';


export default function App() {


  let routes = createBrowserRouter([{
    path: '/', element: <Layout></Layout>, children: [
      { index: true, element: <ProtectedRoute> <Home></Home></ProtectedRoute> },
      { path: '/products', element: <ProtectedRoute><Products></Products></ProtectedRoute> },
      { path: '/productdetails/:id/:categoryId', element: <ProtectedRoute><ProductsDetails></ProductsDetails></ProtectedRoute> },
      { path: '/cart', element: <ProtectedRoute> <Cart></Cart> </ProtectedRoute> },
      { path: '/register', element: <Register></Register> },
      { path: '/forget', element: <Forget></Forget> },
      { path: '/allorders', element: <Orders></Orders> },
      { path: '/newpassword', element: <NewPassword></NewPassword> },
      { path: '/reset', element: <ResetCode></ResetCode> },
      { path: '/login', element: <Login></Login> },
      { path: '/wishlist', element: <Wishlist></Wishlist> },
      { path: '/brand', element: <ProtectedRoute><Brand></Brand></ProtectedRoute> },
      { path: '*', element: <NotFound></NotFound> }
    ]
  }])

  return (
    <WishlistProvider>

      <RouterProvider router={routes}></RouterProvider>
    </WishlistProvider>

  )
}
