import { faker } from '@faker-js/faker';

export const genUuid = (): string => {
  return faker.string.uuid();
};
export const genHex = (): string => {
  return faker.string.hexadecimal({ length: 40 });
};

export const genTimeStamp = () => {
  return +new Date();
};

export const genSign = () => {
  return faker.string.alphanumeric({ length: 40 });
};
