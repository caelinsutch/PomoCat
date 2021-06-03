import { gql } from "@apollo/client";
import { useSetRecoilState } from "recoil";
import apolloClient from "../GraphQL/apolloClient";
import { userState } from "../Recoil";

type UseLogout = {
  logout: () => void;
};

const useLogout = (): UseLogout => {
  const setUser = useSetRecoilState(userState);

  const logout = () => {
    setUser({
      token: undefined,
    });
  };

  return { logout };
};

export default useLogout;
