/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signUP
// ====================================================

export interface signUP_signUp {
  __typename: "Authentication";
  token: string;
}

export interface signUP {
  /**
   * ### Description
   * Sign up a user and get an access token if successful.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Email address already used.
   */
  signUp: signUP_signUp;
}

export interface signUPVariables {
  emailAddress: any;
  firstName: string;
  lastName: string;
  password: string;
}
