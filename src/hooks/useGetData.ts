import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Axios from "../assets/Axios";

export function useGetData(
  url: string,
  key: string,
  config: { fetchInURLChange: boolean } = { fetchInURLChange: false }
) {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: config.fetchInURLChange ? [key, url] : [key],
    queryFn: async () => {
      const { data } = await Axios.get(url);
      if (data.hasOwnProperty("code")) {
        return Promise.reject(data);
      }
      return data;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 50000,
  });
}
