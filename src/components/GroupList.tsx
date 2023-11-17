import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { getDocs } from "firebase/firestore";
import { groupMemberCollectionRef } from "@/lib/converters/GroupMembers";
import GroupListRows from "./GroupListRows";

async function GroupList() {
  const session = await getServerSession(authOptions);
  const groupsSnapshot = await getDocs(
    groupMemberCollectionRef(session?.user.id!)
  );
  const initialGroups = groupsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    // timestamp: null,
  }));

  return (
    <div className="bg-card">
      <GroupListRows initialGroups={initialGroups} />
    </div>
  );
}

export default GroupList;
