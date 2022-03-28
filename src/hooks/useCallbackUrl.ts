import { useRouter } from "next/router";

export const useCallbackUrl = () => {
  const { query } = useRouter();

  const callbackUrl = query.callbackUrl || "/home";

  return callbackUrl;
};
