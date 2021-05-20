/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { Helper } from '../../app/utils';
import { userPassword, payload, tokenInfo, testSchema, testObj } from '../fixtures/index';

const {
  generateId,
  hashString,
  compareHash,
  generateToken,
  verifyToken,
  addDataToToken,
  validateInput,
} = Helper;

describe('Busic Auth Helper Functions', () => {
  let hashedPassword;
  let token;
  let data;
  it('should generate uuid', () => {
    const id = generateId();
    expect(id).to.be.a('string').of.length(36);
  });
  it('should encrypt plain password sent in', () => {
    hashedPassword = hashString(userPassword);
    expect(hashedPassword).to.be.a('string').of.length.greaterThan(40);
  });
  it('should compare hashed password to the plain value', () => {
    const comparedPassword = compareHash(userPassword, hashedPassword);
    expect(comparedPassword).to.be.a('boolean');
    expect(comparedPassword).to.be.a('boolean').equals(true);
  });
  it('should generate a string of token with different characters', () => {
    token = generateToken({ payload });
    expect(token).to.be.a('string').of.length.greaterThan(25);
  });
  it('should generate a string of token with different characters', () => {
    data = addDataToToken(tokenInfo);
    expect(data).to.be.a('string').of.length.greaterThan(25);
  });
  it('should decoded the token', () => {
    const decodedToken = verifyToken(data);
    expect(decodedToken.err).to.equals(null);
    expect(decodedToken.data).to.be.a('object');
    expect(decodedToken.data.email).to.be.equals(tokenInfo.email);
  });
  it('should validate input', async () => {
    try {
      validateInput(testSchema, testObj);
    } catch (error) {
      expect(error).to.be.equal(null);
    }
  });
});
