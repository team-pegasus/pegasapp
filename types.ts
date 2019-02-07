export type UserRegistrationFields = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type SignupSuccessResponse = {
  auth_token: string;
  message: string;
};
