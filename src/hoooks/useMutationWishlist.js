import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutatinWishlist(fn) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        }
    })
}