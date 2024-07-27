import { useCallback, useEffect, useState } from "react";
import Axios from "../assets/Axios";

export function useGetData(url: string, autoFetch: boolean = true) {
  const [data, setData] = useState<{ response?: any; success: boolean } | null>(
    null
  );
  const [error, setError] = useState<boolean>(true);
  const [dataError, setDataError] = useState<object | null | unknown>({});
  const [isPending, setIsPending] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  const consultar = useCallback(
    async (url: string) => {
      setIsPending(true);
      try {
        const res = await Axios.get(url);
        setData(res.data);
        setError(false);
      } catch (error) {
        setDataError(error);
        setError(true);
      }
      setIsPending(false);
      setTrigger(false);
    },
    [url]
  );

  useEffect(() => {
    if (autoFetch || trigger) {
      consultar(url);
    }
  }, [url, trigger]);

  return {
    data,
    dataError,
    error,
    isPending,
    trigger: () => setTrigger(true),
  } as const;
}
