export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type CurrentUser = {
  email: string;
  picture: string | null;
};
