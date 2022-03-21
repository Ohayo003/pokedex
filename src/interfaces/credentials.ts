export interface ILogin {
  emailAddress: string;
  password: string;
}

export interface ISignup {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

export interface IForgotpassword {
  email: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}
