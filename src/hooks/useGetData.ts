import { useCallback, useEffect, useState } from "react";
import Axios from "../assets/Axios";

export function useGetData(url: string, autoFetch: boolean = true) {
  const [data, setData] = useState<{ response?: any; success: boolean } | null>(
    null
  );
  const [error, setError] = useState<boolean>(true);
  const [dataError, setDataError] = useState<object | null>({});
  const [isPending, setIsPending] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<boolean>(false);

  const consultar = useCallback(
    async (url: string, signal: AbortSignal) => {
      try {
        const res = await Axios.get(url, { signal });
        return res;
      } catch (error) {
        throw error;
      }
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    if (autoFetch || trigger) {
      consultar(url, controller.signal)
        .then((res) => {
          setData(res.data);
          setDataError(null);
          setIsPending(false);
          setError(false);
        })
        .catch((err) => {
          setData(null);
          setDataError(err);
          setIsPending(false);
          setError(false);
        })
        .finally(() => setTrigger(false));
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
