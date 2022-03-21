/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: generatePasswordResetLink
// ====================================================

export interface generatePasswordResetLink {
  /**
   * Use this to get password reset link.
   * This can only be used in development.
   * Instead of sending an actual email for the password reset, this is used instead.
   */
  generatePasswordResetLink: string;
}

export interface generatePasswordResetLinkVariables {
  emailAddress: any;
  baseURL: string;
}
