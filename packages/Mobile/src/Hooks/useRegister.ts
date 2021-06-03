import { ApolloError, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { RegisterMutationResult, useRegisterMutation } from "../GraphQL/types";
import { userState } from "../Recoil";

export const registerMutation = () => gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
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

type UseRegister = {
  register: (
    email: string,
    password: string
  ) => Promise<RegisterMutationResult["data"]>;
  loading: boolean;
  error?: ApolloError;
};

const useRegister = (): UseRegister => {
  const [registerOperation, { loading, error }] = useRegisterMutation();
  const setUser = useSetRecoilState(userState);

  const register = async (
    email: string,
    password: string
  ): Promise<RegisterMutationResult["data"]> => {
    const res = await registerOperation({
      variables: {
        email,
        password,
      },
    });
    if (res.data?.register?.token) {
      await AsyncStorage.setItem("userToken", res.data.register.token);
      setUser({
        token: res.data.register.token,
      });
    }
    return res.data;
  };

  return {
    register,
    loading,
    error,
  };
};

export default useRegister;
