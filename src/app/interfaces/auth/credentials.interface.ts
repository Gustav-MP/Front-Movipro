export interface Credentials {
  tkn: string;
  user: UserCredentials;
  exp: number;
  iat: number;
}

export interface UserCredentials {
  email: string;
  id: number;
  id_account: number;
  name: string;
  rol: string;
}

export interface PayloadJwt {
  email: string;
  id: number;
  id_account: number;
  name: string;
  rol: string;
  exp: number;
  iat: number;
}

export interface RespLogin {
  access_token: string;
}
