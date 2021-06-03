import { ApolloError, gql } from "@apollo/client";
import {
  UpdateSettingsMutationResult,
  useUpdateSettingsMutation,
} from "../GraphQL/types";

export const UpdateSettingsMutation = gql`
  mutation UpdateSettings(
    $email: String!
    $pomoLength: Int!
    $shortBreakLength: Int!
    $longBreakLength: Int!
    $isAlarmSound: Boolean!
  ) {
    updateUser(
      data: {
        email: $email
        settings: {
          pomoLength: $pomoLength
          shortBreakLength: $shortBreakLength
          longBreakLength: $longBreakLength
          isAlarmSound: $isAlarmSound
        }
      }
    ) {
      id
      email
      settings {
        pomoLength
        shortBreakLength
        longBreakLength
        isAlarmSound
      }
    }
  }
`;

type UseUpdateSettings = {
  updateSettings: (
    email: string,
    pomoLength: number,
    shortBreakLength: number,
    longBreakLength: number,
    isAlarmSound: boolean
  ) => Promise<UpdateSettingsMutationResult["data"]>;
  loading?: boolean;
  error?: ApolloError;
};

const useUpdateSettings = (): UseUpdateSettings => {
  const [updateSettingsOperation, { loading, error }] =
    useUpdateSettingsMutation();

  const updateSettings = async (
    email: string,
    pomoLength: number,
    shortBreakLength: number,
    longBreakLength: number,
    isAlarmSound: boolean
  ) => {
    const res = await updateSettingsOperation({
      variables: {
        email,
        shortBreakLength,
        pomoLength,
        longBreakLength,
        isAlarmSound,
      },
    });
    return res.data;
  };

  return {
    updateSettings,
    loading,
    error,
  };
};

export default useUpdateSettings;
