import { useRouter } from "next/router";

export const useCallbackUrl = () => {
  const { query } = useRouter();

  const callbackUrl = (query.callbackUrl as string) || "/home";

  return callbackUrl;
};
