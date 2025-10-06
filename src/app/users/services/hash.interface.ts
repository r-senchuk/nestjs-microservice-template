export interface HashInterface {
  hash(password: string): Promise<string>;

  compare(password: string, hash: string): Promise<boolean>;
}

export const HashInterface = Symbol('HashInterface');
