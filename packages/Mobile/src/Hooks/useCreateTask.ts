import { ApolloError, gql } from "@apollo/client";
import {
  CreateTaskMutationResult,
  useCreateTaskMutation,
} from "../GraphQL/types";

export const CreateTaskMutation = gql`
  mutation CreateTask($name: String!, $numPomos: Int!) {
    createTask(name: $name, numPomos: $numPomos) {
      user {
        id
        tasks {
          name
          numPomos
          isCompleted
        }
      }
    }
  }
`;

type UseCreateTask = {
  createTask: (
    name: string,
    numPomos: number
  ) => Promise<CreateTaskMutationResult["data"]>;
  loading: boolean;
  error?: ApolloError;
};

const useCreateTask = (): UseCreateTask => {
  const [createTaskOperation, { loading, error }] = useCreateTaskMutation();

  const createTask = async (name: string, numPomos: number) => {
    const res = await createTaskOperation({
      variables: {
        name,
        numPomos,
      },
    });
    return res.data;
  };

  return {
    createTask,
    loading,
    error,
  };
};

export default useCreateTask;
