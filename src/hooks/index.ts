import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { IPostLogin } from "../models";
import { postLogin } from "../services";


export const useLogin = (postData: IPostLogin) => {
    return useQuery<IPostLogin>({
      queryKey: [
        "login"
      ],
      // queryFn
      queryFn: async () => {
        return await postLogin<IPostLogin>(postData);
      },
    } as UseQueryOptions<IPostLogin, Error, IPostLogin>
    );
  };
