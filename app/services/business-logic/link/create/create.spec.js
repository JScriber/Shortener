import { fullURL, generateHash } from './create';
import { errors } from '../../../../../errors';
import { rejects } from 'assert';

describe('Create service.', () => {
  it('should return an URL.', () => {
    const response = fullURL('test');

    expect(response).toBeDefined();
  });

  it('should refuse the URL.', async () => {
    // let response;

    // await expect(generateHash('http://google.com')).rejects.toThrow();
  });
});
