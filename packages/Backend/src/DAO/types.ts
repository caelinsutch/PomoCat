/* eslint-disable */
import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
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
  completeTask?: Maybe<GenericResult>;
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

export type MutationCompleteTaskArgs = {
  name: Scalars["String"];
  createdAt: Scalars["String"];
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

export type AdditionalEntityFields = {
  path?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

import { ObjectID } from "mongodb";
export type AnalyticsDbObject = {
  pomosFinished: number;
  daysLoggedPomos: number;
  lastDayLoggedPomo?: Maybe<string>;
  dayStreak: number;
};

export type SettingsDbObject = {
  pomoLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  isAlarmSound: boolean;
};

export type TaskDbObject = {
  name: string;
  numPomos: number;
  createdAt: string;
  completedPomos: number;
};

export type TimerDbObject = {
  endTime?: Maybe<string>;
  isPaused?: Maybe<boolean>;
  pausedTimeLeftMs?: Maybe<number>;
  type?: Maybe<string>;
};

export type UserMvcDbObject = {
  _id: ObjectID;
  email: string;
  password: string;
  settings: Settings;
  tasks: Array<Task>;
  analytics: Analytics;
  timer: Timer;
  createdAt: string;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Analytics: ResolverTypeWrapper<Analytics>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  AnalyticsInput: AnalyticsInput;
  AuthResult: ResolverTypeWrapper<AuthResult>;
  GenericResult: ResolverTypeWrapper<GenericResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Settings: ResolverTypeWrapper<Settings>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  SettingsInput: SettingsInput;
  Task: ResolverTypeWrapper<Task>;
  Timer: ResolverTypeWrapper<Timer>;
  TimerType: TimerType;
  UserInput: UserInput;
  UserMVC: ResolverTypeWrapper<UserMvc>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Analytics: Analytics;
  Int: Scalars["Int"];
  String: Scalars["String"];
  AnalyticsInput: AnalyticsInput;
  AuthResult: AuthResult;
  GenericResult: GenericResult;
  Mutation: {};
  Query: {};
  Settings: Settings;
  Boolean: Scalars["Boolean"];
  SettingsInput: SettingsInput;
  Task: Task;
  Timer: Timer;
  UserInput: UserInput;
  UserMVC: UserMvc;
  ID: Scalars["ID"];
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars["String"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = UnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars["String"];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars["Boolean"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = { overrideType?: Maybe<Scalars["String"]> };

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {};

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = IdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = { overrideType?: Maybe<Scalars["String"]> };

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = LinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {};

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = { path: Scalars["String"] };

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = MapDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AnalyticsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Analytics"] = ResolversParentTypes["Analytics"]
> = {
  pomosFinished?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  daysLoggedPomos?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  lastDayLoggedPomo?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  dayStreak?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AuthResult"] = ResolversParentTypes["AuthResult"]
> = {
  user?: Resolver<ResolversTypes["UserMVC"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GenericResult"] = ResolversParentTypes["GenericResult"]
> = {
  user?: Resolver<ResolversTypes["UserMVC"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  register?: Resolver<
    ResolversTypes["AuthResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "email" | "password">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["AuthResult"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["UserMVC"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "data">
  >;
  startTimer?: Resolver<
    Maybe<ResolversTypes["GenericResult"]>,
    ParentType,
    ContextType,
    RequireFields<MutationStartTimerArgs, never>
  >;
  changeTimerType?: Resolver<
    Maybe<ResolversTypes["GenericResult"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeTimerTypeArgs, "type">
  >;
  stopTimer?: Resolver<
    Maybe<ResolversTypes["GenericResult"]>,
    ParentType,
    ContextType
  >;
  pauseTimer?: Resolver<
    Maybe<ResolversTypes["GenericResult"]>,
    ParentType,
    ContextType
  >;
  createTask?: Resolver<
    Maybe<ResolversTypes["GenericResult"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTaskArgs, "name" | "numPomos">
  >;
  completeTask?: Resolver<
    Maybe<ResolversTypes["GenericResult"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCompleteTaskArgs, "name" | "createdAt">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  allUsers?: Resolver<
    Array<Maybe<ResolversTypes["UserMVC"]>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<
    Maybe<ResolversTypes["UserMVC"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, never>
  >;
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type SettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Settings"] = ResolversParentTypes["Settings"]
> = {
  pomoLength?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  shortBreakLength?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  longBreakLength?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isAlarmSound?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  numPomos?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  completedPomos?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Timer"] = ResolversParentTypes["Timer"]
> = {
  endTime?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isPaused?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  pausedTimeLeftMs?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["TimerType"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMvcResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserMVC"] = ResolversParentTypes["UserMVC"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  settings?: Resolver<ResolversTypes["Settings"], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes["Task"]>, ParentType, ContextType>;
  analytics?: Resolver<ResolversTypes["Analytics"], ParentType, ContextType>;
  timer?: Resolver<ResolversTypes["Timer"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Analytics?: AnalyticsResolvers<ContextType>;
  AuthResult?: AuthResultResolvers<ContextType>;
  GenericResult?: GenericResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Settings?: SettingsResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  Timer?: TimerResolvers<ContextType>;
  UserMVC?: UserMvcResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> =
  DirectiveResolvers<ContextType>;
