import React, { useEffect } from "react";
import { Box, Stack, Button, VStack } from "@chakra-ui/react";
import Label from "src/components/widgets/Forms/Label";
import TextField from "src/components/widgets/Forms/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Links from "src/components/widgets/Forms/Links";
import * as yup from "yup";
import seadragon from "public/assets/background/forgot-password-image.png";
import UIAccount from "src/components/Layouts/UIAccount";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { IResetPassword } from "../../interfaces/credentials";
import { RESET_PASSWORD } from "src/graphql/mutations/auth";
import { signIn, useSession } from "next-auth/react";
import { useCallbackUrl } from "src/hooks/useCallbackUrl";
import Loading from "src/components/widgets/Loading";

let schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(5)
    .required("Password must be minimum of 5 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match"),
});

const ResetPassword = () => {
  const router = useRouter();
  const passwordResetCode = router.query.code;
  const callbackUrl = useCallbackUrl();
  const emailAddress = router.query.email;
  const [resetPassword, { loading, data, error }] = useMutation(RESET_PASSWORD);

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IResetPassword>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IResetPassword> = async (data) => {
    const reset = await resetPassword({
      variables: {
        passwordResetCode: passwordResetCode,
        newPassword: data.newPassword,
      },
    });
    if (reset.data) {
      await signIn("credentials", {
        emailAddress: emailAddress,
        password: data.newPassword,
      });
    }
  };

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "authenticated") {
    router.push(callbackUrl);
    return null;
  }

  return (
    <UIAccount heading="Reset Password" image={seadragon} alt="sea dragon">
      {/**INPUT COMPONENT */}
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            {/** New Password Field Section */}

            <Box pb={4}>
              <Box pb={2}>
                <Label label="Email" />
              </Box>
              <TextField type="email" value={emailAddress} isDisabled={true} />
            </Box>

            <Box pb={4}>
              <Box pb={2}>
                <Label label="New Password" />
              </Box>
              <TextField
                type="password"
                placeholder="Enter New Password"
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />
            </Box>

            {/** New Password Field Section */}
            <Box pb={4}>
              <Box pb={2}>
                <Label label="Confirm Password" />
              </Box>
              <TextField
                type="password"
                placeholder="Confirm New Password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </Box>

            {/** Send Verification Button Section */}
            <Button
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="xs"
              lineHeight="md"
              bg={isValid ? "primary" : "gray400"}
              type="submit"
              isDisabled={!isValid}
              h="3rem"
              color={isValid ? "#1F2937" : "text.gray300"}
              _hover={
                isValid
                  ? {
                      color: "primary",
                      border: "1px",
                      borderColor: "primary",
                      background: "transparent",
                    }
                  : {
                      color: "gray300",
                    }
              }
            >
              Send password reset link
            </Button>

            {/** Navigation Links Section */}
            <VStack pt={10} pb={10} justifyContent="center" align="center">
              <Links
                linkname="Log in"
                navigation="/login"
                text="Remeber your password? "
              />
            </VStack>
          </Stack>
        </form>
      </Box>
    </UIAccount>
  );
};

export default ResetPassword;
