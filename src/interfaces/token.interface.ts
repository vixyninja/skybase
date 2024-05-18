export type AccessTokenType = {
  uuid: string;
  email: string;
  phone: string;
  client_id: string;
  scope: string; // scope of access token [read, write, delete, admin]
};

export type RefreshTokenType = {
  email: string;
  phone: string;
  client_id: string;
  ip: string;
  device: string;
};

export type SessionType = {
  ip: string;
  device: string;
  os: string;
  browser: string;
  platform: string;
  country: string;
  date: Date | string;
};
