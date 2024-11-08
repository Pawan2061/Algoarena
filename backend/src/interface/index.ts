export interface SignupSchema {
  name: string;
  password: string;
}

export interface SigninSchema {
  name: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  name: string;
  password: string;
}

export interface problemPayload {
  statement: string;
  input: string;
  output: string;
  boilerPlateId: string;
}
