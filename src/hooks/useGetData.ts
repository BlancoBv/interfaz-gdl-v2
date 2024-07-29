import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Axios from "../assets/Axios";

export function useGetData(url: string, key: string) {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await Axios.get(url);
      return data;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 50000,
  });
}
