export class JwtPayloadDataDto {
  id: string;
  sessionId: string;
  tokenId: string;
  isAdmin: boolean;
  sub: string;
  aud: string;
}
