import { useMutation } from "react-query";
// import { toast, onError } from "utils";
// import { setApiHeaders } from "utils/setApiHeaders";
import { serverAPI } from "../utils/serverAPI";

interface useDeleteTypes {
  url: string;
  refetch?: ()=>{};
  name: string;
  successMsg?: string;
}

export function useDelete({ url, name, refetch, successMsg }: useDeleteTypes) {
  const deleteItem = (id: number | string) => {
    // setApiHeaders();
    return serverAPI.delete(url + "/" + id);
  };
  return useMutation(deleteItem, {
    onSuccess: () => {
      // toast(successMsg ? successMsg : `${name} deleted successfully`);
      refetch && refetch();
    },
    // onError,
  });
}
