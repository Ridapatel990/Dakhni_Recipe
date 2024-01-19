// import { cookieOptions } from "constants/config";
// import { setCookie } from "cookies-next";
// import { VoidFunction } from "types/functionTypes";
// import { onError } from "utils/onError";
import { useGetAll } from "./useGetAll";

export const useDownaloadFile = (
  path: string,
  onSuccess?: ()=>{},
  schemaName?: string
) => {
  const options = useGetAll({
    key: path,
    schemaName,
    select: (data) => data?.data,
    enabled: false,
    onSuccess: (data) => {
      // let a = document.createElement("a");
      // a.href = `${process.env.NEXT_PUBLIC_API_URL?.split("/api/v1")[0]}${
      //   data.message ? data.message : data.data?.message
      // }`;

      // console.log("callefd");

      // a.target = "_blank";
      // a.download =
      //   data?.data?.message?.split("/")[
      //     data?.data?.message?.split("/")?.length - 1
      //   ];
      // a.click();
      // setCookie("xlsx_format", data?.data?.format, cookieOptions);
      options.remove();
      onSuccess && onSuccess();
    },
    onError(err) {
      // onError(err);
    },
  });

  return options;
};
