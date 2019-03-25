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

export type JoinWaitlistResponse = [
  {
    id: number;
    checked_in: boolean;
  }
];

export type GetWaitTimeResponse = {
  position: number;
  wait: number;
};

export type SignupSuccessResponse = {
  auth_token: string;
  message: string;
};
