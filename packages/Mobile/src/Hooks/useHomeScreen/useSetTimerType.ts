import { ApolloError, gql } from "@apollo/client";
import {
  SetTimerTypeMutationResult,
  TimerType,
  useSetTimerTypeMutation,
} from "../../GraphQL/types";

export const SetTimerTypeMutation = gql`
  mutation SetTimerType($type: TimerType!) {
    changeTimerType(type: $type) {
      user {
        id
        timer {
          type
        }
      }
    }
  }
`;

type UseSetTimerType = {
  setTimerType: (
    type: TimerType
  ) => Promise<SetTimerTypeMutationResult["data"]>;
  loading?: boolean;
  error?: ApolloError;
};

const useSetTimerType = (): UseSetTimerType => {
  const [setTimerTypeOperation, { loading, error }] = useSetTimerTypeMutation();

  const setTimerType = async (
    type: TimerType
  ): Promise<SetTimerTypeMutationResult["data"]> => {
    const res = await setTimerTypeOperation({
      variables: {
        type,
      },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            user: (existingUser) => {
              if (data?.changeTimerType) {
                const { type: newType } = data.changeTimerType.user.timer;
                return { ...existingUser, type: newType };
              }
              return existingUser;
            },
          },
        });
      },
    });

    return res.data;
  };

  return {
    setTimerType,
    loading,
    error,
  };
};

export default useSetTimerType;
