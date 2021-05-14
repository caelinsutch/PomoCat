import { Db } from "mongodb";
import { connect } from "./DAO";

const dbPromise: Promise<Db> = connect();

export default dbPromise;
