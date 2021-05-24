import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { MutationResolvers } from "../../DAO";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";
import { secret } from "../../../constants";

const login: MutationResolvers["login"] = async (_, { email, password }) => {
  const userCollection = await getUserCollection();
  const dbObject = await userCollection.findOne({ email });

  if (!dbObject) throw new Error("Could not find user");

  const user = getUserMvcFromDbObject(dbObject);

  const verify = await compare(password, user.password);

  if (!verify) throw new Error("Incorrect password");

  const token = sign({ userId: user.id }, secret);

  return {
    user,
    token,
  };
};

export default login;
