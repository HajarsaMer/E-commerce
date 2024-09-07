import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import CounterContextProvider from './Context/CounterContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
ReactDOM.createRoot(document.getElementById('root')).render(
    <CounterContextProvider>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient} >
                {/* <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools> */}
                   <ToastContainer autoClose={300} theme='dark' ></ToastContainer>
                <App />
            </QueryClientProvider>
        </AuthContextProvider>
    </CounterContextProvider>
)
