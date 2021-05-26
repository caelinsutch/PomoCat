import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import dayjs from "dayjs";
import { MutationResolvers, UserMvc } from "../../DAO";
import { salt, secret } from "../../../constants";
import { getUserCollection, getUserMvcFromDbObject } from "../user.helpers";

const register: MutationResolvers["register"] = async (
  _,
  { email, password }
) => {
  const userCollection = await getUserCollection();
  const hashedPassword = await hash(password, salt);
  const data: Omit<UserMvc, "id"> = {
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
    timer: {},
    task: [],
    createdAt: dayjs().toISOString(),
  };

  const document = await userCollection.insertOne(data);
  const user = getUserMvcFromDbObject({
    _id: document.insertedId,
    ...data,
  });
  const token = sign({ userId: user.id }, secret);

  return {
    user,
    token,
  };
};

export default register;
