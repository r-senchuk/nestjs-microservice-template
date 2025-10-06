export interface ChangeUserPasswordRequest {
  readonly id: string;
  readonly oldPassword: string;
  readonly newPassword: string;
}
