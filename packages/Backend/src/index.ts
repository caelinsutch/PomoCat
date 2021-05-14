import { ApolloServer } from "apollo-server";
import * as path from "path";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import resolvers from "./resolvers";

const { readFileSync } = require("fs");

const typeDefs = readFileSync(
  path.resolve(__dirname, "../../Shared/src/GraphQL/schema.graphql")
).toString("utf-8");

const apolloServer = new ApolloServer({
  typeDefs: [DIRECTIVES, typeDefs],
  resolvers,
});
const runServer = async () => {
  const { url } = await apolloServer.listen();
  return url;
};

runServer().then((url) => console.log(`🚀  Server ready at ${url}`));
