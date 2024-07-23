import { useEffect, useState } from "react";
import Axios from "../assets/Axios";

export default function useGetData(url: string, actualizador?: boolean) {
  const [data, setData] = useState<{ response?: any; success: boolean } | null>(
    null
  );
  const [error, setError] = useState<boolean>(false);
  const [dataError, setDataError] = useState<object | null>({});
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

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
      });
    return () => {
      controller.abort();
      setData(null);
      setError(true);
      setDataError(null);
      setIsPending(true);
    };
  }, [url, actualizador]);

  return { data, dataError, error, isPending } as const;
}

const consultar = async (url: string, signal: AbortSignal) => {
  try {
    const res = await Axios.get(url, { signal });
    return res;
  } catch (error) {
    throw error;
  }
};
