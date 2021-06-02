import { ApolloError, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginMutationResult, useLoginMutation } from "../GraphQL/types";

export const loginMutation = () => gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        tasks {
          name
          numPomos
          createdAt
          completedPomos
        }
        timer {
          endTime
          isPaused
          pausedTimeLeftMs
          type
        }
      }
    }
  }
`;

type UseLogin = {
  login: (
    email: string,
    password: string
  ) => Promise<LoginMutationResult["data"]>;
  loading: boolean;
  error?: ApolloError;
};

const useLogin = (): UseLogin => {
  const [loginOperation, { loading, error }] = useLoginMutation();

  const login = async (
    email: string,
    password: string
  ): Promise<LoginMutationResult["data"]> => {
    const res = await loginOperation({
      variables: {
        email,
        password,
      },
    });
    if (res.data?.login?.token) {
      await AsyncStorage.setItem("userToken", res.data.login.token);
    }
    return res.data;
  };

  return {
    login,
    loading,
    error,
  };
};

export default useLogin;
