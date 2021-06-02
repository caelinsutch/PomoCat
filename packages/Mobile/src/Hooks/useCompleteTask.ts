import { ApolloError, gql } from "@apollo/client";
import {
  CompleteTaskMutationResult,
  useCompleteTaskMutation,
} from "../GraphQL/types";

export const CompleteTask = gql`
  mutation CompleteTask($name: String!, $createdAt: String!) {
    completeTask(name: $name, createdAt: $createdAt) {
      user {
        id
        tasks {
          name
          numPomos
          completedPomos
          createdAt
        }
      }
    }
  }
`;

type UseCompleteTask = {
  completeTask: (
    name: string,
    createdAt: string
  ) => Promise<CompleteTaskMutationResult["data"]>;
  loading: boolean;
  error?: ApolloError;
};

const useCompleteTask = (): UseCompleteTask => {
  const [completeTaskOperation, { loading, error }] = useCompleteTaskMutation();

  const completeTask = async (name: string, createdAt: string) => {
    const res = await completeTaskOperation({
      variables: {
        name,
        createdAt,
      },
    });
    return res.data;
  };

  return {
    completeTask,
    loading,
    error,
  };
};

export default useCompleteTask;
