/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { constants } from '../../app/utils';
import { randomResource } from '../fixtures';

const {
  PARAM_ABSENT,
  RESOURCE_CREATE_ERROR_STATUS,
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_UPLOAD_ERROR_STATUS,
  RESOURCE_UPLOAD_ERROR_MSG,
  RESOURCE_UPLOAD_SUCCESS,
} = constants;

describe('Basic Constants Functions', () => {
  it('Param absent', () => {
    const data = PARAM_ABSENT(randomResource);
    expect(data).to.equal(`Please provide a valid ${randomResource}`);
  });
  it('RESOURCE_CREATE_ERROR_STATUS', () => {
    const data = RESOURCE_CREATE_ERROR_STATUS(randomResource);
    expect(data).to.equal(`${randomResource}_CREATE_ERROR`);
  });
  it('RESOURCE_CREATE_SUCCESS', () => {
    const data = RESOURCE_CREATE_SUCCESS(randomResource);
    expect(data).to.equal(`${randomResource} created successfully`);
  });
  it('RESOURCE_UPLOAD_ERROR_STATUS', () => {
    const data = RESOURCE_UPLOAD_ERROR_STATUS(randomResource);
    expect(data).to.equal(`${randomResource}_UPLOAD_ERROR`);
  });
  it('RESOURCE_UPLOAD_ERROR_MSG', () => {
    const data = RESOURCE_UPLOAD_ERROR_MSG(randomResource);
    expect(data).to.equal(`${randomResource} upload failed. It is not you, it is us.`);
  });
  it('RESOURCE_UPLOAD_SUCCESS', () => {
    const data = RESOURCE_UPLOAD_SUCCESS(randomResource);
    expect(data).to.equal(`${randomResource} uploaded successfully`);
  });
});
