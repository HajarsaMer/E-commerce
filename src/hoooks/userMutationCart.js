import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartApi } from "../APIS/cartApis";



export function useMutatinCart(fn) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            if (fn === clearCartApi)
                queryClient.setQueriesData('cart', null)
        }
    })
}