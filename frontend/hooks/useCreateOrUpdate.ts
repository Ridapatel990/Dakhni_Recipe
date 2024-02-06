import { useMutation } from "react-query";
import { ResponseInterface } from "../interfaces";
import { serverAPI } from "../utils/serverAPI";
import errorHandler from "../utils/errorHandler";
// import { setApiHeaders } from "utils/setApiHeaders";

interface useCreateOrUpdateType<TVariables = any, TContext = unknown> {
  url: string;
  method?: "post" | "put";
  name?: string;
  refetch?: ()=>{};
  onSuccess?: (
    data: ResponseInterface,
    variables: TVariables,
    context: TContext | undefined
  ) => Promise<unknown> | void;
  onError?: (data:ResponseInterface) =>  Promise<unknown> | void,
  headers?: any
}

export function useCreateOrUpdate<T = unknown>({
  url,
  method = "post",
  refetch,
  onSuccess,
  onError,
  headers
}: useCreateOrUpdateType) {
  function sendData(data: T) {
    console.log('Create API called')
    console.log('------------',data,url,method,headers)
    // setApiHeaders();
    return serverAPI[method](url, data, {headers:headers});
  }
  
  return useMutation(sendData, {
    onSuccess: (response, variables, context) => {
      onSuccess && onSuccess(response, variables, context);
      refetch && refetch();
    },
    onError: (error: any) => {
      console.log('INSIDE HOOK ', error.response.data['errors'][0])
      errorHandler(error);
      onError && onError(error);
    },
  });
}
