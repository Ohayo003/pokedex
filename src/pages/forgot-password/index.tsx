import React from "react";
import seadragon from "public/assets/images/forgot-password-image.png";
import { Box, Stack, Button, VStack, useToast } from "@chakra-ui/react";
import Label from "src/components/widgets/Forms/Label";
import TextField from "src/components/widgets/Forms/TextField";
import * as yup from "yup";
import { IForgotpassword } from "src/interfaces/credentials";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Links from "src/components/widgets/Forms/Links";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import UIAccount from "src/components/Layouts/UIAccount";
import {
  generatePasswordResetLink,
  generatePasswordResetLinkVariables,
} from "src/types/generatePasswordResetLink";
import {
  triggerResetPassword,
  triggerResetPasswordVariables,
} from "src/types/triggerResetPassword";
import {
  GENERATE_PASSWORD_RESET_LINK,
  TRIGGER_RESET_PASSWORD,
} from "src/graphql/mutations/auth";

let schema = yup.object().shape({
  email: yup.string().email("The email is invalid").required(),
});

const ForgotPassword = () => {
  const router = useRouter();
  const toast = useToast();
  const [triggerResetPassword, { loading, data, error }] = useMutation<
    triggerResetPassword,
    triggerResetPasswordVariables
  >(TRIGGER_RESET_PASSWORD);

  const [generatePswResetLink, { loading: generateLoading }] = useMutation<
    generatePasswordResetLink,
    generatePasswordResetLinkVariables
  >(GENERATE_PASSWORD_RESET_LINK);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForgotpassword>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IForgotpassword> = async (data) => {
    const trigger = await triggerResetPassword({
      variables: {
        emailAddress: data.email,
      },
    });
    console.log(trigger.data?.triggerPasswordReset);
    if (trigger.data?.triggerPasswordReset) {
      const callback = await generatePswResetLink({
        variables: {
          emailAddress: data.email,
          baseURL: "/forgot-password/reset-password",
        },
      });
      if (callback.data?.generatePasswordResetLink) {
        toast({
          title: "Success.",
          position: "top",
          description: "Generating Reset Password Link Successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push(callback.data.generatePasswordResetLink);
      }
    }
  };

  return (
    <UIAccount heading="Forgot password" image={seadragon} alt="sea dragon">
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            {/** Email Field Section */}
            <Box pb={4}>
              <Box pb={2}>
                <Label label="Email" />
              </Box>
              <TextField
                type="email"
                placeholder="Enter Email"
                error={errors.email?.message}
                {...register("email")}
              />
            </Box>

            {/** Send Verification Button Section */}
            <Button
              fontFamily="Inter"
              fontStyle="normal"
              isLoading={generateLoading}
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
              s
            </VStack>
          </Stack>
        </form>
      </Box>
    </UIAccount>
  );
};

export default ForgotPassword;
