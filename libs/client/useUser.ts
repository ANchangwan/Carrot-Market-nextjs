import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((json) => {
        if (!json.ok) {
          return router.replace("/enter");
        }
        setUser(json.profile);
      });
  }, [router]);
  return user;
}
