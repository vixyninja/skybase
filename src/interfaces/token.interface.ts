export type AccessTokenType = {
  uuid: string;
  client_id: string;
};

export type RefreshTokenType = {
  uuid: string;
  client_id: string;
  ip: string;
  device: string;
};
