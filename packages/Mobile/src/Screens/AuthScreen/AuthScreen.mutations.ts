import { gql } from "@apollo/client";

const loginMutation = () => gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        task {
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

export default {
  loginMutation,
};
