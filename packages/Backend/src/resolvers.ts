import { Resolvers } from "./DAO";
import { userQueries } from "./User";

const resolvers: Resolvers = {
  Query: {
    ...userQueries,
  },
};

export default resolvers;
