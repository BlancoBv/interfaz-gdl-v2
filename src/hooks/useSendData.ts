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
    refetchFn: any;
  } = {
    method: "post",
    refetchFn: () => {},
  }
) {
  const { mutate, isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (data?: any) => {
      const res = await Axios[config.method](url, data);

      if (res.status === 400 || res.status === 404) {
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
      config.refetchFn();
    },
    onError: (err: { msg: string }) => {
      toast.error("Error al enviar los datos", {
        containerId: config.containerID ? config.containerID : "global",
      });
    },
  });
  return { mutate, isPending, isSuccess, mutateAsync } as const;
}
