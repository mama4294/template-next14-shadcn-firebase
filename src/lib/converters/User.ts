import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  collection,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { User } from "next-auth";

export interface GroupMembers {
  userId: string;
  email: string;
  timestamp: Date | string;
  isAdmin: boolean;
  groupId: string;
  image: string;
}

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: function (customer: User): DocumentData {
    return {
      name: customer.name,
      email: customer.email,
      image: customer.image,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      name: data.name,
      email: data.email,
      image: data.image,
    };
  },
};

export const getUserByEmail = (email: string) =>
  query(collection(db, "users"), where("email", "==", email)).withConverter(
    userConverter
  );
