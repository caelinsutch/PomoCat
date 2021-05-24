// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloServerExpressConfig } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { UserMvc } from "./DAO";
import { secret } from "../constants";
import { getUserCollection, getUserMvcFromDbObject } from "./User/user.helpers";

export type ContextType = {
  user?: UserMvc;
};

const context: ApolloServerExpressConfig["context"] = async ({
  req,
}): Promise<ContextType> => {
  const token = req.headers.authorization || "";
  let user = null;

  try {
    const res = await verify(token, secret);
    if (!res) throw new Error("Incorrect password");
    const { userId } = res as Record<string, string>;

    const userCollection = await getUserCollection();

    const dbObject = await userCollection.findOne({
      _id: ObjectID.createFromHexString(userId),
    });
    user = getUserMvcFromDbObject(dbObject);
  } catch (e) {
    return {};
  }

  return {
    user,
  };
};

export default context;
