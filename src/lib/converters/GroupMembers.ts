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

export interface GroupMembers {
  userId: string;
  email: string;
  timestamp: Date | string;
  isAdmin: boolean;
  groupId: string;
  image: string;
}

const groupMemberConverter: FirestoreDataConverter<GroupMembers> = {
  toFirestore: function (member: GroupMembers): DocumentData {
    return {
      userId: member.userId,
      email: member.email,
      timestamp: member.timestamp,
      isAdmin: member.isAdmin,
      groupId: member.groupId,
      image: member.image,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): GroupMembers {
    const data = snapshot.data(options);

    return {
      userId: snapshot.id,
      email: data.email,
      timestamp: data.timestamp,
      isAdmin: data.isAdmin,
      groupId: data.groupId,
      image: data.image,
    };
  },
};

export const addGroupRef = (groupId: string, userId: string) =>
  doc(db, "groups", groupId, "members", userId).withConverter(
    groupMemberConverter
  );

export const groupMembersRef = (groupId: string) =>
  collection(db, "groups", groupId, "members").withConverter(
    groupMemberConverter
  );

export const groupMemberAdminRef = (groupId: string) =>
  query(
    collection(db, "groups", groupId, "members"),
    where("isAdmin", "==", true)
  ).withConverter(groupMemberConverter);

export const groupMemberCollectionRef = (userId: string) =>
  query(
    collectionGroup(db, "members"),
    where("userId", "==", userId)
  ).withConverter(groupMemberConverter);
