/* eslint-disable */
import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Analytics = {
  pomosFinished: Scalars["Int"];
  daysLoggedPomos: Scalars["Int"];
  lastDayLoggedPomo?: Maybe<Scalars["String"]>;
  dayStreak: Scalars["Int"];
};

export type AnalyticsInput = {
  pomosFinished?: Maybe<Scalars["Int"]>;
  daysLoggedPomos?: Maybe<Scalars["Int"]>;
  lastDayLoggedPomo?: Maybe<Scalars["String"]>;
  dayStreak?: Maybe<Scalars["Int"]>;
};

export type AuthResult = {
  user: UserMvc;
  token: Scalars["String"];
};

export type Mutation = {
  register: AuthResult;
  login?: Maybe<AuthResult>;
  updateUser?: Maybe<UserMvc>;
  startTimer: Scalars["Boolean"];
  stopTimer: Scalars["Boolean"];
  pauseTimer: Scalars["Boolean"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  data: UserInput;
};

export type MutationStartTimerArgs = {
  type?: Maybe<TimerType>;
};

export type Query = {
  allUsers: Array<Maybe<UserMvc>>;
  user?: Maybe<UserMvc>;
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type Settings = {
  pomoLength: Scalars["Int"];
  shortBreakLength: Scalars["Int"];
  longBreakLength: Scalars["Int"];
  isAlarmSound: Scalars["Boolean"];
};

export type SettingsInput = {
  pomoLength?: Maybe<Scalars["Int"]>;
  shortBreakLength?: Maybe<Scalars["Int"]>;
  longBreakLength?: Maybe<Scalars["Int"]>;
  isAlarmSound?: Maybe<Scalars["Boolean"]>;
};

export type Task = {
  name: Scalars["String"];
  numPomos: Scalars["Int"];
  createdAt: Scalars["String"];
  completedPomos: Scalars["Int"];
  isCompleted: Scalars["Boolean"];
};

export type Timer = {
  endTime?: Maybe<Scalars["String"]>;
  isPaused?: Maybe<Scalars["Boolean"]>;
  pausedTimeLeftMs?: Maybe<Scalars["Int"]>;
  type?: Maybe<TimerType>;
};

export enum TimerType {
  Pomodoro = "Pomodoro",
  ShortBreak = "ShortBreak",
  LongBreak = "LongBreak",
}

export type UserInput = {
  email?: Maybe<Scalars["String"]>;
  settings?: Maybe<SettingsInput>;
  analytics?: Maybe<AnalyticsInput>;
};

export type UserMvc = {
  id: Scalars["ID"];
  email: Scalars["String"];
  password: Scalars["String"];
  settings: Settings;
  task: Array<Maybe<Task>>;
  analytics: Analytics;
  timer: Timer;
  createdAt: Scalars["String"];
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  login?: Maybe<
    Pick<AuthResult, "token"> & {
      user: Pick<UserMvc, "id" | "email"> & {
        task: Array<
          Maybe<
            Pick<
              Task,
              | "name"
              | "numPomos"
              | "createdAt"
              | "completedPomos"
              | "isCompleted"
            >
          >
        >;
        timer: Pick<
          Timer,
          "endTime" | "isPaused" | "pausedTimeLeftMs" | "type"
        >;
      };
    }
  >;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = {
  register: Pick<AuthResult, "token"> & {
    user: Pick<UserMvc, "id" | "email"> & {
      task: Array<
        Maybe<
          Pick<
            Task,
            "name" | "numPomos" | "createdAt" | "completedPomos" | "isCompleted"
          >
        >
      >;
      timer: Pick<Timer, "endTime" | "isPaused" | "pausedTimeLeftMs" | "type">;
    };
  };
};

export const LoginDocument = gql`
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult =
  ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult =
  ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
