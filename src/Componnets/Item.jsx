
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddToCartApi } from '../APIS/cartApis'
import { useMutatinCart } from '../hoooks/userMutationCart'
import { toast } from 'react-toastify'
import { useMutatinWishlist } from './../hoooks/useMutationWishlist';
import { AddTowishlistApi, deletewishlistApi } from './../APIS/wishlistApi';
import { useWishlist } from 'react-use-wishlist'
import Rating from '@mui/material/Rating';
import Loading from './Loading'
export default function Item({ ele }) {

  useEffect(() => {
    let { items } = JSON.parse(localStorage.getItem('react-use-wishlist'))
    let Arr = items.map(ele => ele._id)
    for (let i = 0; i < Arr.length; i++) {
      if (Arr[i] == ele?._id)
        setFlag(true)
    }
  }, [])

  const {
    isWishlistEmpty,
    totalWishlistItems,
    items,
    removeWishlistItem,
    addWishlistItem
  } = useWishlist();

  let [flag, setFlag] = useState(false)
  let { mutate, data, status } = useMutatinCart(AddToCartApi)
  let { mutate: addWish, isPending:addPending } = useMutatinWishlist(AddTowishlistApi)
  let { mutate: delWish, isPending:delPending} = useMutatinWishlist(deletewishlistApi)

  if (status === 'success')
    toast.success(data?.data?.message)
  if (status === 'error')
    toast.error(data?.data?.message)

  if(addPending || delPending)
    return <Loading></Loading>

  return (
    <div className='md:w-1/6 sm:w-1/2'>
      <div className="product p-4 cursor-pointer">
        <i onClick={() => {
          setFlag(!flag);
          !flag ? addWish(ele?._id) : delWish(ele?._id)
          !flag ? addWishlistItem(ele) : removeWishlistItem(ele?._id)

        }} className={` fa-solid my-3 inline-block float-right ${flag ? 'fa-heart text-green-700' : 'fa-heart-broken text-black'}`}></i>
        <Link to={`/productdetails/${ele?._id}/${ele?.category?._id}`}>
          <img src={ele?.imageCover} className='w-full' alt="" />
          <p className='text-green-700 '>{ele?.category?.name}</p>
          <p className='line-clamp-1'>{ele?.title}</p>
          <div className='flex justify-between my-3'>
            <p className="text-green-700 line-through">{ele?.price} EGP</p>
            {ele?.priceAfterDiscount?<p >{ele?.priceAfterDiscount} EGP</p>:''}  
          </div>
          <p> 
          <Rating name="half-rating" sx={{fontSize:'1.7rem'}} defaultValue={ele?.ratingsAverage} precision={0.1} /></p>
        </Link>
        <button onClick={() => { mutate(ele?._id) }} className='bg-green-700 text-white p-2 rounded btn'>Add to cart</button>
      </div>
    </div>
  )
}
