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

export interface boilerPlatePayload {
  languageId: string;
  code: string;
}
