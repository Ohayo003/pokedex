/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMe
// ====================================================

export interface getMe_me {
  __typename: "Account";
  firstname: string;
  lastname: string;
  emailAddress: any;
}

export interface getMe {
  /**
   * Returns user's own information.
   */
  me: getMe_me;
}
