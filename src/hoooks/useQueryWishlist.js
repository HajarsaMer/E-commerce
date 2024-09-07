import { useQuery } from "@tanstack/react-query";


export function useQueryWish(key,queryFn)
{
    return useQuery({queryKey:[key],queryFn,
        select:(data)=>data?.data
    })
}