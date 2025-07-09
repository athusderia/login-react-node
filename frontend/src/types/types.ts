export interface AuthResponse {
  body: {
    user: User;
    accessToke: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  _id: string;
  name: string;
  username: string;
}
