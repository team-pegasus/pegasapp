export type UserRegistrationFields = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type JoinWaitlistFields = {
  first_name?: string;
  last_name?: string;
  reason: string;
};

export type JoinWaitlistResponse = {
  message: string;
  wait_time: number;
};

export type SignupSuccessResponse = {
  auth_token: string;
  message: string;
};
