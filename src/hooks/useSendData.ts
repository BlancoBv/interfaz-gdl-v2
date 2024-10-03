import {
  UseMutateAsyncFunction,
  UseMutateFunction,
  useMutation,
} from "@tanstack/react-query";
import Axios from "@assets/Axios";
import { toast } from "react-toastify";

export interface sendDataInterface {
  data: any | { response: any[] };
  mutate: UseMutateFunction<any, { msg: string }, any, unknown>;
  isPending: boolean;
  isSuccess: boolean;
  mutateAsync: UseMutateAsyncFunction<any, { msg: string }, any, unknown>;
}

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
): sendDataInterface {
  const { mutate, isPending, isSuccess, mutateAsync, data } = useMutation({
    mutationFn: async (data?: any) => {
      const res = await Axios[config.method](url, data);

      if (res.status === 400 || res.status === 404) {
        return Promise.reject(res.data);
      }

      return res.data;
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
    onError: (_err: { msg: string }) => {
      toast.error("Error al enviar los datos", {
        containerId: config.containerID ? config.containerID : "global",
      });
    },
  });
  return { mutate, isPending, isSuccess, mutateAsync, data } as const;
}
