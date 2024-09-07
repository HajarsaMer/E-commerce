import React, { useEffect, useState } from 'react'
import { getSpecificProduct } from '../APIS/getspecificproducts'
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { getProductsWithCategories } from '../APIS/getProducts';
import Item from './Item';
import Loading from './Loading';
import { useMutatinCart } from '../hoooks/userMutationCart';
import { AddToCartApi } from '../APIS/cartApis';
import { toast } from 'react-toastify';
import { Rating } from '@mui/material';
export default function ProductsDetails() {

    let { mutate, data, status } = useMutatinCart(AddToCartApi)

    if (status === 'success')
        toast.success(data?.data?.message)
    if (status === 'error')
        toast.error()


    let { id, categoryId } = useParams()

    let [imgSrc, setImgSrc] = useState('')
    let [product, setProduct] = useState([])
    let [relatedProducts, setRelatedProducts] = useState([])
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')
    async function getSpecificProductApi() {
        setLoading(true)
        let data = await getSpecificProduct(id)
        if (data?.data) {
            setProduct(data?.data)
            setMsg('')
            setLoading(false)
        }
        else {
            setMsg(data)
            setLoading(false)
        }
    }
    ////////// related products
    async function getProductsWithCategoriesApi() {
        setLoading(true)
        let data = await getProductsWithCategories(categoryId)
        if (data?.data) {
            setRelatedProducts(data?.data)
            setMsg('')
            setLoading(false)
        }
        else {
            setMsg(data)
            setLoading(false)
        }
    }

    function changeSrc(e) {
        setImgSrc(e.target.src)
    }


    useEffect(() => {
        getProductsWithCategoriesApi()
    }, [])

    useEffect(() => {
        getSpecificProductApi()
    }, [id])


    if (loading)
        return <Loading></Loading>

    if (msg)
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>


    return (
        <>
            <div className='row items-center py-5 sm:gap-0  gap-10'>
                <div className=" sm:w-1/3">
                    <img src={imgSrc ? imgSrc : product?.imageCover} className='w-full' alt="" />
                    <ul className='flex justify-center my-3 gap-2'>
                        {product?.images?.map(img => <li key={img}><motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={changeSrc} src={img} className='w-[80px] cursor-pointer' alt="" /></li>)}
                    </ul>
                </div>
                <div className="sm:w-2/3 p-4">

                    <p className='text-green-700 '>{product?.category?.name}</p>
                    <p className='line-clamp-1'>{product?.title}</p>
                    <p className='font-thin'>{product?.description}</p>
                    <div className='flex justify-between my-3'>
                        <p className="text-green-700 line-through">{product?.price} EGP</p>
                        {product?.priceAfterDiscount ? <p >{product?.priceAfterDiscount} EGP</p> : ''}
                    </div>
                    <p>
                        <Rating name="half-rating" sx={{ fontSize: '1.7rem' }} defaultValue={product?.ratingsAverage} precision={0.1} /></p>

                    <button onClick={() => { mutate(product?._id) }} className='bg-green-700 text-white p-2 rounded btn'>Add to cart</button>
                </div>

            </div>
            <h2 className='text-2xl my-4 text-green-700'>Related Products</h2>
            <div className="row">
                {relatedProducts?.map(prod => <Item ele={prod} key={prod._id}></Item>)}
            </div>
        </>
    )

}
