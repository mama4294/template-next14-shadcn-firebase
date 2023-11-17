"use client";

import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { groupMemberAdminRef } from "@/lib/converters/GroupMembers";

function useAdminId({ groupId }: { groupId: string }) {
  const [adminId, setAdminId] = useState<string>("");

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const adminId = (await getDocs(groupMemberAdminRef(groupId))).docs.map(
        (doc) => doc.id
      )[0];
      setAdminId(adminId);
    };
    fetchAdminStatus();
  }, [groupId]);

  return adminId;
}

export default useAdminId;
