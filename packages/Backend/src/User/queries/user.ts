import { ObjectID } from "mongodb";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";
import { QueryResolvers } from "../../DAO";

const user: QueryResolvers["user"] = async (_, { id }, context) => {
  let userId;

  if (context?.user) {
    userId = context.user.id;
  }

  if (id) {
    userId = id;
  }

  const userCollection = await getUserCollection();
  const dbObject = await userCollection.findOne({
    _id: ObjectID.createFromHexString(userId),
  });

  return getUserMvcFromDbObject(dbObject);
};

export default user;
