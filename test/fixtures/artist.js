import faker from 'faker';

export const email = faker.internet.email();

export const role = 'artist';

export const userPassword = 'ThePassword';

export const artistInfo = {
  email,
  artistName: faker.internet.userName(),
  password: userPassword,
};

export const artistLogin = {
  email: artistInfo.email,
  password: userPassword,
};

export const invalidLoginObj = {
  email: artistInfo.email,
  password: faker.internet.password(10)
};
