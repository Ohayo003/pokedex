import React from "react";
import UIAccount from "src/components/Layouts/UIAccount";
import seadragon from "public/assets/background/forgot-password-image.png";
import { Box, Stack, Button, VStack, Link } from "@chakra-ui/react";
import Label from "src/components/widgets/Forms/Label";
import TextField from "src/components/widgets/Forms/TextField";
import * as yup from "yup";
import { IForgotpassword } from "../interfaces/credentials";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Links from "src/components/widgets/Forms/Links";

let schema = yup.object().shape({
  email: yup.string().email("The email is invalid").required(),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForgotpassword>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <UIAccount heading="Forgot password" image={seadragon} alt="sea dragon">
      {/**INPUT COMPONENT */}
      <Box>
        <form>
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
