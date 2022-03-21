import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation singIn($emailAddress: EmailAddress!, $password: String!) {
    authenticate(input: { emailAddress: $emailAddress, password: $password }) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUP(
    $emailAddress: EmailAddress!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      input: {
        emailAddress: $emailAddress
        firstname: $firstName
        lastname: $lastName
        password: $password
      }
    ) {
      token
    }
  }
`;

export const TRIGGER_RESET_PASSWORD = gql`
  mutation triggerResetPassword($emailAddress: EmailAddress!) {
    triggerPasswordReset(input: { emailAddress: $emailAddress })
  }
`;

export const GENERATE_PASSWORD_RESET_LINK = gql`
  mutation generatePasswordResetLink(
    $emailAddress: EmailAddress!
    $baseURL: String!
  ) {
    generatePasswordResetLink(
      input: { emailAddress: $emailAddress, baseUrl: $baseURL }
    )
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($passwordResetCode: String!, $newPassword: String!) {
    resetPassword(
      input: {
        passwordResetCode: $passwordResetCode
        newPassword: $newPassword
      }
    ) {
      token
    }
  }
`;
