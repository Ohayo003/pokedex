import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  Stack,
} from "@chakra-ui/react";
import pikatchu from "public/assets/background/login-image.png";
import TextField from "src/components/widgets/Forms/TextField";
import Label from "src/components/widgets/Forms/Label";
import "@fontsource/inter";
import { VStack } from "@chakra-ui/react";
import ProviderButtons from "src/components/widgets/Forms/ProviderButtons";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "src/interfaces/credentials";
import UIAccount from "src/components/Layouts/UIAccount";
import Links from "src/components/widgets/Forms/Links";

///schema for validating text field using yup
let schema = yup.object().shape({
  email: yup.string().email("The email is invalid").required(),
  password: yup.string().required(),
});

const Login = () => {

  ///Using useForm from react-hook-form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <UIAccount heading="Log in" image={pikatchu} alt="pikatchu">
      <Social />
      <Flex align="center" gap={2} pt={2} pb={2}>
        <Divider orientation="horizontal" borderColor="white" />
        <Text color="text.light">OR</Text>
        <Divider orientation="horizontal" borderColor="white" />
      </Flex>
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
                onSelect={() => {
                  touchedFields.email = true;
                }}
                error={errors.email?.message}
                {...register("email")}
              />
            </Box>

            {/** Password Field Section */}
            <Box pb={6}>
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

            {/** Sign in Button Section */}
            <Button
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="xs"
              lineHeight="md"
              isDisabled={
                !getValues().email || !getValues().password ? true : false
              }
              bg="primary"
              type="submit"
              width="full"
              h="3rem"
              color="#1F2937"
            >
              Sign in
            </Button>

            {/** Navigation Links Section */}
            <VStack pt={10} justifyContent="center" align="center">
              <Links linkname="Forgot Password" navigation="/forgot-password" />
              <Links
                linkname="Sign up"
                text="Don't have account yet? "
                navigation="/signup"
              />
            </VStack>
          </Stack>
        </form>
      </Box>
    </UIAccount>
  );
};

export default Login;

const Social = () => {
  return (
    <HStack justify="center" gap={4}>
      <ProviderButtons
        provider="facebook"
        icon={<Icon as={BsFacebook} fill="white" w={10} h={10} />}
        aria-label="facebook"
        _hover={{
          bg: "transparent",
        }}
      />
      <ProviderButtons
        provider="github"
        aria-label="github"
        icon={<Icon as={BsGithub} fill="white" w={10} h={10} />}
        _hover={{
          bg: "transparent",
        }}
      />
      <ProviderButtons
        provider="google"
        icon={<Icon as={BsGoogle} fill="white" w={10} h={10} />}
        aria-label="google"
        _hover={{
          bg: "transparent",
        }}
      />
    </HStack>
  );
};