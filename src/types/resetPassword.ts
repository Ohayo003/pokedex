/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resetPassword
// ====================================================

export interface resetPassword_resetPassword {
  __typename: "Authentication";
  token: string;
}

export interface resetPassword {
  /**
   * Reset password.
   */
  resetPassword: resetPassword_resetPassword;
}

export interface resetPasswordVariables {
  passwordResetCode: string;
  newPassword: string;
}
