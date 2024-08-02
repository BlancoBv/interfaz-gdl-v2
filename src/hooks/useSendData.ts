import { useMutation } from "@tanstack/react-query";
import Axios from "../assets/Axios";
import { toast } from "react-toastify";

export function useSendData(url: string, customFn?: (elem?: any) => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await Axios.post(url, data);
      console.log(res);
      if (res.status === 400) {
        return Promise.reject(res.data);
      }

      return res;
    },
    onSuccess: (data) => {
      if (customFn) {
        console.log(customFn);

        customFn(data);
      }

      toast.success("Enviado correctamente");
    },
    onError: (err: { msg: string }) => {
      toast.error(err.msg);
    },
  });
  return { mutate, isPending } as const;
}
