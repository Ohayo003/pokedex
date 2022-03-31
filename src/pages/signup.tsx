import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import dragon from "public/assets/background/sign-up-image.png";
import TextField from "src/components/widgets/Forms/TextField";
import Label from "src/components/widgets/Forms/Label";
import "@fontsource/inter";
import { VStack } from "@chakra-ui/react";
import UIAccount from "src/components/Layouts/UIAccount";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ISignup } from "src/interfaces/credentials";
import Links from "src/components/widgets/Forms/Links";
import { signIn, useSession } from "next-auth/react";
import { useCallbackUrl } from "src/hooks/useCallbackUrl";
import { useRouter } from "next/router";
import Loading from "src/components/widgets/Loading";

let schema = yup.object().shape({
  emailAddress: yup.string().email("The email is invalid").required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
});

const SignUp = () => {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const toast = useToast();
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ISignup> = async (data) => {
    console.log(data);
    const response = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.error) {
      toast({
        title: "Error Signup.",
        position: "top",
        description: `${response.error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Account Created",
        position: "top",
        description: "Your Account Created Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
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
    <UIAccount heading="Sign up" image={dragon} alt="dragon">
      {/**INPUT FORM SECTION */}
      <Box>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            {/** Email Field Section */}
            <Box>
              <Box pb={2}>
                <Label label="Email" />
              </Box>
              <TextField
                type="email"
                placeholder="Enter Email"
                error={errors.emailAddress?.message}
                {...register("emailAddress")}
              />
            </Box>

            {/** Firstname Field Section */}
            <Box>
              <Box pb={2}>
                <Label label="First Name" />
              </Box>
              <TextField
                type="text"
                placeholder="Enter Firstname"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
            </Box>

            {/** Lastname Field Section */}
            <Box>
              <Box pb={2}>
                <Label label="Last Name" />
              </Box>
              <TextField
                type="text"
                placeholder="Enter Lastname"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </Box>

            {/** Password Field Section */}
            <Box pb={2}>
              <Box pb={2}>
                <Label label="Password" />
              </Box>
              <TextField
                type="password"
                placeholder="Enter Password"
                error={errors.password?.message}
                {...register("password")}
              />
            </Box>

            {/** Create Button Section */}
            <Button
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="xs"
              lineHeight="md"
              bg="primary"
              // isDisabled={touchedFields.email ? false : true}
              type="submit"
              h="3rem"
              color="#1F2937"
              _hover={{
                color: "primary",
                border: "1px",
                borderColor: "primary",
                background: "transparent",
              }}
            >
              Create account
            </Button>

            {/** Navigation Links Section */}
            <VStack pt={10} pb={10} justifyContent="center" align="center">
              <Links
                linkname="Log in"
                navigation="/login"
                text="Already have an account? "
              />
            </VStack>
          </Stack>
        </form>
      </Box>
    </UIAccount>
  );
};

export default SignUp;
