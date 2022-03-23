import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
  chakra,
  Icon,
} from "@chakra-ui/react";
import { useState, forwardRef } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { BiShow, BiHide } from "react-icons/bi";
import "@fontsource/inter";

const CFaMailAlt = chakra(HiMail);
const CFaLock = chakra(FaLock);
const CFaUser = chakra(FaUser);

interface TextFieldProps {
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps & InputProps>(
  ({ error, type, ...props }, ref) => {
    const isEmail = type === "email";
    const isPswd = type === "password";
    const isText = type === "text";

    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormControl isInvalid={!!error}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            {isEmail && <CFaMailAlt color="gray.300" size={20} />}
            {isPswd && <CFaLock color="gray.300" />}
            {isText && <CFaUser color="gray.300" />}
          </InputLeftElement>

          <Input
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="19px"
            focusBorderColor="primary"
            color="text.light"
            ref={ref}
            type={isPswd && showPassword ? "text" : type}
            {...props}
          />

          {isPswd && (
            <InputRightElement>
              <Icon
                _hover={{ cursor: "pointer" }}
                as={showPassword ? BiHide : BiShow}
                h={6}
                w={6}
                fill="gray500"
                onClick={() => setShowPassword((s) => !s)}
              ></Icon>
            </InputRightElement>
          )}
        </InputGroup>

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
