import { hash } from "bcryptjs";
import { MutationResolvers } from "../../DAO";
import { salt } from "../../../constants";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const register: MutationResolvers["register"] = async (
  _,
  { email, password }
) => {
  const userCollection = await getUserCollection();
  const hashedPassword = await hash(password, salt);
  const data = {
    email,
    password: hashedPassword,
    analytics: {
      daysLoggedPomos: 0,
      dayStreak: 0,
      pomosFinished: 0,
    },
    settings: {
      isAlarmSound: true,
      longBreakLength: 30,
      pomoLength: 25,
      shortBreakLength: 5,
    },
    task: [],
  };

  const document = await userCollection.insertOne(data);

  return getUserMvcFromDbObject({
    _id: document.insertedId,
    ...data,
  });
};

export default register;
