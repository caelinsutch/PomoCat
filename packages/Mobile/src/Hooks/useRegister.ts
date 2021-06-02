import { ApolloError, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RegisterMutationResult, useRegisterMutation } from "../GraphQL/types";

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
          isCompleted
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
