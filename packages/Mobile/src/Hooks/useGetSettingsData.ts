import { gql, QueryResult } from "@apollo/client";
import {
  SettingsDataQuery,
  SettingsDataQueryVariables,
  useSettingsDataQuery,
} from "../GraphQL/types";

export const GetSettingsDataQuery = gql`
  query SettingsData {
    user {
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

export type UseGetSettingsData = QueryResult<
  SettingsDataQuery,
  SettingsDataQueryVariables
>;

const useGetSettingsData = (): UseGetSettingsData => {
  const query = useSettingsDataQuery();

  return { ...query };
};

export default useGetSettingsData;
