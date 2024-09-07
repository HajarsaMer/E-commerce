import React from 'react'

import Item from './Item'
import Loading from './Loading'
import { useQueryWish } from './../hoooks/useQueryWishlist';
import { getwishlistApi } from '../APIS/wishlistApi';

export default function Wishlist() {
    let { data , isLoading } = useQueryWish('wishlist',  getwishlistApi)

   

    if(isLoading)
        return <Loading></Loading>
    
  return (
    <div>
       <div className="row">
       {data?.data.map(ele=><Item key={ele?._id}  ele={ele}></Item>)}
       </div>
    </div>
  )
}
