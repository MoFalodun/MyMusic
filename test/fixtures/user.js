import faker from 'faker';

export const email = faker.internet.email();

export const role = 'user';

export const userPassword = 'ThePassword';

export const userInfo = {
  firstName: faker.name.firstName(5),
  lastName: faker.name.lastName(9),
  email,
  username: faker.internet.userName(),
  password: userPassword,
  phoneNumber: faker.phone.phoneNumber('08#########')
};

export const invalidSignUpObj = {
  firstName: faker.phone.phoneNumber(),
  lastName: faker.internet.email(),
  username: faker.internet.userName(),
  password: userPassword,
  phoneNumber: `${Math.floor((Math.random() * 1000000000000) + 1)}`
};

export const userLogin = {
  email: userInfo.email,
  password: userPassword,
};

export const fakeLoginObj = {
  email: faker.internet.email(),
  password: faker.internet.password(10)
};
