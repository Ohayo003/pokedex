import { useRouter } from "next/router";

export const useCallbackUrl = () => {
  const { query } = useRouter();

  const callbackUrl = [query.callbackUrl].flat(1).at(0) || "/home";

  return callbackUrl;
};
