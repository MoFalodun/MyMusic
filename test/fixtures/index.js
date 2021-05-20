import faker from 'faker';
import Joi from 'joi';
import { ValidationHelper } from '../../app/utils';

const {
  stringCheck,
  passwordCheck,
  emailCheck,
  numberCheck,
  phoneNumberCheck,
  enumCheck,
  dateCheck
} = ValidationHelper;

export const userPassword = 'ThePassword';

export const payload = 'The Payload';

export const randomResource = faker.lorem.text(2);

export const email = faker.internet.email();

export const role = 'user';

export const userInfo = {
  first_name: faker.name.firstName(5),
  last_name: faker.name.lastName(9),
  phone_number: '70380936473',
  password: userPassword,
  email
};

export const tokenInfo = {
  id: 1,
  email,
  role
};

export const testSchema = Joi.object({
  email: emailCheck(Joi),
  password: passwordCheck(Joi),
  name: stringCheck('name', Joi),
  number: numberCheck('number', Joi),
  phoneNumber: phoneNumberCheck(Joi),
  valid: enumCheck([false, true], 'valid', Joi),
  date: dateCheck('Date', Joi)
});

export const testObj = {
  email: faker.internet.email(),
  password: faker.internet.password(10),
  name: faker.internet.userName(),
  number: faker.datatype.number(),
  phoneNumber: Math.floor((Math.random() * 1000000000000) + 1),
  valid: faker.datatype.boolean(),
  date: faker.date.future()
};
