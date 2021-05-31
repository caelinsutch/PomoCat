import { gql, useQuery } from "@apollo/client";

const useAuthState = () => {
  const isLoggedIn = gql`
    query isUserLoggedIn {
      token @client
    }
  `;

  const { data } = useQuery(isLoggedIn);

  return data?.token;
};

export default useAuthState;
