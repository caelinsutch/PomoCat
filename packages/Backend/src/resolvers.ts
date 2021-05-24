import { Resolvers } from "./DAO";
import { userMutations, userQueries } from "./User";

const resolvers: Resolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
  },
};

export default resolvers;
