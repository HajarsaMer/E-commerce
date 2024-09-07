
import axios from "axios";


let baseUrl = `https://ecommerce.routemisr.com/api/v1`
let token = localStorage.getItem('userToken')

//add to wishlist
export function AddTowishlistApi(productId) {
    return axios.post(`${baseUrl}/wishlist`, { productId }, {
        headers: {
            token
        }
    })
}

//get wishlist
export function getwishlistApi() {
    return axios.get(`${baseUrl}/wishlist`, {
        headers: {
            token
        }
    })
}
//delete wishlist
export function deletewishlistApi(id) {
    return axios.delete(`${baseUrl}/wishlist/${id}`, {
        headers: {
            token
        }
    })
}