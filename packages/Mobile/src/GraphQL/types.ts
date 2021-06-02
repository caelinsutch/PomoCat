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

export type GenericResult = {
  user: UserMvc;
};

export type Mutation = {
  register: AuthResult;
  login?: Maybe<AuthResult>;
  updateUser?: Maybe<UserMvc>;
  startTimer?: Maybe<GenericResult>;
  changeTimerType?: Maybe<GenericResult>;
  stopTimer?: Maybe<GenericResult>;
  pauseTimer?: Maybe<GenericResult>;
  createTask?: Maybe<GenericResult>;
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

export type MutationChangeTimerTypeArgs = {
  type: TimerType;
};

export type MutationCreateTaskArgs = {
  name: Scalars["String"];
  numPomos: Scalars["Int"];
};

export type Query = {
  allUsers: Array<Maybe<UserMvc>>;
  user?: Maybe<UserMvc>;
  token?: Maybe<Scalars["String"]>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["String"]>;
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
  tasks: Array<Task>;
  analytics: Analytics;
  timer: Timer;
  createdAt: Scalars["String"];
};

export type IsUserLoggedInQueryVariables = Exact<{ [key: string]: never }>;

export type IsUserLoggedInQuery = Pick<Query, "token">;

export type CreateTaskMutationVariables = Exact<{
  name: Scalars["String"];
  numPomos: Scalars["Int"];
}>;

export type CreateTaskMutation = {
  createTask?: Maybe<{
    user: Pick<UserMvc, "id"> & {
      tasks: Array<Pick<Task, "name" | "numPomos" | "isCompleted">>;
    };
  }>;
};

export type HomeScreenQueryVariables = Exact<{ [key: string]: never }>;

export type HomeScreenQuery = {
  user?: Maybe<
    Pick<UserMvc, "id" | "email"> & {
      tasks: Array<
        Pick<Task, "name" | "numPomos" | "completedPomos" | "isCompleted">
      >;
      timer: Pick<Timer, "endTime" | "isPaused" | "type">;
    }
  >;
};

export type SetTimerTypeMutationVariables = Exact<{
  type: TimerType;
}>;

export type SetTimerTypeMutation = {
  changeTimerType?: Maybe<{
    user: Pick<UserMvc, "id"> & { timer: Pick<Timer, "type"> };
  }>;
};

export type StartTimerMutationVariables = Exact<{
  type?: Maybe<TimerType>;
}>;

export type StartTimerMutation = {
  startTimer?: Maybe<{
    user: Pick<UserMvc, "id"> & { timer: Pick<Timer, "endTime"> };
  }>;
};

export type PauseTimerMutationVariables = Exact<{ [key: string]: never }>;

export type PauseTimerMutation = {
  pauseTimer?: Maybe<{
    user: Pick<UserMvc, "id"> & { timer: Pick<Timer, "endTime"> };
  }>;
};

export type StopTimerMutationVariables = Exact<{ [key: string]: never }>;

export type StopTimerMutation = {
  stopTimer?: Maybe<{
    user: Pick<UserMvc, "id"> & { timer: Pick<Timer, "endTime"> };
  }>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  login?: Maybe<
    Pick<AuthResult, "token"> & {
      user: Pick<UserMvc, "id" | "email"> & {
        tasks: Array<
          Pick<
            Task,
            "name" | "numPomos" | "createdAt" | "completedPomos" | "isCompleted"
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
      tasks: Array<
        Pick<
          Task,
          "name" | "numPomos" | "createdAt" | "completedPomos" | "isCompleted"
        >
      >;
      timer: Pick<Timer, "endTime" | "isPaused" | "pausedTimeLeftMs" | "type">;
    };
  };
};

export type WriteTokenQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type WriteTokenQuery = Pick<Query, "token">;

export const IsUserLoggedInDocument = gql`
  query isUserLoggedIn {
    token @client
  }
`;

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >(IsUserLoggedInDocument, options);
}
export function useIsUserLoggedInLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >(IsUserLoggedInDocument, options);
}
export type IsUserLoggedInQueryHookResult = ReturnType<
  typeof useIsUserLoggedInQuery
>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<
  typeof useIsUserLoggedInLazyQuery
>;
export type IsUserLoggedInQueryResult = ApolloReactCommon.QueryResult<
  IsUserLoggedInQuery,
  IsUserLoggedInQueryVariables
>;
export const CreateTaskDocument = gql`
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
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      name: // value for 'name'
 *      numPomos: // value for 'numPomos'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTaskDocument, options);
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult =
  ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
export const HomeScreenDocument = gql`
  query HomeScreen {
    user {
      id
      email
      tasks {
        name
        numPomos
        completedPomos
        isCompleted
      }
      timer {
        endTime
        isPaused
        type
      }
    }
  }
`;

/**
 * __useHomeScreenQuery__
 *
 * To run a query within a React component, call `useHomeScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeScreenQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeScreenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HomeScreenQuery,
    HomeScreenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<HomeScreenQuery, HomeScreenQueryVariables>(
    HomeScreenDocument,
    options
  );
}
export function useHomeScreenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HomeScreenQuery,
    HomeScreenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    HomeScreenQuery,
    HomeScreenQueryVariables
  >(HomeScreenDocument, options);
}
export type HomeScreenQueryHookResult = ReturnType<typeof useHomeScreenQuery>;
export type HomeScreenLazyQueryHookResult = ReturnType<
  typeof useHomeScreenLazyQuery
>;
export type HomeScreenQueryResult = ApolloReactCommon.QueryResult<
  HomeScreenQuery,
  HomeScreenQueryVariables
>;
export const SetTimerTypeDocument = gql`
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
export type SetTimerTypeMutationFn = ApolloReactCommon.MutationFunction<
  SetTimerTypeMutation,
  SetTimerTypeMutationVariables
>;

/**
 * __useSetTimerTypeMutation__
 *
 * To run a mutation, you first call `useSetTimerTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTimerTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTimerTypeMutation, { data, loading, error }] = useSetTimerTypeMutation({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSetTimerTypeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetTimerTypeMutation,
    SetTimerTypeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    SetTimerTypeMutation,
    SetTimerTypeMutationVariables
  >(SetTimerTypeDocument, options);
}
export type SetTimerTypeMutationHookResult = ReturnType<
  typeof useSetTimerTypeMutation
>;
export type SetTimerTypeMutationResult =
  ApolloReactCommon.MutationResult<SetTimerTypeMutation>;
export type SetTimerTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetTimerTypeMutation,
  SetTimerTypeMutationVariables
>;
export const StartTimerDocument = gql`
  mutation StartTimer($type: TimerType) {
    startTimer(type: $type) {
      user {
        id
        timer {
          endTime
        }
      }
    }
  }
`;
export type StartTimerMutationFn = ApolloReactCommon.MutationFunction<
  StartTimerMutation,
  StartTimerMutationVariables
>;

/**
 * __useStartTimerMutation__
 *
 * To run a mutation, you first call `useStartTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTimerMutation, { data, loading, error }] = useStartTimerMutation({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useStartTimerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    StartTimerMutation,
    StartTimerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    StartTimerMutation,
    StartTimerMutationVariables
  >(StartTimerDocument, options);
}
export type StartTimerMutationHookResult = ReturnType<
  typeof useStartTimerMutation
>;
export type StartTimerMutationResult =
  ApolloReactCommon.MutationResult<StartTimerMutation>;
export type StartTimerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  StartTimerMutation,
  StartTimerMutationVariables
>;
export const PauseTimerDocument = gql`
  mutation PauseTimer {
    pauseTimer {
      user {
        id
        timer {
          endTime
        }
      }
    }
  }
`;
export type PauseTimerMutationFn = ApolloReactCommon.MutationFunction<
  PauseTimerMutation,
  PauseTimerMutationVariables
>;

/**
 * __usePauseTimerMutation__
 *
 * To run a mutation, you first call `usePauseTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseTimerMutation, { data, loading, error }] = usePauseTimerMutation({
 *   variables: {
 *   },
 * });
 */
export function usePauseTimerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PauseTimerMutation,
    PauseTimerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    PauseTimerMutation,
    PauseTimerMutationVariables
  >(PauseTimerDocument, options);
}
export type PauseTimerMutationHookResult = ReturnType<
  typeof usePauseTimerMutation
>;
export type PauseTimerMutationResult =
  ApolloReactCommon.MutationResult<PauseTimerMutation>;
export type PauseTimerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PauseTimerMutation,
  PauseTimerMutationVariables
>;
export const StopTimerDocument = gql`
  mutation StopTimer {
    stopTimer {
      user {
        id
        timer {
          endTime
        }
      }
    }
  }
`;
export type StopTimerMutationFn = ApolloReactCommon.MutationFunction<
  StopTimerMutation,
  StopTimerMutationVariables
>;

/**
 * __useStopTimerMutation__
 *
 * To run a mutation, you first call `useStopTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopTimerMutation, { data, loading, error }] = useStopTimerMutation({
 *   variables: {
 *   },
 * });
 */
export function useStopTimerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    StopTimerMutation,
    StopTimerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    StopTimerMutation,
    StopTimerMutationVariables
  >(StopTimerDocument, options);
}
export type StopTimerMutationHookResult = ReturnType<
  typeof useStopTimerMutation
>;
export type StopTimerMutationResult =
  ApolloReactCommon.MutationResult<StopTimerMutation>;
export type StopTimerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  StopTimerMutation,
  StopTimerMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
export const WriteTokenDocument = gql`
  query WriteToken($id: Int!) {
    token
  }
`;

/**
 * __useWriteTokenQuery__
 *
 * To run a query within a React component, call `useWriteTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useWriteTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWriteTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWriteTokenQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    WriteTokenQuery,
    WriteTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<WriteTokenQuery, WriteTokenQueryVariables>(
    WriteTokenDocument,
    options
  );
}
export function useWriteTokenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WriteTokenQuery,
    WriteTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    WriteTokenQuery,
    WriteTokenQueryVariables
  >(WriteTokenDocument, options);
}
export type WriteTokenQueryHookResult = ReturnType<typeof useWriteTokenQuery>;
export type WriteTokenLazyQueryHookResult = ReturnType<
  typeof useWriteTokenLazyQuery
>;
export type WriteTokenQueryResult = ApolloReactCommon.QueryResult<
  WriteTokenQuery,
  WriteTokenQueryVariables
>;
