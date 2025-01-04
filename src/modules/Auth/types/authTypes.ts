export type LoginTypes = {
  email: string;
  password: string;
  remember: boolean;
};

export type ForgotPasswordTypes = Partial<{
  otp: string;
  token: string;
  email: string;
  password: string;
  otp_type: string;
  confirm_password: string;
}>;

export type AuthError = {
  status:
    | number
    | "FETCH_ERROR"
    | "CUSTOM_ERROR"
    | "PARSING_ERROR"
    | "TIMEOUT_ERROR";
  data: {
    success: boolean;
    message: string;
  };
};
