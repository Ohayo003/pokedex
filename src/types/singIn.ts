/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: singIn
// ====================================================

export interface singIn_authenticate {
  __typename: "Authentication";
  token: string;
}

export interface singIn {
  /**
   * ### Description
   * Authenticate a user to get an access token if credentials are valid.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Invalid credentials.
   */
  authenticate: singIn_authenticate;
}

export interface singInVariables {
  emailAddress: any;
  password: string;
}
