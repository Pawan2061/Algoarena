export interface SignupSchema {
  name: string;
  password: string;
}

export interface SigninSchema {
  name: string;
  password: string;
}

export interface JwtPayload {
  name: string;
  password: string;
}
