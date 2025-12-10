import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/firebase/firestore";

function useUserProfile(uid) {
  const q = useQuery({
    queryKey: ["firebaseUser", uid],
    queryFn: () => getUserProfile(uid),
    enabled: !!uid,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
  return q;
}

export { useUserProfile };