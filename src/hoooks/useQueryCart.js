import { useQuery } from "@tanstack/react-query";


export function useQueryCart(key,queryFn)
{
    return useQuery({queryKey:[key],queryFn,
        select:(data)=>data?.data
    })
}