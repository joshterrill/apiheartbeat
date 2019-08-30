const EndpointService = require('./endpoint.service');
const { expect } = require('chai');

describe('EndpointService', () => {

  function startup() {}
  function teardown() {}

  before(startup);
  after(teardown);

  it('should check an endpoint successfully', async () => {
    const endpoint = {
      url: 'https://www.google.com',
      statusCode: 200
    }
    const check = await EndpointService.checkEndpoint(endpoint);
    expect(check).to.not.be.null;
    expect(check.ok).to.be.true;
    expect(check.status).to.eq('success');
    expect(check.message).to.eq('Success');
  });

  it('should check an endpoint successfully but status code should be different', async () => {
    const endpoint = {
      url: 'https://www.google.com',
      statusCode: 202
    }
    const check = await EndpointService.checkEndpoint(endpoint);
    expect(check).to.not.be.null;
    expect(check.ok).to.be.true;
    expect(check.status).to.eq('warning');
    expect(check.message).to.eq('Endpoint returned with body but status code 200 does not match 202');
  });

  it('should check an endpoint and fail', async () => {
    try {
      const endpoint = {
        url: 'https://www.googlesdvsdfg.com',
        statusCode: 200
      }
      await EndpointService.checkEndpoint(endpoint);
    } catch (error) {
      expect(error).to.not.be.null;
    }
  });
});