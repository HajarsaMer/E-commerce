import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function NewPassword() {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')

    function handleNewPassword(values) {
        setLoading(true)
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            .then(({ data }) => {
                if (data.token) {
                    navigate('/login')
                }
            })
            .catch((err) => {
                setMsg(err?.response?.data?.message);
                setLoading(false)
            })
    }

    let validationSchema = Yup.object({
        email: Yup.string().email().required('email is reqiured'),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/).required('password id required'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: handleNewPassword
    })

    return (
        <div>
            <h2 className='my-3 text-2xl'>reset New password:</h2>
            {msg ? <div className=" w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{msg}</span>
            </div> : ''}
            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} type="email" onChange={formik.handleChange} value={formik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>

                {/* alert */}
                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.email}</span>
                </div> : ''}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} type="password" onChange={formik.handleChange} value={formik.values.newPassword} id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
                </div>

                {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.newPassword}</span>
                </div> : ''}

                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {loading ? <i className='fas fa-spin fa-spinner txet-white'></i> : 'Submit'}
                </button>
            </form>
        </div>
    )
}
