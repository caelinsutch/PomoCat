import { gql, QueryResult } from "@apollo/client";
import {
  HomeScreenQuery,
  HomeScreenQueryVariables,
  useHomeScreenQuery,
} from "../../GraphQL/types";

export const HomeQuery = () => gql`
  query HomeScreen {
    user {
      id
      email
      tasks {
        name
        numPomos
        completedPomos
        createdAt
      }
      timer {
        endTime
        isPaused
        type
      }
    }
  }
`;

export type UseHomeScreenData = QueryResult<
  HomeScreenQuery,
  HomeScreenQueryVariables
>;

const useHomeScreenData = (): UseHomeScreenData => {
  const query = useHomeScreenQuery();

  return { ...query };
};

export default useHomeScreenData;
