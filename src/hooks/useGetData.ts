import {
  keepPreviousData,
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import Axios from "@assets/Axios";

export interface getDataInterface {
  data: { response: any[] };
  isPending: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}

export function useGetData(
  url: string,
  key: string,
  config: { fetchInURLChange?: boolean; selectFn?: (data: any) => any } = {
    fetchInURLChange: false,
  }
): getDataInterface {
  const { data, isPending, isFetching, isError, refetch } = useQuery({
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
    retry: 1,
    select: config.selectFn
      ? (data) => {
          if (config.selectFn) {
            return config.selectFn(data);
          }
        }
      : undefined,
  });

  console.log({ isPending, isFetching });

  return {
    data,
    isPending: isPending || isFetching,
    isError,
    refetch,
  } as const;
}
