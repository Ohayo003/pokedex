import { ButtonProps, IconButton, IconButtonProps } from "@chakra-ui/button";
import React from "react";
import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { Icon } from "@chakra-ui/react";
// import { useCallbackUrl } from "hooks/useCallbackUrl";

interface IProviderButtons {
  provider: "facebook" | "github" | "google";
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  label?: string;
}

const ProviderButtons = ({
  provider,
  icon,
  label,
  ...props
}: IProviderButtons & IconButtonProps) => {
  // const callbackUrl = useCallbackUrl();

  return (
    <IconButton
      background="transparent"
      icon={icon}
      onClick={() =>
        signIn(provider, {
          // callbackUrl: callbackUrl,
        })
      }
      {...props}
    />
  );
};

export default ProviderButtons;
