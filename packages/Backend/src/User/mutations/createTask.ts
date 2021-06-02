import { ObjectID } from "mongodb";
import { MutationResolvers } from "../../DAO";
import { checkAuth } from "../../Helpers";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const createTask: MutationResolvers["createTask"] = async (
  _,
  { numPomos, name },
  context
) => {
  checkAuth(context);

  const userCollection = await getUserCollection();

  const previous = context.user;

  const newTasks = [
    ...previous.tasks,
    {
      name,
      numPomos,
      createdAt: Date.now(),
      completedPomos: 0,
      isCompleted: false,
    },
  ];

  const res = await userCollection.findOneAndUpdate(
    {
      _id: ObjectID.createFromHexString(previous.id),
    },
    {
      $set: {
        tasks: newTasks,
      },
    },
    {
      returnOriginal: false,
      upsert: true,
    }
  );

  console.log(res);

  const user = getUserMvcFromDbObject(res.value);

  return { user };
};

export default createTask;
