import { ObjectID } from "mongodb";
import { MutationResolvers } from "../../DAO";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const updateUser: MutationResolvers["updateUser"] = async (_, { id, data }) => {
  const userCollection = await getUserCollection();
  const previous = await userCollection.findOne({
    _id: ObjectID.createFromHexString(id),
  });

  const dbObject = await userCollection.findOneAndUpdate(
    {
      _id: ObjectID.createFromHexString(id),
    },
    {
      $set: {
        email: data.email,
        settings: {
          ...previous.settings,
          ...data.settings,
        },
        analytics: {
          ...previous.analytics,
          ...data.analytics,
        },
      },
    },
    {
      returnOriginal: false,
    }
  );

  return getUserMvcFromDbObject(dbObject.value);
};

export default updateUser;
