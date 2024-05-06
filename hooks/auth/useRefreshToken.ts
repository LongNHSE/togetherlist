import { ApiPub } from "@/lib/api";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await ApiPub.post("/auth/refresh-token", {
      refreshToken: session?.tokens.refreshToken,
    });

    if (session) session.tokens.accessToken = res.data.tokens.accessToken;
    else signIn();
  };
  return refreshToken;
};
