/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signIn
// ====================================================

export interface signIn_authenticate {
  __typename: "Authentication";
  token: string;
}

export interface signIn {
  /**
   * ### Description
   * Authenticate a user to get an access token if credentials are valid.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Invalid credentials.
   */
  authenticate: signIn_authenticate;
}

export interface signInVariables {
  emailAddress: any;
  password: string;
}
