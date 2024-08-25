import { useMutation } from "@tanstack/react-query";
import Axios from "@assets/Axios";
import { toast } from "react-toastify";

export function useSendData(
  url: string,
  config: {
    method: "post" | "delete" | "put";
    containerID?: "global" | "fromModal";
    customFn?: (elem?: any) => void;
    onSuccessMsg?: string;
    onErrorMsg?: string;
  } = {
    method: "post",
    customFn: undefined,
  }
) {
  const { mutate, isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (data?: any) => {
      const res = await Axios[config.method](url, data);
      console.log(res);
      if (res.status === 400) {
        return Promise.reject(res.data);
      }

      return res;
    },
    onSuccess: (data) => {
      if (config.customFn) {
        config.customFn(data);
      }
      toast.success(
        config.onSuccessMsg ? config.onSuccessMsg : "Enviado Correctamente",
        {
          containerId: config.containerID ? config.containerID : "global",
        }
      );
    },
    onError: (err: { msg: string }) => {
      toast.error(err.msg, {
        containerId: config.containerID ? config.containerID : "global",
      });
    },
  });
  return { mutate, isPending, isSuccess, mutateAsync } as const;
}
