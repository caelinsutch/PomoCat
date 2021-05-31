import AsyncStorage from "@react-native-async-storage/async-storage";
import { gql } from "@apollo/client";
import apolloClient from "../GraphQL/apolloClient";

const updateLocalState = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  if (userToken) {
    await apolloClient.writeQuery({
      query: gql`
        query WriteToken($id: Int!) {
          token
        }
      `,
      data: {
        // Contains the data to write
        token: userToken,
      },
    });
  }
};

export default updateLocalState;
