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
import dragon from "public/assets/background/sign-up-image.png";
import TextField from "src/components/widgets/Forms/TextField";
import Label from "src/components/widgets/Forms/Label";
import "@fontsource/inter";
import { VStack } from "@chakra-ui/react";
import ProviderButtons from "src/components/widgets/Forms/ProviderButtons";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import UIAccount from "src/components/Layouts/UIAccount";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ISignup } from "src/interfaces/credentials";
import Links from "src/components/widgets/Forms/Links";

let schema = yup.object().shape({
  email: yup.string().email("The email is invalid").required(),
  Firstname: yup.string().required(),
  Lastname: yup.string().required(),
  password: yup.string().required(),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ISignup>({ mode: "onChange", resolver: yupResolver(schema) });

  // const [first, setfirst] = useState(second)

  return (
    <UIAccount heading="Sign up" image={dragon} alt="dragon">
      <Social />
      <Flex align="center" gap={2} pt={2} pb={2}>
        <Divider orientation="horizontal" borderColor="white" />
        <Text color="text.light">OR</Text>
        <Divider orientation="horizontal" borderColor="white" />
      </Flex>

      {/**INPUT FORM SECTION */}
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

            {/** Firstname Field Section */}
            <Box pb={4}>
              <Box pb={2}>
                <Label label="First Name" />
              </Box>
              <TextField
                type="text"
                placeholder="Enter Firstname"
                error={errors.email?.message}
                {...register("Firstname")}
              />
            </Box>

            {/** Lastname Field Section */}
            <Box pb={4}>
              <Box pb={2}>
                <Label label="Last Name" />
              </Box>
              <TextField
                type="text"
                placeholder="Enter Lastname"
                error={errors.email?.message}
                {...register("Lastname")}
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
