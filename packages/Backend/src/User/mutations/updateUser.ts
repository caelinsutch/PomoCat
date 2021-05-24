import { ObjectID } from "mongodb";
import { MutationResolvers } from "../../DAO";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";
import { ContextType } from "../../context";
import { checkAuth } from "../../Helpers";

const updateUser: MutationResolvers<ContextType>["updateUser"] = async (
  _,
  { id, data },
  context
) => {
  checkAuth(context);

  const userCollection = await getUserCollection();
  const previous = await userCollection.findOne({
    _id: ObjectID.createFromHexString(id),
  });

  const res = await userCollection.findOneAndUpdate(
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
      upsert: true,
    }
  );
  console.log(res);

  return getUserMvcFromDbObject(res.value);
};

export default updateUser;
