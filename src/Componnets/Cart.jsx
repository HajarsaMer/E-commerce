import React from 'react'
import { useQueryCart } from '../hoooks/useQueryCart'
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from '../APIS/cartApis'
import { useMutatinCart } from '../hoooks/userMutationCart'
import emtycart from '../assets/preview.png'
import Loading from './Loading';
import BasicModal from './BasicModal'
export default function Cart() {

  let { data , isLoading } = useQueryCart('cart', getCartApi)
  let { mutate, isPending: delpending } = useMutatinCart(deleteCartApi)
  let { mutate: mutateupdate, isPending: uppending } = useMutatinCart(updateCartApi)
  let { mutate: clearmutate, isPending: clrpending } = useMutatinCart(clearCartApi)


  if (isLoading || delpending || clrpending || uppending)
    return <Loading></Loading>

  if (!data?.numOfCartItems)
    return <>
      <img className='mx-auto md:w-50 w-100' src={emtycart} alt="" />
    </>


  if (data?.numOfCartItems)
    return (
      <div className='container'>
        
        <button className='bg-red-700 p-4 my-5 text-white shadow-md' onClick={clearmutate}>clear cart</button>
        <h2 className='my-3 text-xl'>total cart price <span className='font-bold'>{data?.data?.totalCartPrice} EFG</span></h2>
        <h3 className='my-3 text-lg font-medium'>total items num {data?.numOfCartItems}</h3>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {data?.data?.products.map(ele => <tr key={ele?.product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={ele?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="text-lg px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {ele?.product?.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={
                        () =>
                          ele.count == 1 ? mutate(ele?.product._id) :
                            mutateupdate({ id: ele?.product?._id, count: ele.count ? ele?.count - 1 : ele.count })} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <span>{ele?.count}</span>
                    <button onClick={() => mutateupdate({ id: ele?.product?._id, count: ele?.count + 1 })} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="text-lg px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {ele?.priceAfterDiscount?ele?.priceAfterDiscount:ele?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => mutate(ele?.product?._id)} className="font-medium text-red-600 dark:text-red-500 bg-gray-300 p-2 rounded">Remove <i className='fa fa-trash-can'></i> </button>
                </td>
              </tr>)}





            </tbody>
          </table>
        </div>

      <BasicModal cartId={data?.data?._id}/>
      </div>
    )
}
