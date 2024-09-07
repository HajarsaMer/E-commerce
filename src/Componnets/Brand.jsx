import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from './Loading'

export default function Brand() {


  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ['brands'], queryFn: getBrands,

  })


  if (isLoading)
    return <Loading></Loading>

  if (isError)
    return <h2>{error.message}</h2>


  return (
    <div className='row'>
      {data?.data?.data.map(ele => <div key={ele?._id} className='w-1/4'>
        <img src={ele?.image} alt="" />
      </div>)}
    </div>
  )
}
